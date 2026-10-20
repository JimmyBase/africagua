// Supabase Edge Function: translate-news
// Translates the title, summary and content of an existing news article
// (stored in Firebase Realtime Database) into the requested language using
// Google Gemini. Results are cached in the `news_translations` Supabase table
// keyed by a source_hash so unchanged originals are never re-translated.
//
// Required secrets (configured in Supabase project settings):
//   GOOGLE_API_KEY      - Google AI / Vertex AI Express API key
//   GEMINI_MODEL        - Gemini model id, e.g. "gemini-1.5-flash"
//   FIREBASE_DATABASE_URL - Firebase Realtime DB URL (read original news)
//   SUPABASE_URL        - provisioned automatically
//   SUPABASE_SERVICE_ROLE_KEY - provisioned automatically
//
// The function only accepts a news id + lang and reads the original from
// Firebase itself, so users can never feed arbitrary text to the translation API.

import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { createHash } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPPORTED_TARGET_LANGS = ["en", "fr", "it", "de"];

interface NewsOriginal {
  title: string;
  summary?: string;
  content: string;
  imageUrl?: string;
  createdAt?: number;
}

interface TranslationResult {
  title: string;
  summary: string;
  content: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function fetchNewsFromFirebase(newsId: string): Promise<NewsOriginal | null> {
  const baseUrl = Deno.env.get("FIREBASE_DATABASE_URL");
  if (!baseUrl) {
    throw new Error("FIREBASE_DATABASE_URL secret is not configured");
  }
  // Firebase Realtime DB REST: GET /news/<id>.json
  const url = `${baseUrl.replace(/\/$/, "")}/news/${encodeURIComponent(newsId)}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (!data || !data.title || !data.content) {
    return null;
  }
  return {
    title: String(data.title),
    summary: data.summary ? String(data.summary) : "",
    content: String(data.content),
  };
}

function computeSourceHash(news: NewsOriginal): string {
  const raw = `${news.title}\u0000${news.summary || ""}\u0000${news.content}`;
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

async function getCachedTranslation(
  supabase: ReturnType<typeof createClient>,
  newsId: string,
  lang: string,
  sourceHash: string
): Promise<TranslationResult | null> {
  const { data, error } = await supabase
    .from("news_translations")
    .select("title, summary, content, source_hash")
    .eq("news_id", newsId)
    .eq("lang", lang)
    .maybeSingle();

  if (error || !data) {
    return null;
  }
  if (data.source_hash !== sourceHash) {
    return null; // stale, needs re-translation
  }
  return {
    title: data.title,
    summary: data.summary ?? "",
    content: data.content,
  };
}

async function upsertTranslation(
  supabase: ReturnType<typeof createClient>,
  newsId: string,
  lang: string,
  sourceHash: string,
  translation: TranslationResult
): Promise<void> {
  const { error } = await supabase
    .from("news_translations")
    .upsert(
      {
        news_id: newsId,
        lang,
        title: translation.title,
        summary: translation.summary,
        content: translation.content,
        source_hash: sourceHash,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "news_id,lang" }
    );
  if (error) {
    console.error("Failed to upsert translation:", error.message);
  }
}

function buildGeminiPrompt(news: NewsOriginal, targetLangName: string): string {
  const langInstruction =
    `Translate the following news article from Spanish to ${targetLangName}. ` +
    `Translate faithfully and naturally, preserving all HTML/Markdown formatting, ` +
    `links, proper names and figures. Do not add or remove any information. ` +
    `Return ONLY a JSON object with exactly these keys: ` +
    `"title", "summary", "content". Do not wrap it in markdown fences.`;

  const payload = {
    title: news.title,
    summary: news.summary || "",
    content: news.content,
  };

  return `${langInstruction}\n\nSource JSON:\n${JSON.stringify(payload)}`;
}

function extractJsonFromGemini(text: string): TranslationResult {
  // Gemini may wrap JSON in markdown fences despite instructions; strip them.
  let cleaned = text.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }
  // Find the first '{' and last '}' to isolate the JSON object.
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Gemini response did not contain a JSON object");
  }
  const jsonStr = cleaned.slice(start, end + 1);
  const parsed = JSON.parse(jsonStr);
  if (!parsed.title || !parsed.content) {
    throw new Error("Gemini response missing required fields");
  }
  return {
    title: String(parsed.title),
    summary: parsed.summary ? String(parsed.summary) : "",
    content: String(parsed.content),
  };
}

async function callGemini(
  news: NewsOriginal,
  targetLangCode: string
): Promise<TranslationResult> {
  const apiKey = Deno.env.get("GOOGLE_API_KEY");
  const model = Deno.env.get("GEMINI_MODEL") || "gemini-1.5-flash";
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY secret is not configured");
  }

  const langNames: Record<string, string> = {
    en: "English",
    fr: "French",
    it: "Italian",
    de: "German",
  };

  const prompt = buildGeminiPrompt(news, langNames[targetLangCode] || targetLangCode);
  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini returned no text content");
  }
  return extractJsonFromGemini(text);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.newsId !== "string" || typeof body.lang !== "string") {
      return jsonResponse({ error: "newsId and lang are required" }, 400);
    }

    const { newsId, lang } = body;
    if (!SUPPORTED_TARGET_LANGS.includes(lang)) {
      return jsonResponse(
        { error: `Unsupported target language: ${lang}` },
        400
      );
    }

    // Read the original news from Firebase. This is the abuse-prevention gate:
    // we never translate arbitrary user-supplied text, only real news articles.
    const news = await fetchNewsFromFirebase(newsId);
    if (!news) {
      return jsonResponse({ error: "News article not found" }, 404);
    }

    const sourceHash = computeSourceHash(news);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase server credentials not configured");
    }
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // Return cached translation if the source hasn't changed.
    const cached = await getCachedTranslation(supabase, newsId, lang, sourceHash);
    if (cached) {
      return jsonResponse({ ...cached, cached: true });
    }

    // Otherwise call Gemini and cache the result.
    const translation = await callGemini(news, lang);
    await upsertTranslation(supabase, newsId, lang, sourceHash, translation);

    return jsonResponse({ ...translation, cached: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("translate-news error:", message);
    return jsonResponse({ error: message }, 500);
  }
});

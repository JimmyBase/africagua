import { supabase } from './supabaseClient';
import { SOURCE_LANGUAGE } from '../i18n/languages';

export interface NewsTranslation {
  title: string;
  summary: string;
  content: string;
}

export interface TranslatedNews {
  newsId: string;
  lang: string;
  title: string;
  summary: string;
  content: string;
  translated: boolean;
  loading?: boolean;
  error?: boolean;
}

interface TranslationRow {
  news_id: string;
  lang: string;
  title: string;
  summary: string | null;
  content: string;
  source_hash: string;
}

/**
 * Try to load cached translations for a batch of news ids in the given language
 * directly from Supabase (fast path, no edge function call).
 * Returns a map of newsId -> NewsTranslation.
 */
export async function loadCachedTranslations(
  newsIds: string[],
  lang: string
): Promise<Record<string, NewsTranslation>> {
  if (!newsIds.length || lang === SOURCE_LANGUAGE) return {};

  const { data, error } = await supabase
    .from('news_translations')
    .select('news_id, lang, title, summary, content')
    .in('news_id', newsIds)
    .eq('lang', lang);

  if (error || !data) return {};

  const map: Record<string, NewsTranslation> = {};
  for (const row of data as TranslationRow[]) {
    map[row.news_id] = {
      title: row.title,
      summary: row.summary ?? '',
      content: row.content
    };
  }
  return map;
}

/**
 * Request a translation for a single news article by calling the translate-news
 * edge function. Used as a fallback when no cached translation exists yet.
 */
export async function requestTranslation(
  newsId: string,
  lang: string
): Promise<NewsTranslation> {
  if (lang === SOURCE_LANGUAGE) {
    throw new Error('No translation needed for source language');
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const endpoint = `${supabaseUrl}/functions/v1/translate-news`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey
    },
    body: JSON.stringify({ newsId, lang })
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || `Translation request failed (${res.status})`);
  }

  const data = await res.json();
  if (!data.title || !data.content) {
    throw new Error('Invalid translation response');
  }

  return {
    title: String(data.title),
    summary: data.summary ? String(data.summary) : '',
    content: String(data.content)
  };
}

/**
 * Request translations for multiple news articles in one go (sequential to be
 * gentle on the Gemini API). Returns a map of newsId -> NewsTranslation.
 * Articles that fail keep their original Spanish text (handled by caller).
 */
export async function requestTranslationsBatch(
  newsIds: string[],
  lang: string
): Promise<Record<string, NewsTranslation>> {
  const map: Record<string, NewsTranslation> = {};
  for (const id of newsIds) {
    try {
      map[id] = await requestTranslation(id, lang);
    } catch (err) {
      console.error(`Translation failed for ${id} (${lang}):`, err);
    }
  }
  return map;
}

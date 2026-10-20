/*
# Create news_translations table for automatic news translation

1. New Tables
  - `news_translations`
    - `id` (uuid, primary key)
    - `news_id` (text, not null) - Firebase key of the original news article
    - `lang` (text, not null) - Target language code (en, fr, it, de)
    - `title` (text, not null) - Translated title
    - `summary` (text) - Translated summary/excerpt
    - `content` (text, not null) - Translated HTML content
    - `source_hash` (text, not null) - Hash of the original title+summary+content,
      used to detect when the original changed and a re-translation is needed
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  - Unique constraint on (news_id, lang) so each article has at most one
    translation per language, which is updated in place when the source changes.

2. Security
  - Enable RLS on `news_translations`.
  - Public read access (anyone can read cached translations) for both
    `anon` and `authenticated` roles.
  - No public INSERT/UPDATE/DELETE policies: writes are reserved for the
    service role used by the `translate-news` edge function. The service role
    bypasses RLS, so no write policy is needed for it.
*/

CREATE TABLE IF NOT EXISTS news_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id text NOT NULL,
  lang text NOT NULL,
  title text NOT NULL,
  summary text,
  content text NOT NULL,
  source_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT news_translations_news_id_lang_key UNIQUE (news_id, lang)
);

CREATE INDEX IF NOT EXISTS idx_news_translations_news_id
  ON news_translations(news_id);
CREATE INDEX IF NOT EXISTS idx_news_translations_lang
  ON news_translations(lang);

ALTER TABLE news_translations ENABLE ROW LEVEL SECURITY;

-- Public read access: translations are meant to be displayed to all visitors.
DROP POLICY IF EXISTS "public_read_news_translations" ON news_translations;
CREATE POLICY "public_read_news_translations"
  ON news_translations FOR SELECT
  TO anon, authenticated
  USING (true);

-- No INSERT/UPDATE/DELETE policies: only the service role (edge function)
-- can write, and it bypasses RLS.

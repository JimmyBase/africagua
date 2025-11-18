/*
  # Create Participants Schema for Africagua

  1. New Tables
    - `participants`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the participant
      - `title` (text) - Professional title or position
      - `organization` (text) - Organization or institution
      - `country` (text) - Country of origin
      - `image_url` (text) - Profile photo URL
      - `bio_es` (text) - Biography in Spanish
      - `bio_en` (text) - Biography in English
      - `bio_fr` (text) - Biography in French
      - `bio_de` (text) - Biography in German
      - `bio_it` (text) - Biography in Italian
      - `role` (text) - Type of participation (moderator, speaker, panelist)
      - `expertise` (text[]) - Areas of expertise
      - `social_links` (jsonb) - Social media and professional links
      - `display_order` (integer) - Order for display
      - `is_featured` (boolean) - Whether to feature prominently
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `sessions_participants`
      - `id` (uuid, primary key)
      - `session_id` (text) - Reference to session in program
      - `participant_id` (uuid) - Reference to participant
      - `role_in_session` (text) - Role in this specific session
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text,
  organization text,
  country text,
  image_url text,
  bio_es text,
  bio_en text,
  bio_fr text,
  bio_de text,
  bio_it text,
  role text,
  expertise text[] DEFAULT '{}',
  social_links jsonb DEFAULT '{}',
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sessions_participants junction table
CREATE TABLE IF NOT EXISTS sessions_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  participant_id uuid REFERENCES participants(id) ON DELETE CASCADE,
  role_in_session text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_participants_name ON participants(name);
CREATE INDEX IF NOT EXISTS idx_participants_country ON participants(country);
CREATE INDEX IF NOT EXISTS idx_participants_role ON participants(role);
CREATE INDEX IF NOT EXISTS idx_participants_featured ON participants(is_featured);
CREATE INDEX IF NOT EXISTS idx_sessions_participants_session ON sessions_participants(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_participants_participant ON sessions_participants(participant_id);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions_participants ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view participants"
  ON participants FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view session participants"
  ON sessions_participants FOR SELECT
  USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Authenticated users can insert participants"
  ON participants FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update participants"
  ON participants FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete participants"
  ON participants FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert session participants"
  ON sessions_participants FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update session participants"
  ON sessions_participants FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete session participants"
  ON sessions_participants FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

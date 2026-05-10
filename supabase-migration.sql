-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS blog_stats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION increment_views(p_slug TEXT) RETURNS BIGINT AS $$
DECLARE new_views BIGINT;
BEGIN
  INSERT INTO blog_stats (slug, views, likes) VALUES (p_slug, 1, 0)
  ON CONFLICT (slug) DO UPDATE SET views = blog_stats.views + 1
  RETURNING views INTO new_views;
  RETURN new_views;
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_likes(p_slug TEXT) RETURNS BIGINT AS $$
DECLARE new_likes BIGINT;
BEGIN
  INSERT INTO blog_stats (slug, views, likes) VALUES (p_slug, 0, 1)
  ON CONFLICT (slug) DO UPDATE SET likes = blog_stats.likes + 1
  RETURNING likes INTO new_likes;
  RETURN new_likes;
END; $$ LANGUAGE plpgsql;

ALTER TABLE blog_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON blog_stats FOR SELECT USING (true);
CREATE POLICY "public_insert" ON blog_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update" ON blog_stats FOR UPDATE USING (true) WITH CHECK (true);

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
  IF p_slug IS NULL OR p_slug !~ '^[a-z0-9][a-z0-9-]{0,119}$' THEN
    RAISE EXCEPTION 'invalid slug';
  END IF;
  INSERT INTO blog_stats (slug, views, likes) VALUES (p_slug, 1, 0)
  ON CONFLICT (slug) DO UPDATE SET views = blog_stats.views + 1
  RETURNING views INTO new_views;
  RETURN new_views;
END; $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION increment_likes(p_slug TEXT) RETURNS BIGINT AS $$
DECLARE new_likes BIGINT;
BEGIN
  IF p_slug IS NULL OR p_slug !~ '^[a-z0-9][a-z0-9-]{0,119}$' THEN
    RAISE EXCEPTION 'invalid slug';
  END IF;
  INSERT INTO blog_stats (slug, views, likes) VALUES (p_slug, 0, 1)
  ON CONFLICT (slug) DO UPDATE SET likes = blog_stats.likes + 1
  RETURNING likes INTO new_likes;
  RETURN new_likes;
END; $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 如果 blog_stats 表已存在但缺少 comments 列，执行这句：
ALTER TABLE blog_stats ADD COLUMN IF NOT EXISTS comments BIGINT DEFAULT 0;

ALTER TABLE blog_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read" ON blog_stats;
DROP POLICY IF EXISTS "public_insert" ON blog_stats;
DROP POLICY IF EXISTS "public_update" ON blog_stats;

CREATE POLICY "public_read" ON blog_stats FOR SELECT USING (true);

REVOKE INSERT, UPDATE, DELETE ON blog_stats FROM anon, authenticated;
GRANT SELECT ON blog_stats TO anon, authenticated;

REVOKE ALL ON FUNCTION increment_views(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION increment_likes(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION increment_views(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_likes(TEXT) TO anon, authenticated;

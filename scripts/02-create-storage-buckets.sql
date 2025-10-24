-- E-Africa Services Storage Buckets Configuration
-- Run this after the main schema migration

-- ============================================================================
-- 1. CREATE STORAGE BUCKETS
-- ============================================================================

-- Bucket for CV uploads from talent pool
INSERT INTO storage.buckets (id, name, public)
VALUES ('talent-pool-cvs', 'talent-pool-cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Bucket for video uploads from talent pool
INSERT INTO storage.buckets (id, name, public)
VALUES ('talent-pool-videos', 'talent-pool-videos', false)
ON CONFLICT (id) DO NOTHING;

-- Bucket for landing page assets (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-assets', 'landing-assets', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. STORAGE RLS POLICIES
-- ============================================================================

-- Talent Pool CVs: Users can upload their own, admins can read all
CREATE POLICY "talent_pool_cvs_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'talent-pool-cvs' AND
    (auth.role() = 'authenticated' OR auth.role() = 'anon')
  );

CREATE POLICY "talent_pool_cvs_select_admin" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'talent-pool-cvs' AND
    auth.jwt() ->> 'role' = 'admin'
  );

-- Talent Pool Videos: Users can upload their own, admins can read all
CREATE POLICY "talent_pool_videos_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'talent-pool-videos' AND
    (auth.role() = 'authenticated' OR auth.role() = 'anon')
  );

CREATE POLICY "talent_pool_videos_select_admin" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'talent-pool-videos' AND
    auth.jwt() ->> 'role' = 'admin'
  );

-- Landing Assets: Public read, admin write
CREATE POLICY "landing_assets_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'landing-assets');

CREATE POLICY "landing_assets_insert_admin" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'landing-assets' AND
    auth.jwt() ->> 'role' = 'admin'
  );

-- Fix PUBLIC_DATA_EXPOSURE: Remove overly permissive public policy
-- Users should only see their own sensitive profile data
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Fix SECRETS_EXPOSED: Remove github_access_token column
-- OAuth tokens should be managed by Supabase auth, not stored in application tables
ALTER TABLE public.profiles DROP COLUMN IF EXISTS github_access_token;
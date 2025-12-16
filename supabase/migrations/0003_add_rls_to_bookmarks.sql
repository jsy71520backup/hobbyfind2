-- Enable Row Level Security on bookmarks table
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Note: Since we're using NextAuth with a custom users table (not Supabase Auth),
-- RLS policies using auth.uid() won't work directly.
-- We rely on server-side authentication checks in API routes using SERVICE_ROLE_KEY.
-- RLS is enabled for security, but API routes bypass it using service role.
-- This ensures that only authenticated users can access their own bookmarks through our API.


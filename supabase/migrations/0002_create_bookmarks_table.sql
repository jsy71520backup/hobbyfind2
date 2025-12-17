-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hobby_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, hobby_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);

-- Create index on hobby_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookmarks_hobby_id ON bookmarks(hobby_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bookmarks_updated_at
  BEFORE UPDATE ON bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE bookmarks IS 'User bookmarks for hobbies';
COMMENT ON COLUMN bookmarks.user_id IS 'Reference to users table';
COMMENT ON COLUMN bookmarks.hobby_id IS 'Hobby identifier from hobbies constant';



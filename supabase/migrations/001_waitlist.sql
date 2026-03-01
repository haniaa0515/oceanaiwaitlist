-- Waitlist table for collecting email signups
-- Run this in your Supabase SQL Editor after creating a project

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by email (used by UNIQUE constraint)
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);

-- Row Level Security (RLS): Only allow INSERT from anonymous users
-- No SELECT/UPDATE/DELETE from client - you manage data via Supabase Dashboard
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Email format validated by Zod on the client; DB keeps it simple

# Waitlist Setup Guide

This app collects waitlist emails securely via Supabase. Follow these steps to enable it.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project
3. Wait for the project to finish provisioning

## 2. Create the Waitlist Table

In the Supabase Dashboard → **SQL Editor**, run the migration:

```sql
-- From supabase/migrations/001_waitlist.sql
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. In Supabase Dashboard → **Settings** → **API**, copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 4. View Waitlist Emails

In Supabase Dashboard → **Table Editor** → `waitlist`, you can view and export all signups.

---

## Security Notes

- **RLS**: Row Level Security allows only `INSERT` from anonymous users. No one can read or modify data from the client.
- **Validation**: Emails are validated with Zod (format, length) before submission.
- **Sanitization**: Emails are trimmed and lowercased for consistency.
- **Idempotent**: Duplicate emails are treated as success (user already on list).
- **Secrets**: Never commit `.env`; the anon key is safe for client-side use when RLS is configured.

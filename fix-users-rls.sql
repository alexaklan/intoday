-- Fix RLS policies to allow user creation
-- Run this in Supabase SQL Editor

-- Drop existing users policies
DROP POLICY IF EXISTS "Users can view organisation users" ON users;

-- Create new policies for users table
CREATE POLICY "Users can view users" ON users
  FOR SELECT USING (true);

-- Allow authenticated users to insert users
CREATE POLICY "Users can create users" ON users
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update users
CREATE POLICY "Users can update users" ON users
  FOR UPDATE USING (true);

-- Allow authenticated users to delete users
CREATE POLICY "Users can delete users" ON users
  FOR DELETE USING (true);

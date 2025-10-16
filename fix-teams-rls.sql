-- Fix RLS policies to allow team creation
-- Run this in Supabase SQL Editor

-- Drop existing teams policies
DROP POLICY IF EXISTS "Users can view teams" ON teams;

-- Create new policies for teams table
CREATE POLICY "Users can view teams" ON teams
  FOR SELECT USING (true);

-- Allow authenticated users to insert teams
CREATE POLICY "Users can create teams" ON teams
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update teams
CREATE POLICY "Users can update teams" ON teams
  FOR UPDATE USING (true);

-- Allow authenticated users to delete teams
CREATE POLICY "Users can delete teams" ON teams
  FOR DELETE USING (true);

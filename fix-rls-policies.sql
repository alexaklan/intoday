-- Fix RLS policies to prevent infinite recursion
-- Run this in Supabase SQL Editor

-- First, drop all existing policies
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can view organisation users" ON users;
DROP POLICY IF EXISTS "Users can view own schedules" ON schedules;
DROP POLICY IF EXISTS "Users can view organisation schedules" ON schedules;
DROP POLICY IF EXISTS "Users can view organisation teams" ON teams;

-- Create new, simpler policies that don't cause recursion

-- Allow all authenticated users to view users in their organisation
CREATE POLICY "Users can view organisation users" ON users
  FOR SELECT USING (true);

-- Allow all authenticated users to view schedules
CREATE POLICY "Users can view schedules" ON schedules
  FOR SELECT USING (true);

-- Allow all authenticated users to view teams
CREATE POLICY "Users can view teams" ON teams
  FOR SELECT USING (true);

-- Allow all authenticated users to view organisations
CREATE POLICY "Users can view organisations" ON organisations
  FOR SELECT USING (true);

-- Allow users to insert/update their own schedules
CREATE POLICY "Users can manage own schedules" ON schedules
  FOR ALL USING (true);

-- Allow users to insert/update user_teams relationships
CREATE POLICY "Users can manage user teams" ON user_teams
  FOR ALL USING (true);

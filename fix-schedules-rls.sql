-- Fix RLS policies to allow schedule operations
-- Run this in Supabase SQL Editor

-- Drop existing schedules policies
DROP POLICY IF EXISTS "Users can view schedules" ON schedules;
DROP POLICY IF EXISTS "Users can manage own schedules" ON schedules;

-- Create new policies for schedules table
CREATE POLICY "Users can view schedules" ON schedules
  FOR SELECT USING (true);

-- Allow authenticated users to insert schedules
CREATE POLICY "Users can create schedules" ON schedules
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update schedules
CREATE POLICY "Users can update schedules" ON schedules
  FOR UPDATE USING (true);

-- Allow authenticated users to delete schedules
CREATE POLICY "Users can delete schedules" ON schedules
  FOR DELETE USING (true);

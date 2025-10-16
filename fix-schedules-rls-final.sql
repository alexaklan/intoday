-- Fix RLS policies for schedules table
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view schedules" ON schedules;
DROP POLICY IF EXISTS "Users can create schedules" ON schedules;
DROP POLICY IF EXISTS "Users can update schedules" ON schedules;
DROP POLICY IF EXISTS "Users can delete schedules" ON schedules;

-- Create new policies for schedules table
-- Allow all authenticated users to view schedules
CREATE POLICY "Users can view schedules" ON schedules
  FOR SELECT USING (true);

-- Allow all authenticated users to insert schedules
CREATE POLICY "Users can create schedules" ON schedules
  FOR INSERT WITH CHECK (true);

-- Allow all authenticated users to update schedules
CREATE POLICY "Users can update schedules" ON schedules
  FOR UPDATE USING (true);

-- Allow all authenticated users to delete schedules
CREATE POLICY "Users can delete schedules" ON schedules
  FOR DELETE USING (true);

-- Ensure RLS is enabled
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

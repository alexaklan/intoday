-- Update sample users to match authentication system
-- Run this in Supabase SQL Editor

-- First, let's clear existing sample data
DELETE FROM user_teams;
DELETE FROM schedules;
DELETE FROM teams;
DELETE FROM users;
DELETE FROM organisations;

-- Insert organisations
INSERT INTO organisations (id, name, subdomain, status, plan) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Aklan Technologies', 'aklan', 'active', 'pro'),
  ('550e8400-e29b-41d4-a716-446655440001', 'TechCorp Solutions', 'techcorp', 'active', 'free');

-- Insert users with proper email addresses that match our auth system
INSERT INTO users (id, name, email, password_hash, role, organisation_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'Alice Johnson', 'admin@aklan.io', '$2a$10$dummy', 'org_admin', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440011', 'Bob Smith', 'superadmin@aklan.io', '$2a$10$dummy', 'app_admin', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440012', 'Ethan Hunt', 'user@aklan.io', '$2a$10$dummy', 'staff', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440013', 'Sarah Wilson', 'ethan@aklan.io', '$2a$10$dummy', 'staff', '550e8400-e29b-41d4-a716-446655440000');

-- Insert teams
INSERT INTO teams (id, name, organisation_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', 'Development', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440021', 'Leadership', '550e8400-e29b-41d4-a716-446655440000');

-- Insert user-team relationships
INSERT INTO user_teams (user_id, team_id) VALUES
  -- Alice Johnson (admin) is in both teams
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440021'),
  -- Bob Smith (superadmin) is in Leadership
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440021'),
  -- Ethan Hunt (user) is in Development
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440020'),
  -- Sarah Wilson (ethan@aklan.io) is in both teams (multi-team user)
  ('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440021');

-- Insert some sample schedules
INSERT INTO schedules (user_id, date, location) VALUES
  -- Alice Johnson schedules
  ('550e8400-e29b-41d4-a716-446655440010', '2024-01-15', 'office'),
  ('550e8400-e29b-41d4-a716-446655440010', '2024-01-16', 'home'),
  ('550e8400-e29b-41d4-a716-446655440010', '2024-01-17', 'office'),
  ('550e8400-e29b-41d4-a716-446655440010', '2024-01-18', 'office'),
  ('550e8400-e29b-41d4-a716-446655440010', '2024-01-19', 'home'),
  
  -- Ethan Hunt schedules
  ('550e8400-e29b-41d4-a716-446655440012', '2024-01-15', 'home'),
  ('550e8400-e29b-41d4-a716-446655440012', '2024-01-16', 'office'),
  ('550e8400-e29b-41d4-a716-446655440012', '2024-01-17', 'office'),
  ('550e8400-e29b-41d4-a716-446655440012', '2024-01-18', 'home'),
  ('550e8400-e29b-41d4-a716-446655440012', '2024-01-19', 'office');

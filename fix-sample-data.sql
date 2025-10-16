-- Simple script to insert sample data
-- Run this in Supabase SQL Editor

-- Clear existing data first
DELETE FROM user_teams WHERE user_id IN (
  SELECT id FROM users WHERE email IN ('admin@aklan.io', 'user@aklan.io', 'superadmin@aklan.io', 'ethan@aklan.io')
);
DELETE FROM schedules WHERE user_id IN (
  SELECT id FROM users WHERE email IN ('admin@aklan.io', 'user@aklan.io', 'superadmin@aklan.io', 'ethan@aklan.io')
);
DELETE FROM users WHERE email IN ('admin@aklan.io', 'user@aklan.io', 'superadmin@aklan.io', 'ethan@aklan.io');
DELETE FROM teams WHERE organisation_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM organisations WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Insert organisation
INSERT INTO organisations (id, name, subdomain, status, plan) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Aklan Technologies', 'aklan', 'active', 'pro');

-- Insert users
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
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440021'),
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440021'),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440021');

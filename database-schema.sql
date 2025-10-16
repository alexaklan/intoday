-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create organisations table
CREATE TABLE organisations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('staff', 'org_admin', 'app_admin')),
  organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, organisation_id)
);

-- Create user_teams junction table
CREATE TABLE user_teams (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, team_id)
);

-- Create schedules table
CREATE TABLE schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  location VARCHAR(10) DEFAULT 'office' CHECK (location IN ('office', 'home')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for better performance
CREATE INDEX idx_users_organisation_id ON users(organisation_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_teams_organisation_id ON teams(organisation_id);
CREATE INDEX idx_user_teams_user_id ON user_teams(user_id);
CREATE INDEX idx_user_teams_team_id ON user_teams(team_id);
CREATE INDEX idx_schedules_user_id ON schedules(user_id);
CREATE INDEX idx_schedules_date ON schedules(date);
CREATE INDEX idx_schedules_user_date ON schedules(user_id, date);

-- Enable Row Level Security (RLS)
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic - we'll refine these later)
-- Users can only see their own data and users in their organisation
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view organisation users" ON users
  FOR SELECT USING (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE id::text = auth.uid()::text
    )
  );

-- Schedules policies
CREATE POLICY "Users can view own schedules" ON schedules
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view organisation schedules" ON schedules
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM users WHERE organisation_id IN (
        SELECT organisation_id FROM users WHERE id::text = auth.uid()::text
      )
    )
  );

-- Teams policies
CREATE POLICY "Users can view organisation teams" ON teams
  FOR SELECT USING (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE id::text = auth.uid()::text
    )
  );

-- Insert sample data
INSERT INTO organisations (id, name, subdomain, status, plan) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Aklan Technologies', 'aklan', 'active', 'pro'),
  ('550e8400-e29b-41d4-a716-446655440001', 'TechCorp Solutions', 'techcorp', 'active', 'free');

INSERT INTO users (id, name, email, password_hash, role, organisation_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'Alice Johnson', 'admin@aklan.io', '$2a$10$dummy', 'org_admin', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440011', 'Bob Smith', 'user@aklan.io', '$2a$10$dummy', 'staff', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440012', 'Ethan Hunt', 'ethan@aklan.io', '$2a$10$dummy', 'staff', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440013', 'Super Admin', 'superadmin@aklan.io', '$2a$10$dummy', 'app_admin', '550e8400-e29b-41d4-a716-446655440000');

INSERT INTO teams (id, name, organisation_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', 'Development', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440021', 'Leadership', '550e8400-e29b-41d4-a716-446655440000');

INSERT INTO user_teams (user_id, team_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440021'),
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440020'),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440021');

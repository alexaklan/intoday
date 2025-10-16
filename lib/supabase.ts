import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://xhwafzvkgcfnzlumaupa.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod2FmenZrZ2NmbnpsdW1hdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODI4MjAsImV4cCI6MjA3NjE1ODgyMH0.EfU1EzMhcmZfZvLxMQXWo4lVRzCXuOEjdWEu4rNZlMo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (we'll define these as we create tables)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'staff' | 'org_admin' | 'app_admin'
          organisation_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: 'staff' | 'org_admin' | 'app_admin'
          organisation_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'staff' | 'org_admin' | 'app_admin'
          organisation_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      organisations: {
        Row: {
          id: string
          name: string
          subdomain: string
          status: 'active' | 'inactive' | 'suspended'
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subdomain: string
          status?: 'active' | 'inactive' | 'suspended'
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subdomain?: string
          status?: 'active' | 'inactive' | 'suspended'
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          organisation_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          organisation_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          organisation_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_teams: {
        Row: {
          user_id: string
          team_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          team_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          team_id?: string
          created_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          user_id: string
          date: string
          location: 'office' | 'home'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          location: 'office' | 'home'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          location?: 'office' | 'home'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

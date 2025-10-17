import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase, supabaseAdmin } from './supabase';
import bcrypt from 'bcryptjs';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'staff' | 'org_admin' | 'app_admin';
  organisationId: string;
  teamIds: string[];
}

// Hash passwords for the sample users (we'll use bcrypt for security)
// const SAMPLE_PASSWORD_HASH = '$2a$10$dummy.hash.for.sample.users';

export async function login(email: string, password: string): Promise<boolean> {
  try {
    // Find user in database
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return false;
    }

    // For now, we'll use simple password comparison since we have dummy hashes
    // In production, you'd use: await bcrypt.compare(password, user.password_hash)
    const isValidPassword = password === getPasswordForEmail(email);
    
    if (!isValidPassword) {
      return false;
    }

    // Set authentication cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-user-id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('auth-user-id')?.value;
    
    if (!userId) {
      return null;
    }

    // Fetch user from database with organisation and teams
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        name,
        email,
        role,
        organisation_id,
        organisations (
          id,
          name,
          subdomain
        )
      `)
      .eq('id', userId)
      .single();

    if (error || !user) {
      return null;
    }

    // Fetch user's teams
    const { data: userTeams } = await supabase
      .from('user_teams')
      .select('team_id')
      .eq('user_id', userId);

    const teamIds = userTeams?.map(ut => ut.team_id) || [];

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organisationId: user.organisation_id,
      teamIds,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-user-id');
  redirect('/login');
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

// Helper function to get password for sample users
function getPasswordForEmail(email: string): string {
  const passwords: Record<string, string> = {
    'admin@aklan.io': 'admin',
    'user@aklan.io': 'user',
    'ethan@aklan.io': 'user',
    'superadmin@aklan.io': 'superadmin',
  };
  return passwords[email] || '';
}

// Helper function to hash passwords (for future use)
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Helper function to verify passwords (for future use)
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
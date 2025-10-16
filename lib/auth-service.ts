import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'staff' | 'org_admin' | 'app_admin';
  organisationId: string;
  teamIds: string[];
}

// Business rules for authentication
const authCredentials = {
  'user@aklan.io': { password: 'user', userId: 'user-4' }, // Ethan Hunt (staff)
  'admin@aklan.io': { password: 'admin', userId: 'user-0' }, // Alice Johnson (org_admin)
  'superadmin@aklan.io': { password: 'superadmin', userId: 'user-1' }, // Bob Smith (app_admin)
};

export async function login(email: string, password: string): Promise<boolean> {
  const credential = authCredentials[email as keyof typeof authCredentials];
  
  if (!credential || credential.password !== password) {
    return false;
  }

  // Set authentication cookie
  const cookieStore = await cookies();
  cookieStore.set('auth-user-id', credential.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return true;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth-user-id')?.value;
  
  if (!userId) {
    return null;
  }

  // In a real app, you'd fetch from database
  // For now, we'll use mock data
  const mockUsers = [
    {
      id: 'user-0',
      email: 'admin@aklan.io',
      name: 'Alice Johnson',
      role: 'org_admin' as const,
      organisationId: 'org-1',
      teamIds: ['team-1'],
    },
    {
      id: 'user-1',
      email: 'superadmin@aklan.io',
      name: 'Bob Smith',
      role: 'app_admin' as const,
      organisationId: 'org-1',
      teamIds: ['team-2'],
    },
    {
      id: 'user-4',
      email: 'user@aklan.io',
      name: 'Ethan Hunt',
      role: 'staff' as const,
      organisationId: 'org-1',
      teamIds: ['team-1', 'team-2'],
    },
  ];

  return mockUsers.find(u => u.id === userId) || null;
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
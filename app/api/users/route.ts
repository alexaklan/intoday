import { NextRequest, NextResponse } from 'next/server';
import { getUsersByOrganisation, createUser } from '@/lib/database-service';
import { requireAuth } from '@/lib/auth-service';

// GET /api/users - Fetch users for an organisation
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    if (user.role !== 'org_admin' && user.role !== 'app_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const organisationId = user.organisationId;
    const users = await getUsersByOrganisation(organisationId);

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    if (user.role !== 'org_admin' && user.role !== 'app_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, role, teamIds } = body;

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate role
    if (!['staff', 'org_admin', 'app_admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Create user
    const userId = await createUser(
      name,
      email,
      role as 'staff' | 'org_admin' | 'app_admin',
      user.organisationId,
      teamIds || []
    );

    if (!userId) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getTeamsByOrganisation, createTeam } from '@/lib/database-service';
import { requireAuth } from '@/lib/auth-service';

// GET /api/teams - Fetch teams for an organisation
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    if (user.role !== 'org_admin' && user.role !== 'app_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const organisationId = user.organisationId;
    const teams = await getTeamsByOrganisation(organisationId);

    return NextResponse.json({ success: true, teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/teams - Create a new team
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    if (user.role !== 'org_admin' && user.role !== 'app_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { name, userIds } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    // Create team
    const teamId = await createTeam(
      name,
      user.organisationId,
      userIds || []
    );

    if (!teamId) {
      return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }

    return NextResponse.json({ success: true, teamId });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

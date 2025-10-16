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
    console.log('POST /api/teams - Starting team creation');
    
    const user = await requireAuth();
    console.log('POST /api/teams - User authenticated:', user.id, user.role);
    
    if (user.role !== 'org_admin' && user.role !== 'app_admin') {
      console.log('POST /api/teams - Unauthorized role:', user.role);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    console.log('POST /api/teams - Request body:', body);
    
    const { name, userIds } = body;

    // Validate required fields
    if (!name) {
      console.log('POST /api/teams - Missing team name');
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    console.log('POST /api/teams - Calling createTeam with:', {
      name,
      organisationId: user.organisationId,
      userIds: userIds || []
    });

    // Create team
    const teamId = await createTeam(
      name,
      user.organisationId,
      userIds || []
    );

    console.log('POST /api/teams - createTeam result:', teamId);

    if (!teamId) {
      console.log('POST /api/teams - createTeam returned null');
      return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }

    console.log('POST /api/teams - Team created successfully:', teamId);
    return NextResponse.json({ success: true, teamId });
  } catch (error) {
    console.error('POST /api/teams - Error creating team:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

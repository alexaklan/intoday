import { NextRequest, NextResponse } from 'next/server';
import { createTeam } from '@/lib/database-service';
import { requireAuth } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    console.log('TEST: Starting team creation test');
    
    const user = await requireAuth();
    console.log('TEST: User authenticated:', user.id, user.role, user.organisationId);
    
    const body = await request.json();
    console.log('TEST: Request body:', body);
    
    const { name, userIds } = body;

    console.log('TEST: Calling createTeam with:', {
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

    console.log('TEST: createTeam result:', teamId);

    if (!teamId) {
      console.log('TEST: createTeam returned null');
      return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }

    console.log('TEST: Team created successfully:', teamId);
    return NextResponse.json({ success: true, teamId });
  } catch (error) {
    console.error('TEST: Error creating team:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

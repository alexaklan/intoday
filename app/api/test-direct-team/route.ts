import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('DIRECT TEST: Testing team creation directly');
    
    const body = await request.json();
    const { name, organisationId } = body;
    
    console.log('DIRECT TEST: Creating team with:', { name, organisationId });

    // Test direct team creation
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert({
        name,
        organisation_id: organisationId,
      })
      .select('id')
      .single();

    console.log('DIRECT TEST: Team creation result:', { team, teamError });

    if (teamError) {
      console.error('DIRECT TEST: Team creation failed:', teamError);
      return NextResponse.json({ 
        success: false, 
        error: 'Team creation failed',
        details: teamError 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      teamId: team.id,
      message: 'Team created successfully' 
    });
  } catch (error) {
    console.error('DIRECT TEST: Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

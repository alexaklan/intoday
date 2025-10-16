import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('Debug: Starting database debug...');

    // Test 1: Simple organisations query
    const { data: orgs, error: orgError } = await supabase
      .from('organisations')
      .select('*');

    console.log('Organisations query:', { orgs, orgError });

    // Test 2: Simple users query
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*');

    console.log('Users query:', { users, userError });

    // Test 3: Simple teams query
    const { data: teams, error: teamError } = await supabase
      .from('teams')
      .select('*');

    console.log('Teams query:', { teams, teamError });

    return NextResponse.json({
      success: true,
      debug: {
        organisations: orgs || [],
        users: users || [],
        teams: teams || [],
        errors: {
          organisations: orgError?.message,
          users: userError?.message,
          teams: teamError?.message,
        }
      }
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

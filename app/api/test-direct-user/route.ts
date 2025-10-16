import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('USER TEST: Testing user creation directly');
    
    const body = await request.json();
    const { name, email, role, organisationId } = body;
    
    console.log('USER TEST: Creating user with:', { name, email, role, organisationId });

    // Test direct user creation
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password_hash: '$2a$10$dummy.hash.for.new.users',
        role,
        organisation_id: organisationId,
      })
      .select('id')
      .single();

    console.log('USER TEST: User creation result:', { user, userError });

    if (userError) {
      console.error('USER TEST: User creation failed:', userError);
      return NextResponse.json({ 
        success: false, 
        error: 'User creation failed',
        details: userError 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      userId: user.id,
      message: 'User created successfully' 
    });
  } catch (error) {
    console.error('USER TEST: Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

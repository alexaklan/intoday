import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';

export async function GET(request: NextRequest) {
  try {
    console.log('Debug auth endpoint called');
    
    const user = await getCurrentUser();
    console.log('getCurrentUser result:', user);
    
    if (!user) {
      return NextResponse.json({ 
        error: 'No user found',
        debug: 'getCurrentUser returned null/undefined'
      }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organisationId: user.organisationId
      }
    });
  } catch (error) {
    console.error('Error in debug auth:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    console.log('=== SCHEDULE AUTH TEST START ===');
    
    // Check cookies
    const cookies = request.headers.get('cookie');
    console.log('Cookies received:', cookies);
    
    // Try to get current user
    const user = await getCurrentUser();
    console.log('getCurrentUser result:', user);
    
    if (!user) {
      console.log('No user found - returning 401');
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - no user found',
        cookies: cookies 
      }, { status: 401 });
    }
    
    console.log('User found:', { id: user.id, email: user.email, role: user.role });
    
    const body = await request.json();
    console.log('Request body:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Authentication working',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      requestBody: body
    });
  } catch (error) {
    console.error('=== SCHEDULE AUTH TEST ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

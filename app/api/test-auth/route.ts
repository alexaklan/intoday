import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';

export async function GET() {
  try {
    console.log('=== AUTH TEST START ===');
    
    const user = await getCurrentUser();
    console.log('getCurrentUser result:', user);
    
    return NextResponse.json({
      success: true,
      user: user ? {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      } : null,
    });
  } catch (error) {
    console.error('=== AUTH TEST ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

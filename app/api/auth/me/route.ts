import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

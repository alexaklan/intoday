import { NextRequest, NextResponse } from 'next/server';
import { login, getCurrentUser } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const success = await login(email, password);
    
    if (success) {
      const user = await getCurrentUser();
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
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

import { NextRequest, NextResponse } from 'next/server';
import { updateUserSchedule } from '@/lib/database-service';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST UPDATE SCHEDULE START ===');
    
    const body = await request.json();
    const { userId, date, location } = body;
    
    console.log('Input parameters:', { userId, date, location });
    
    // Test the exact same call that's failing
    const success = await updateUserSchedule(userId, new Date(date), location);
    
    console.log('updateUserSchedule result:', success);
    
    return NextResponse.json({
      success: success,
      message: success ? 'Schedule updated successfully' : 'Schedule update failed',
      input: { userId, date, location },
      result: success
    });
  } catch (error) {
    console.error('=== TEST UPDATE SCHEDULE ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

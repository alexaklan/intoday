import { NextRequest, NextResponse } from 'next/server';
import { updateUserSchedule } from '@/lib/database-service';

// POST /api/test-schedule - Test schedule update without auth
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, date, location } = body;

    console.log('Test schedule update:', { userId, date, location });

    // Validate required fields
    if (!userId || !date || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate location
    if (!['office', 'home'].includes(location)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
    }

    const success = await updateUserSchedule(userId, new Date(date), location);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error in test schedule update:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getUserSchedulesForWeek, updateUserSchedule } from '@/lib/database-service';
import { getCurrentUser } from '@/lib/auth-service';

// GET /api/schedules - Fetch schedules for a user and week
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const weekStart = searchParams.get('weekStart');

    if (!userId || !weekStart) {
      return NextResponse.json({ error: 'Missing userId or weekStart parameter' }, { status: 400 });
    }

    // Check permissions: users can only view their own schedules, admins can view any
    if (user.role === 'staff' && userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const schedules = await getUserSchedulesForWeek(userId, new Date(weekStart));

    return NextResponse.json({ success: true, schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/schedules - Update a user's schedule
export async function POST(request: NextRequest) {
  try {
    console.log('Schedule POST called');
    
    const user = await getCurrentUser();
    console.log('Current user:', user ? { id: user.id, email: user.email, role: user.role } : 'null');
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { userId, date, location } = body;
    console.log('Request body:', { userId, date, location });

    // Validate required fields
    if (!userId || !date || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate location
    if (!['office', 'home'].includes(location)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
    }

    // Check permissions: users can only edit their own schedules, admins can edit any
    if (user.role === 'staff' && userId !== user.id) {
      console.log('Permission denied: staff user trying to edit another user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    console.log('Calling updateUserSchedule...');
    const success = await updateUserSchedule(userId, new Date(date), location);
    console.log('updateUserSchedule result:', success);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

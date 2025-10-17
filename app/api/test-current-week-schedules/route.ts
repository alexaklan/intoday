import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { startOfWeek, addDays } from 'date-fns';

export async function GET() {
  try {
    const userId = '550e8400-e29b-41d4-a716-446655440012'; // Ethan Hunt
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    const weekEnd = addDays(weekStart, 6); // Sunday

    console.log('Loading schedules for current week:', {
      userId,
      weekStart: weekStart.toISOString().split('T')[0],
      weekEnd: weekEnd.toISOString().split('T')[0]
    });

    const { data: schedules, error } = await supabaseAdmin
      .from('schedules')
      .select('date, location')
      .eq('user_id', userId)
      .gte('date', weekStart.toISOString().split('T')[0])
      .lte('date', weekEnd.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    // Generate the 5 weekdays for this week
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      weekDates.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }

    return NextResponse.json({
      success: true,
      currentWeek: {
        start: weekStart.toISOString().split('T')[0],
        end: weekEnd.toISOString().split('T')[0],
        weekDates: weekDates
      },
      schedules: schedules,
      count: schedules?.length || 0,
      message: 'This is what the app loads for the current week'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

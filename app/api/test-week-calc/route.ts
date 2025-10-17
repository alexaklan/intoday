import { NextResponse } from 'next/server';
import { startOfWeek } from 'date-fns';

export async function GET() {
  try {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    
    // Generate the 5 weekdays for this week
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      weekDates.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }

    return NextResponse.json({
      success: true,
      today: today.toISOString().split('T')[0],
      weekStart: weekStart.toISOString().split('T')[0],
      weekDates: weekDates,
      message: 'This is what the app is looking for in the database'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

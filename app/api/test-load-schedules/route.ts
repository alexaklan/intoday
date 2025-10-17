import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('=== LOAD SCHEDULES TEST START ===');
    
    const userId = '550e8400-e29b-41d4-a716-446655440012'; // Ethan Hunt
    
    // Get all schedules for this user
    const { data: schedules, error } = await supabaseAdmin
      .from('schedules')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    console.log('Loaded schedules:', schedules);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      schedules: schedules,
      count: schedules?.length || 0,
    });
  } catch (error) {
    console.error('=== LOAD SCHEDULES TEST ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

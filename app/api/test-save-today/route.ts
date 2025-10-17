import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const userId = '550e8400-e29b-41d4-a716-446655440012'; // Ethan Hunt
    const today = '2025-10-17'; // Today's date
    const location = 'home'; // Test location
    
    console.log('Saving schedule for today:', { userId, today, location });

    const { data, error } = await supabaseAdmin
      .from('schedules')
      .upsert({
        user_id: userId,
        date: today,
        location: location,
        updated_at: new Date().toISOString(),
      })
      .select();

    console.log('Save result:', { data, error });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Today\'s schedule saved successfully',
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

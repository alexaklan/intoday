import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('=== DIRECT SAVE TEST START ===');
    
    const userId = '550e8400-e29b-41d4-a716-446655440012'; // Ethan Hunt
    const dateString = '2025-10-16';
    const location = 'home';
    
    console.log('Attempting to save:', { userId, dateString, location });

    const { data, error } = await supabaseAdmin
      .from('schedules')
      .upsert({
        user_id: userId,
        date: dateString,
        location: location,
        updated_at: new Date().toISOString(),
      })
      .select();

    console.log('Supabase result:', { data, error });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
      });
    }

    console.log('=== DIRECT SAVE TEST SUCCESS ===');
    return NextResponse.json({
      success: true,
      message: 'Schedule saved successfully',
      data,
    });
  } catch (error) {
    console.error('=== DIRECT SAVE TEST ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

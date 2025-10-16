import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Test if Service Role Key is working by trying to update an existing record
    const { data, error } = await supabaseAdmin
      .from('schedules')
      .upsert({
        user_id: '550e8400-e29b-41d4-a716-446655440012', // Ethan Hunt's ID
        date: '2025-10-16',
        location: 'home',
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Service Role Key is working - upsert successful',
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

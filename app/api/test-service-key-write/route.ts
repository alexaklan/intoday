import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('=== TEST SERVICE KEY WRITE START ===');
    
    // Try to update an existing record (this should work with Service Role Key)
    const { data, error } = await supabaseAdmin
      .from('schedules')
      .update({ 
        location: 'office',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', '550e8400-e29b-41d4-a716-446655440012')
      .eq('date', '2025-10-17')
      .select();

    console.log('Service Key write result:', { data, error });

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
      message: 'Service Role Key write successful',
      data: data,
    });
  } catch (error) {
    console.error('=== TEST SERVICE KEY WRITE ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

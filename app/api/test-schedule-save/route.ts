import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST SCHEDULE SAVE START ===');
    
    const body = await request.json();
    const { userId, date, location } = body;
    
    console.log('Request body:', { userId, date, location });

    const dateString = date;
    console.log('Date string:', dateString);

    console.log('Calling supabaseAdmin.upsert...');
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

    console.log('=== TEST SCHEDULE SAVE SUCCESS ===');
    return NextResponse.json({
      success: true,
      message: 'Schedule saved successfully',
      data,
    });
  } catch (error) {
    console.error('=== TEST SCHEDULE SAVE ERROR ===', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

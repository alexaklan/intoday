import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        code: error.code,
        details: error.details
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection working',
      data: data
    });
  } catch (error) {
    console.error('Error testing Supabase:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Testing Supabase insert...');
    
    const body = await request.json();
    const { userId, date, location } = body;

    // Test insert
    const { error } = await supabase
      .from('schedules')
      .upsert({
        user_id: userId,
        date: date,
        location: location,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        code: error.code,
        details: error.details
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase insert working'
    });
  } catch (error) {
    console.error('Error testing Supabase insert:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

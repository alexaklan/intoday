import { NextResponse } from 'next/server';

export async function GET() {
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  return NextResponse.json({
    environment: {
      hasServiceRoleKey: hasServiceKey,
      hasAnonKey: hasAnonKey,
      hasUrl: hasUrl,
      serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
      anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    }
  });
}

import { NextResponse } from "next/server";

/* 
  POST /api/admin/login
  Body: { email: string; password: string }
  Sets an HttpOnly cookie if credentials match .env.local values.
*/
export async function POST() {
  return NextResponse.json(
    { error: "Deprecated endpoint. Sign in through Supabase Auth." },
    { status: 410 }
  );
}

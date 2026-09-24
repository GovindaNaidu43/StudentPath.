import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/authorization";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") === "/admin" ? "/admin" : "/explore";

  if (!code) {
    return NextResponse.redirect(new URL("/auth?error=callback_failed", request.url));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/auth?error=callback_failed", request.url));
  }

  const profile = await getCurrentProfile();
  const destination = profile?.role === "admin" && next === "/admin" ? "/admin" : "/explore";
  return NextResponse.redirect(new URL(destination, request.url));
}
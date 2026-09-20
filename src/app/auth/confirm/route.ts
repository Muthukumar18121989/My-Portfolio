import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Where the magic-link email points (see sendMagicLink in
// src/app/admin/login/actions.ts). Supabase's default email template
// links here with token_hash + type; verifyOtp exchanges those for a
// real session, then this redirects into /admin.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo = request.nextUrl.clone();
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      redirectTo.pathname = "/admin";
      return NextResponse.redirect(redirectTo);
    }
  }

  redirectTo.pathname = "/admin/login";
  redirectTo.searchParams.set("error", "invalid-link");
  return NextResponse.redirect(redirectTo);
}

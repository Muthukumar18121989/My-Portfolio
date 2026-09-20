"use server";

import { createClient } from "@/lib/supabase/server";

export interface SendMagicLinkState {
  status: "idle" | "sent" | "error";
  error?: string;
}

export async function sendMagicLink(
  _prevState: SendMagicLinkState,
  formData: FormData
): Promise<SendMagicLinkState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    return { status: "error", error: "Enter your email address." };
  }
  if (email !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    // Deliberately vague — don't confirm/deny whether an email is "the"
    // admin account to anyone probing the login form.
    return { status: "error", error: "That email isn't authorized for admin access." };
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl}/auth/confirm` },
  });

  if (error) {
    return { status: "error", error: error.message };
  }

  return { status: "sent" };
}

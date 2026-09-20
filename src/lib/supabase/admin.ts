import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Privileged client — the Secret key bypasses Row Level Security entirely.
// Server-only, and every call site MUST call requireAdminForAction() (see
// auth.ts) before using this, since this client itself enforces nothing.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Unauthenticated read client for the public site's Server Components — no
// cookie/session plumbing needed since every table's RLS policy is
// "public read" (see supabase/schema.sql). Kept separate from
// lib/supabase/server.ts (which is cookie-aware, for the admin surface)
// so public page renders don't carry that overhead.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

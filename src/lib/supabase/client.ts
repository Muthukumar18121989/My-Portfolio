import { createBrowserClient } from "@supabase/ssr";

// Browser-side client — uses the Publishable key (safe to expose), subject
// to the RLS policies in supabase/schema.sql (public read, no public
// write). Only used by admin client components for auth (sign-in/sign-out);
// content mutations go through Server Actions using the Secret key instead.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

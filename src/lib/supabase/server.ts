import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side client for Server Components/Actions/Route Handlers — reads
// the signed-in user's session from cookies. Still subject to RLS (public
// read, no public write); it's what requireAdmin() uses to check *who* is
// signed in, not what performs privileged writes (see admin.ts for that).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component during render, where cookies
            // can't be set — harmless as long as middleware.ts is also
            // refreshing the session on every /admin request.
          }
        },
      },
    }
  );
}

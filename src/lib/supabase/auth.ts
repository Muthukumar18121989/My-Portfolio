import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "./server";

// Single-owner admin: there's no roles table, just one allowed email
// (ADMIN_EMAIL) checked server-side on every protected page/action,
// independent of anything client-side or RLS-based.

/** For pages/layouts — redirects to /admin/login instead of rendering. */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  return user;
}

/** For Server Actions — throws instead of redirecting, so the caller can
    surface an error to the form rather than silently navigating away. */
export async function requireAdminForAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Not authorized.");
  }

  return user;
}

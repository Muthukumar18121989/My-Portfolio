import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/supabase/auth";
import { signOut } from "@/app/(admin)/admin/actions";

// Route group, not a URL segment — this wraps everything at /admin/* EXCEPT
// /admin/login, which lives outside (dashboard) specifically so the
// requireAdmin() redirect below can't loop back into itself.
export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-svh flex-col">
      <header className="grid-line-b flex items-center justify-between px-6 py-4 md:px-10">
        <span className="text-meta text-fg-muted">
          Admin — <span className="text-fg">{user.email}</span>
        </span>
        <form action={signOut}>
          <button
            type="submit"
            className="text-meta text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Sign out
          </button>
        </form>
      </header>
      <main className="flex-1 px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}

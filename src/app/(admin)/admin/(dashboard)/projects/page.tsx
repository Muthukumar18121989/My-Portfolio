import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Globe, Lock } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProject } from "./actions";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("projects")
    .select("id, slug, title, company, visibility, featured")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-display-lg text-fg">Projects</h1>
          <p className="text-sm text-fg-muted">
            Case studies shown on the homepage and /projects — visibility controls the recruiter
            password gate.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/projects/new">
            <Plus className="size-4" aria-hidden="true" /> Add
          </Link>
        </Button>
      </div>

      {!data || data.length === 0 ? (
        <p className="border border-dashed border-border p-6 text-sm text-fg-muted">
          No projects yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {data.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-4 border border-border bg-bg-surface p-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="flex items-center gap-2 text-sm font-medium text-fg">
                  {p.title}
                  {p.featured && <span className="text-meta text-accent">Featured</span>}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-fg-muted">
                  {p.visibility === "private" ? (
                    <Lock className="size-3" aria-hidden="true" />
                  ) : (
                    <Globe className="size-3" aria-hidden="true" />
                  )}
                  {p.visibility} · {p.company} · /{p.slug}
                </span>
              </div>
              <div className="flex flex-none items-center gap-4">
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="text-meta text-fg-muted hover:text-fg"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteProject.bind(null, p.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestimonial } from "./actions";

export const metadata: Metadata = { title: "Testimonials" };
export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-display-lg text-fg">Testimonials</h1>
          <p className="text-sm text-fg-muted">
            Shown on the homepage&rsquo;s &ldquo;Kind words&rdquo; section.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/testimonials/new">
            <Plus className="size-4" aria-hidden="true" /> Add
          </Link>
        </Button>
      </div>

      {!data || data.length === 0 ? (
        <p className="border border-dashed border-border p-6 text-sm text-fg-muted">
          No testimonials yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {data.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between gap-4 border border-border bg-bg-surface p-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-fg">
                  {t.name}{" "}
                  {!t.published && <span className="text-meta text-fg-muted">(draft)</span>}
                </span>
                <span className="text-xs text-fg-muted">{t.quote}</span>
              </div>
              <div className="flex flex-none items-center gap-4">
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  className="text-meta text-fg-muted hover:text-fg"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteTestimonial.bind(null, t.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

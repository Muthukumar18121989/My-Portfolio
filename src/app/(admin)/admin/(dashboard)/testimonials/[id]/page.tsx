import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/auth";
import { TestimonialForm } from "../testimonial-form";

export const metadata: Metadata = { title: "Edit Testimonial" };
export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-display-lg text-fg">Edit Testimonial</h1>
      <TestimonialForm
        testimonial={{
          id: data.id,
          name: data.name,
          role: data.role,
          company: data.company,
          quote: data.quote,
          avatarUrl: data.avatar_url,
          published: data.published,
          sortOrder: data.sort_order,
        }}
      />
    </div>
  );
}

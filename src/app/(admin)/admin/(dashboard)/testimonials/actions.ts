"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { uploadAsset } from "@/lib/supabase/storage";

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

export async function saveTestimonial(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdminForAction();

  const id = String(formData.get("id") ?? "").trim() || null;
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!name || !quote) return { status: "error", error: "Name and quote are required." };

  const supabase = createAdminClient();
  const update: Record<string, unknown> = {
    name,
    role: role || null,
    company: company || null,
    quote,
    published,
  };

  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    try {
      update.avatar_url = await uploadAsset(avatar, "testimonials");
    } catch (err) {
      return {
        status: "error",
        error: err instanceof Error ? err.message : "Avatar upload failed.",
      };
    }
  }

  if (id) {
    const { error } = await supabase.from("testimonials").update(update).eq("id", id);
    if (error) return { status: "error", error: error.message };
  } else {
    const { count } = await supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true });
    const { error } = await supabase
      .from("testimonials")
      .insert({ ...update, sort_order: count ?? 0 });
    if (error) return { status: "error", error: error.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdminForAction();
  const supabase = createAdminClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/testimonials");
}

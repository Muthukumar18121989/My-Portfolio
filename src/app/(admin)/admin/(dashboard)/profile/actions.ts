"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { uploadAsset } from "@/lib/supabase/storage";

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

export async function saveProfile(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdminForAction();

  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const roleLong = String(formData.get("roleLong") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const yearsExperience = Number(formData.get("yearsExperience") ?? 0);
  const heroSummary = String(formData.get("heroSummary") ?? "").trim();
  const aboutIntro = String(formData.get("aboutIntro") ?? "").trim();
  const linkedinUrl = String(formData.get("linkedinUrl") ?? "").trim();

  if (!name || !role || !location || !email || !heroSummary || !aboutIntro) {
    return { status: "error", error: "All fields except LinkedIn are required." };
  }

  const supabase = createAdminClient();
  const update: Record<string, unknown> = {
    name,
    role,
    role_long: roleLong,
    location,
    email,
    years_experience: yearsExperience,
    hero_summary: heroSummary,
    about_intro: aboutIntro,
    linkedin_url: linkedinUrl || null,
  };

  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    try {
      update.photo_url = await uploadAsset(photo, "profile");
    } catch (err) {
      return {
        status: "error",
        error: err instanceof Error ? err.message : "Photo upload failed.",
      };
    }
  }

  const { error } = await supabase.from("profile").update(update).eq("id", 1);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/profile");
  return { status: "saved" };
}

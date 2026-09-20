"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { uploadAsset } from "@/lib/supabase/storage";

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

export async function saveSettings(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdminForAction();

  const careerTags = String(formData.get("careerTags") ?? "")
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

  const supabase = createAdminClient();
  const update: Record<string, unknown> = { career_tags: careerTags };

  const resume = formData.get("resume");
  if (resume instanceof File && resume.size > 0) {
    try {
      update.resume_url = await uploadAsset(resume, "resume");
    } catch (err) {
      return {
        status: "error",
        error: err instanceof Error ? err.message : "Resume upload failed.",
      };
    }
  }

  const { error } = await supabase.from("site_settings").update(update).eq("id", 1);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { status: "saved" };
}

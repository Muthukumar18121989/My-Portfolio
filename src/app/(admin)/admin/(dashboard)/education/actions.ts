"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

export async function saveEducation(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdminForAction();

  const degree = String(formData.get("degree") ?? "").trim();
  const school = String(formData.get("school") ?? "").trim();
  const dateRange = String(formData.get("dateRange") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();

  if (!degree || !school) return { status: "error", error: "Degree and school are required." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("education")
    .update({ degree, school, date_range: dateRange, detail })
    .eq("id", 1);
  if (error) return { status: "error", error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/education");
  return { status: "saved" };
}

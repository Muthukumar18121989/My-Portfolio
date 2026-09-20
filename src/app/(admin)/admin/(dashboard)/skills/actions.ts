"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

interface SkillGroupInput {
  label: string;
  items: string;
}

export async function saveSkillGroups(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdminForAction();

  let groups: SkillGroupInput[];
  try {
    groups = JSON.parse(String(formData.get("groups") ?? "[]"));
  } catch {
    return { status: "error", error: "Malformed form data." };
  }

  const rows = groups
    .filter((g) => g.label?.trim())
    .map((g, index) => ({
      label: g.label.trim(),
      items: g.items
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      sort_order: index,
    }));

  const supabase = createAdminClient();
  const { error: deleteError } = await supabase.from("skill_groups").delete().not("id", "is", null);
  if (deleteError) return { status: "error", error: deleteError.message };

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("skill_groups").insert(rows);
    if (insertError) return { status: "error", error: insertError.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/skills");
  return { status: "saved" };
}

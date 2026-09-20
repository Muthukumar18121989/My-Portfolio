"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SaveState } from "@/components/admin/list-editor";

export async function saveStats(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdminForAction();

  let items: Record<string, string>[];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { status: "error", error: "Malformed form data." };
  }

  const rows = items
    .filter((item) => item.value?.trim() && item.label?.trim())
    .map((item, index) => ({
      value: item.value.trim(),
      label: item.label.trim(),
      sort_order: index,
    }));

  const supabase = createAdminClient();
  const { error: deleteError } = await supabase.from("stats").delete().not("id", "is", null);
  if (deleteError) return { status: "error", error: deleteError.message };

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("stats").insert(rows);
    if (insertError) return { status: "error", error: insertError.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/stats");
  return { status: "saved" };
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SaveState } from "@/components/admin/list-editor";

export async function savePhilosophy(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdminForAction();

  let items: Record<string, string>[];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { status: "error", error: "Malformed form data." };
  }

  const rows = items
    .filter((item) => item.title?.trim() && item.body?.trim())
    .map((item, index) => ({
      title: item.title.trim(),
      body: item.body.trim(),
      sort_order: index,
    }));

  const supabase = createAdminClient();
  const { error: deleteError } = await supabase
    .from("philosophy_items")
    .delete()
    .not("id", "is", null);
  if (deleteError) return { status: "error", error: deleteError.message };

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("philosophy_items").insert(rows);
    if (insertError) return { status: "error", error: insertError.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/philosophy");
  return { status: "saved" };
}

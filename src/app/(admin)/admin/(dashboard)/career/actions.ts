"use server";

import { revalidatePath } from "next/cache";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

interface EntryInput {
  company: string;
  initials: string;
  role: string;
  dateRange: string;
  location: string;
  current: boolean;
  summary: string;
  skills: string;
  responsibilities: string;
  achievements: string;
}

function toArray(value: string): string[] {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function saveCareerEntries(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdminForAction();

  let entries: EntryInput[];
  try {
    entries = JSON.parse(String(formData.get("entries") ?? "[]"));
  } catch {
    return { status: "error", error: "Malformed form data." };
  }

  const rows = entries
    .filter((e) => e.company?.trim() && e.role?.trim())
    .map((e, index) => ({
      company: e.company.trim(),
      initials: e.initials.trim(),
      role: e.role.trim(),
      date_range: e.dateRange.trim(),
      location: e.location.trim(),
      is_current: Boolean(e.current),
      summary: e.summary.trim(),
      skills: toArray(e.skills),
      responsibilities: toArray(e.responsibilities),
      achievements: toArray(e.achievements),
      sort_order: index,
    }));

  const supabase = createAdminClient();
  const { error: deleteError } = await supabase
    .from("career_entries")
    .delete()
    .not("id", "is", null);
  if (deleteError) return { status: "error", error: deleteError.message };

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("career_entries").insert(rows);
    if (insertError) return { status: "error", error: insertError.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/career");
  return { status: "saved" };
}

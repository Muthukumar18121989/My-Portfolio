"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { SkillGroup } from "@/lib/content/types";
import { saveSkillGroups, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

interface GroupState {
  label: string;
  items: string;
}

function SkillsForm({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const [groups, setGroups] = React.useState<GroupState[]>(
    skillGroups.map((g) => ({ label: g.label, items: g.items.join("\n") }))
  );
  const [state, formAction, isPending] = useActionState(saveSkillGroups, initialState);

  function update(index: number, key: keyof GroupState, value: string) {
    setGroups((prev) => prev.map((g, i) => (i === index ? { ...g, [key]: value } : g)));
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="groups" value={JSON.stringify(groups)} />
      <div className="flex flex-col gap-4">
        {groups.map((group, index) => (
          <div key={index} className="flex flex-col gap-3 border border-border bg-bg-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-meta text-fg-muted">
                Group {String(index + 1).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setGroups((prev) => prev.filter((_, i) => i !== index))}
                aria-label="Remove group"
                className="rounded-sm p-1 text-fg-muted hover:text-danger"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <FormField
              id={`label-${index}`}
              label="Group label"
              value={group.label}
              onChange={(e) => update(index, "label", e.target.value)}
            />
            <FormField
              id={`items-${index}`}
              label="Items"
              multiline
              helperText="One per line."
              value={group.items}
              onChange={(e) => update(index, "items", e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setGroups((prev) => [...prev, { label: "", items: "" }])}
        className="self-start"
      >
        <Plus className="size-4" aria-hidden="true" /> Add group
      </Button>

      {state.status === "error" && (
        <p className="text-xs text-danger" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" className="self-start" loading={isPending}>
        {isPending ? "Saving..." : state.status === "saved" ? "Saved" : "Save"}
      </Button>
    </form>
  );
}

export { SkillsForm };

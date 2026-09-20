"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

// Generic "edit the whole list, one Save button" pattern shared by every
// simple ordered-list section (philosophy, stats, fun facts,
// certifications). Items are plain string-keyed records; the whole array
// is serialized into one hidden JSON field on submit, and the bound
// Server Action replaces the table's rows wholesale — simplest correct
// approach for a single-admin CMS with no concurrent editors.

export interface ListEditorField {
  key: string;
  label: string;
  multiline?: boolean;
}

export interface SaveState {
  status: "idle" | "saved" | "error";
  error?: string;
}

export interface ListEditorProps {
  fields: ListEditorField[];
  initialItems: Record<string, string>[];
  emptyItem: Record<string, string>;
  action: (prevState: SaveState, formData: FormData) => Promise<SaveState>;
  itemLabel: string;
}

function ListEditor({ fields, initialItems, emptyItem, action, itemLabel }: ListEditorProps) {
  const [items, setItems] = React.useState(initialItems);
  const [state, formAction, isPending] = useActionState(action, { status: "idle" } as SaveState);

  function updateField(index: number, key: string, value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="items" value={JSON.stringify(items)} />

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 border border-border bg-bg-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-meta text-fg-muted">
                {itemLabel} {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  className="rounded-sm p-1 text-fg-muted hover:text-fg disabled:opacity-30"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Move down"
                  className="rounded-sm p-1 text-fg-muted hover:text-fg disabled:opacity-30"
                >
                  <ChevronDown className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  aria-label="Remove"
                  className="rounded-sm p-1 text-fg-muted hover:text-danger"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) => (
                <FormField
                  key={field.key}
                  id={`${field.key}-${index}`}
                  label={field.label}
                  multiline={field.multiline}
                  value={item[field.key] ?? ""}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                  className={field.multiline ? "md:col-span-2" : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="secondary" onClick={addItem} className="self-start">
        <Plus className="size-4" aria-hidden="true" /> Add {itemLabel.toLowerCase()}
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

export { ListEditor };

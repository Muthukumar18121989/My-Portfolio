"use client";

import * as React from "react";
import { useActionState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { CareerEntry } from "@/lib/content/types";
import { saveCareerEntries, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

interface EntryState {
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

const emptyEntry: EntryState = {
  company: "",
  initials: "",
  role: "",
  dateRange: "",
  location: "",
  current: false,
  summary: "",
  skills: "",
  responsibilities: "",
  achievements: "",
};

function toEntryState(entry: CareerEntry): EntryState {
  return {
    company: entry.company,
    initials: entry.initials,
    role: entry.role,
    dateRange: entry.dateRange,
    location: entry.location,
    current: entry.current,
    summary: entry.summary,
    skills: entry.skills.join("\n"),
    responsibilities: entry.responsibilities.join("\n"),
    achievements: entry.achievements.join("\n"),
  };
}

function CareerForm({ careerEntries }: { careerEntries: CareerEntry[] }) {
  const [entries, setEntries] = React.useState<EntryState[]>(careerEntries.map(toEntryState));
  const [state, formAction, isPending] = useActionState(saveCareerEntries, initialState);

  function update<K extends keyof EntryState>(index: number, key: K, value: EntryState[K]) {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  function move(index: number, direction: -1 | 1) {
    setEntries((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="entries" value={JSON.stringify(entries)} />
      <div className="flex flex-col gap-5">
        {entries.map((entry, index) => (
          <div key={index} className="flex flex-col gap-4 border border-border bg-bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="text-meta text-fg-muted">
                Role {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  className="rounded-sm p-1 text-fg-muted hover:text-fg disabled:opacity-30"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === entries.length - 1}
                  aria-label="Move down"
                  className="rounded-sm p-1 text-fg-muted hover:text-fg disabled:opacity-30"
                >
                  <ChevronDown className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEntries((prev) => prev.filter((_, i) => i !== index))}
                  aria-label="Remove"
                  className="rounded-sm p-1 text-fg-muted hover:text-danger"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <FormField
                id={`company-${index}`}
                label="Company"
                value={entry.company}
                onChange={(e) => update(index, "company", e.target.value)}
              />
              <FormField
                id={`initials-${index}`}
                label="Initials (badge)"
                value={entry.initials}
                onChange={(e) => update(index, "initials", e.target.value)}
              />
              <FormField
                id={`role-${index}`}
                label="Role title"
                value={entry.role}
                onChange={(e) => update(index, "role", e.target.value)}
              />
              <FormField
                id={`dateRange-${index}`}
                label="Date range"
                value={entry.dateRange}
                onChange={(e) => update(index, "dateRange", e.target.value)}
              />
              <FormField
                id={`location-${index}`}
                label="Location"
                value={entry.location}
                onChange={(e) => update(index, "location", e.target.value)}
              />
              <div className="flex items-center gap-2 pt-6">
                <input
                  id={`current-${index}`}
                  type="checkbox"
                  checked={entry.current}
                  onChange={(e) => update(index, "current", e.target.checked)}
                  className="size-4"
                />
                <label htmlFor={`current-${index}`} className="text-sm text-fg-muted">
                  Current role
                </label>
              </div>
            </div>
            <FormField
              id={`summary-${index}`}
              label="Summary"
              multiline
              value={entry.summary}
              onChange={(e) => update(index, "summary", e.target.value)}
            />
            <FormField
              id={`skills-${index}`}
              label="Skills"
              multiline
              helperText="One per line."
              value={entry.skills}
              onChange={(e) => update(index, "skills", e.target.value)}
            />
            <FormField
              id={`responsibilities-${index}`}
              label="Responsibilities"
              multiline
              helperText="One per line."
              value={entry.responsibilities}
              onChange={(e) => update(index, "responsibilities", e.target.value)}
            />
            <FormField
              id={`achievements-${index}`}
              label="Achievements"
              multiline
              helperText="One per line."
              value={entry.achievements}
              onChange={(e) => update(index, "achievements", e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setEntries((prev) => [...prev, { ...emptyEntry }])}
        className="self-start"
      >
        <Plus className="size-4" aria-hidden="true" /> Add role
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

export { CareerForm };

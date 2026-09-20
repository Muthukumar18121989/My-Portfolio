"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/content/types";
import { saveSettings, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

export interface SettingsFormProps {
  settings: SiteSettings;
}

function SettingsForm({ settings }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(saveSettings, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="resume" className="text-meta text-fg-muted">
          Resume (PDF)
        </label>
        {settings.resumeUrl && (
          <a
            href={settings.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-accent hover:underline"
          >
            View current resume
          </a>
        )}
        <input
          id="resume"
          name="resume"
          type="file"
          accept="application/pdf"
          className="text-sm text-fg-muted file:mr-3 file:rounded-sm file:border file:border-border file:bg-bg-surface file:px-3 file:py-1.5 file:text-sm file:text-fg"
        />
      </div>

      <FormField
        id="careerTags"
        name="careerTags"
        label="Career tags"
        multiline
        helperText="One per line — shown under the homepage's Career Journey stats."
        defaultValue={settings.careerTags.join("\n")}
      />

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

export { SettingsForm };

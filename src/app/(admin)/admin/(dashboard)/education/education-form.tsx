"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { Education } from "@/lib/content/types";
import { saveEducation, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

function EducationForm({ education }: { education: Education }) {
  const [state, formAction, isPending] = useActionState(saveEducation, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField
        id="degree"
        name="degree"
        label="Degree"
        required
        defaultValue={education.degree}
      />
      <FormField
        id="school"
        name="school"
        label="School"
        required
        defaultValue={education.school}
      />
      <FormField
        id="dateRange"
        name="dateRange"
        label="Date range"
        defaultValue={education.dateRange}
      />
      <FormField
        id="detail"
        name="detail"
        label="Detail (e.g. First Class)"
        defaultValue={education.detail}
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

export { EducationForm };

"use client";

import * as React from "react";
import { useActionState } from "react";
import Image from "next/image";
import { FormField, Textarea } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content/types";
import { saveProject, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

const SECTION_KEYS = [
  "overview",
  "problem",
  "myRole",
  "research",
  "personas",
  "journey",
  "wireframes",
  "process",
  "uiDesign",
  "decisions",
  "challenges",
  "takeaways",
] as const;

const EMPTY_SECTIONS = Object.fromEntries(
  SECTION_KEYS.map((key) => [key, { heading: "", body: "" }])
);

export interface ProjectFormProps {
  project?: Project;
}

function ProjectForm({ project }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(saveProject, initialState);
  const [heroPreview, setHeroPreview] = React.useState<string | null>(null);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField id="title" name="title" label="Title" required defaultValue={project?.title} />
        <FormField
          id="slug"
          name="slug"
          label="Slug"
          defaultValue={project?.slug}
          helperText="Leave blank to derive from the title. Letters, numbers, hyphens only."
        />
        <FormField
          id="company"
          name="company"
          label="Company"
          required
          defaultValue={project?.company}
        />
        <FormField id="role" name="role" label="Role" required defaultValue={project?.role} />
        <FormField id="type" name="type" label="Type" required defaultValue={project?.type} />
        <FormField id="year" name="year" label="Year" defaultValue={project?.year} />
      </div>

      <FormField
        id="summary"
        name="summary"
        label="Summary"
        required
        multiline
        defaultValue={project?.summary}
      />

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-meta text-fg-muted">Visibility</span>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-fg">
              <input
                type="radio"
                name="visibility"
                value="public"
                defaultChecked={!project || project.visibility === "public"}
              />
              Public
            </label>
            <label className="flex items-center gap-2 text-sm text-fg">
              <input
                type="radio"
                name="visibility"
                value="private"
                defaultChecked={project?.visibility === "private"}
              />
              Private
            </label>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-fg">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="size-4"
          />
          Featured on homepage
        </label>
      </div>

      <FormField
        id="impact"
        name="impact"
        label="Impact"
        multiline
        helperText="One line per bullet."
        defaultValue={project?.impact.join("\n")}
      />

      <div className="flex items-center gap-5">
        {(heroPreview || project?.heroImage?.src) && (
          <div className="relative aspect-video w-40 flex-none overflow-hidden border border-border bg-bg-surface">
            <Image
              src={heroPreview || project!.heroImage!.src}
              alt=""
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="heroImage" className="text-meta text-fg-muted">
              Hero image
            </label>
            <input
              id="heroImage"
              name="heroImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setHeroPreview(URL.createObjectURL(file));
              }}
              className="text-sm text-fg-muted file:mr-3 file:rounded-sm file:border file:border-border file:bg-bg-surface file:px-3 file:py-1.5 file:text-sm file:text-fg"
            />
          </div>
          <FormField
            id="heroImageAlt"
            name="heroImageAlt"
            label="Hero image alt text"
            defaultValue={project?.heroImage?.alt}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          id="externalUrl"
          name="externalUrl"
          label="External URL (optional)"
          defaultValue={project?.externalUrl}
        />
        <FormField
          id="externalUrlLabel"
          name="externalUrlLabel"
          label="External URL button label"
          defaultValue={project?.externalUrlLabel}
        />
        <FormField
          id="screenshotsHeading"
          name="screenshotsHeading"
          label="Screenshots section heading"
          defaultValue={project?.screenshotsHeading}
          helperText='Defaults to "Application Screens".'
          className="md:col-span-2"
        />
      </div>

      <details className="flex flex-col gap-4 border border-border bg-bg-surface p-4">
        <summary className="cursor-pointer text-meta text-fg-muted">
          Advanced: case-study content (JSON)
        </summary>
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sectionsJson" className="text-meta text-fg-muted">
              Sections
            </label>
            <Textarea
              id="sectionsJson"
              name="sectionsJson"
              className="min-h-60 font-mono text-xs"
              defaultValue={JSON.stringify(project?.sections ?? EMPTY_SECTIONS, null, 2)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="screenshotsJson" className="text-meta text-fg-muted">
              Screenshots
            </label>
            <Textarea
              id="screenshotsJson"
              name="screenshotsJson"
              className="min-h-30 font-mono text-xs"
              defaultValue={JSON.stringify(project?.screenshots ?? [], null, 2)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="enterpriseShowcaseJson" className="text-meta text-fg-muted">
              Enterprise showcase (leave as null if unused)
            </label>
            <Textarea
              id="enterpriseShowcaseJson"
              name="enterpriseShowcaseJson"
              className="min-h-30 font-mono text-xs"
              defaultValue={JSON.stringify(project?.enterpriseShowcase ?? null, null, 2)}
            />
          </div>
        </div>
      </details>

      {state.status === "error" && (
        <p className="text-xs text-danger" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" className="self-start" loading={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

export { ProjectForm };

"use client";

import * as React from "react";
import { useActionState } from "react";
import Image from "next/image";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/lib/content/types";
import { saveTestimonial, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

export interface TestimonialFormProps {
  testimonial?: Testimonial;
}

function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const [state, formAction, isPending] = useActionState(saveTestimonial, initialState);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <div className="flex items-center gap-5">
        {(avatarPreview || testimonial?.avatarUrl) && (
          <div className="relative size-14 flex-none overflow-hidden rounded-full border border-border bg-bg-surface">
            <Image
              src={avatarPreview || testimonial!.avatarUrl!}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="avatar" className="text-meta text-fg-muted">
            Avatar (optional)
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatarPreview(URL.createObjectURL(file));
            }}
            className="text-sm text-fg-muted file:mr-3 file:rounded-sm file:border file:border-border file:bg-bg-surface file:px-3 file:py-1.5 file:text-sm file:text-fg"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField id="name" name="name" label="Name" required defaultValue={testimonial?.name} />
        <FormField id="role" name="role" label="Role" defaultValue={testimonial?.role ?? ""} />
        <FormField
          id="company"
          name="company"
          label="Company"
          defaultValue={testimonial?.company ?? ""}
          className="md:col-span-2"
        />
      </div>
      <FormField
        id="quote"
        name="quote"
        label="Quote"
        required
        multiline
        defaultValue={testimonial?.quote}
      />

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={testimonial?.published ?? true}
          className="size-4"
        />
        <label htmlFor="published" className="text-sm text-fg-muted">
          Published (visible on the site)
        </label>
      </div>

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

export { TestimonialForm };

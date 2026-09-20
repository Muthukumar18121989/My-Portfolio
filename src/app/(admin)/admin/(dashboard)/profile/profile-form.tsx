"use client";

import * as React from "react";
import { useActionState } from "react";
import Image from "next/image";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/content/types";
import { saveProfile, type SaveState } from "./actions";

const initialState: SaveState = { status: "idle" };

export interface ProfileFormProps {
  profile: Profile;
}

function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(saveProfile, initialState);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex items-center gap-5">
        <div className="relative size-20 flex-none overflow-hidden rounded-full border border-border bg-bg-surface">
          <Image
            src={photoPreview || profile.photoUrl || "/images/profile-dark.webp"}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="photo" className="text-meta text-fg-muted">
            Profile photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-sm text-fg-muted file:mr-3 file:rounded-sm file:border file:border-border file:bg-bg-surface file:px-3 file:py-1.5 file:text-sm file:text-fg"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="name" name="name" label="Full name" required defaultValue={profile.name} />
        <FormField
          id="role"
          name="role"
          label="Role (short)"
          required
          defaultValue={profile.role}
        />
        <FormField
          id="roleLong"
          name="roleLong"
          label="Role (long)"
          defaultValue={profile.roleLong}
        />
        <FormField
          id="location"
          name="location"
          label="Location"
          required
          defaultValue={profile.location}
        />
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          defaultValue={profile.email}
        />
        <FormField
          id="yearsExperience"
          name="yearsExperience"
          label="Years of experience"
          type="number"
          defaultValue={profile.yearsExperience}
        />
        <FormField
          id="linkedinUrl"
          name="linkedinUrl"
          label="LinkedIn URL"
          defaultValue={profile.linkedinUrl ?? ""}
        />
      </div>

      <FormField
        id="heroSummary"
        name="heroSummary"
        label="Hero summary"
        required
        multiline
        defaultValue={profile.heroSummary}
      />
      <FormField
        id="aboutIntro"
        name="aboutIntro"
        label="About intro"
        required
        multiline
        defaultValue={profile.aboutIntro}
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

export { ProfileForm };

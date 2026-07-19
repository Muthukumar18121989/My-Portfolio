"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

// Gates its children behind a shared password. This is a UI speed bump for
// casual browsing, not real access control — the gated content is still
// served at a fixed URL, so it isn't protected from anyone who finds that
// URL directly.
export interface RecruiterGateProps {
  children: React.ReactNode;
  password?: string;
  message?: string;
  /** Controlled unlock state — pass this (with onUnlock) when the gate might
      remount (e.g. behind a conditionally-rendered tab) and should stay
      unlocked across those remounts instead of resetting every time. */
  unlocked?: boolean;
  onUnlock?: () => void;
}

function RecruiterGate({
  children,
  password = "allowrecruiter",
  message = "These screens are shared with recruiters on request. Enter the access password to view them.",
  unlocked: unlockedProp,
  onUnlock,
}: RecruiterGateProps) {
  const fieldId = React.useId();
  const [unlockedState, setUnlockedState] = React.useState(false);
  const unlocked = unlockedProp ?? unlockedState;
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === password) {
      setUnlockedState(true);
      onUnlock?.();
    } else {
      setError("Incorrect password.");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md border border-dashed border-border bg-bg-surface p-8"
    >
      <div className="flex items-start gap-2.5 text-fg-muted">
        <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p className="text-sm">{message}</p>
      </div>
      <div className="flex max-w-sm flex-col gap-3">
        <FormField
          id={fieldId}
          label="Password"
          type="password"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(undefined);
          }}
          error={error}
        />
        <Button type="submit" className="self-start">
          Unlock
        </Button>
      </div>
    </form>
  );
}

export { RecruiterGate };

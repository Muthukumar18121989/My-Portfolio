"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";

// Confirms before calling a bound server action that deletes one row.
// `action` is a server action pre-bound to the row's id via .bind(null, id)
// at the call site (see testimonials/projects list pages).
export interface DeleteButtonProps {
  action: () => Promise<void>;
  label?: string;
}

function DeleteButton({ action, label = "Delete" }: DeleteButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm("Delete this permanently? This can't be undone.")) return;
        startTransition(() => {
          action();
        });
      }}
      className="text-meta text-fg-muted transition-colors hover:text-danger disabled:opacity-50"
    >
      <span className="inline-flex items-center gap-1.5">
        <Trash2 className="size-3.5" aria-hidden="true" />
        {isPending ? "Deleting..." : label}
      </span>
    </button>
  );
}

export { DeleteButton };

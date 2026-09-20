"use client";

import * as React from "react";
import { useActionState } from "react";
import { Mail } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { sendMagicLink, type SendMagicLinkState } from "./actions";

const initialState: SendMagicLinkState = { status: "idle" };

function LoginForm() {
  const [state, formAction, isPending] = useActionState(sendMagicLink, initialState);

  if (state.status === "sent") {
    return (
      <p className="text-sm leading-relaxed text-fg-muted" role="status">
        Check your inbox for a sign-in link. It expires shortly, so use it soon after it arrives.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField id="email" label="Email" type="email" required name="email" autoComplete="email" />
      {state.status === "error" && (
        <p className="text-xs text-danger" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" className="self-start" loading={isPending}>
        {isPending ? "Sending..." : "Send sign-in link"}
        {!isPending && <Mail className="size-4" aria-hidden="true" />}
      </Button>
    </form>
  );
}

export { LoginForm };

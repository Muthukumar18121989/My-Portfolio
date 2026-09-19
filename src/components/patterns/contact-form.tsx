"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Contact form backed by a real send path: POSTs to /api/contact, which
// sends via Resend (see src/app/api/contact/route.ts and .env.example for
// the RESEND_API_KEY setup). Previously this only opened a mailto: draft in
// the visitor's own email client — see git history for that version if the
// Resend send path ever needs to be rolled back.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [values, setValues] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<Partial<FormState>>({});
  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.subject.trim()) next.subject = "Subject is required.";
    if (!values.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setServerError(data?.error ?? "Couldn't send your message. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setValues(initialState);
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (status === "error" || status === "sent") {
      setStatus("idle");
      setServerError(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormField
        id="name"
        label="Full name"
        required
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        required
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <FormField
        id="subject"
        label="Subject"
        required
        value={values.subject}
        onChange={(e) => update("subject", e.target.value)}
        error={errors.subject}
      />
      <FormField
        id="message"
        label="Message"
        required
        multiline
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />
      <Button type="submit" size="lg" className="self-start" loading={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
        {status !== "sending" && <Send className="size-4" aria-hidden="true" />}
      </Button>
      <p
        className={cn("text-xs", status === "error" ? "text-danger" : "text-fg-muted")}
        role={status === "error" ? "alert" : "status"}
      >
        {status === "sent"
          ? "Message sent — thanks for reaching out, I'll reply by email soon."
          : status === "error"
            ? serverError
            : "Sends directly to my inbox."}
      </p>
    </form>
  );
}

export { ContactForm };

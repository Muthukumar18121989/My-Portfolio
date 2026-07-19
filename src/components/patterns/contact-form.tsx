"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/content";

// Frontend-only contact form. There's no backend to receive a POST, so a
// validated submit opens the visitor's own email client via a pre-filled
// mailto: link — a real, working send path rather than a form that silently
// does nothing (see PHASE-2-FRAMER-AUDIT.md: the previous site's contact
// form had no <input>/<textarea>/<button> in the DOM at all).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [values, setValues] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<Partial<FormState>>({});
  const [sent, setSent] = React.useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
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
      <Button type="submit" size="lg" className="self-start">
        Send Message <Send className="size-4" aria-hidden="true" />
      </Button>
      <p className="text-xs text-fg-muted" role="status">
        {sent
          ? "Opening your email client with this message pre-filled — send it from there."
          : "Submitting opens your email client with this message pre-filled."}
      </p>
    </form>
  );
}

export { ContactForm };

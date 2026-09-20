import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProfile } from "@/lib/data";

// Real send path for the contact form (src/components/patterns/contact-form.tsx):
// validates the payload server-side (never trust the client-side check alone),
// then sends via Resend. RESEND_API_KEY must be set in .env.local — see
// .env.example for the full setup note, including the sandbox "from" address
// restriction until a domain is verified.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.subject === "string" &&
    typeof v.message === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isContactPayload(body)) {
    return NextResponse.json({ error: "Malformed contact payload." }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — see .env.example.");
    return NextResponse.json(
      { error: "Email sending isn't configured yet. Please email me directly instead." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const profile = await getProfile();

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
    to: [profile.email],
    replyTo: email,
    subject: `[Portfolio contact] ${subject}`,
    text: `${message}\n\n— ${name} (${email})`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again or email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

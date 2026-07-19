import type { Metadata } from "next";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/patterns/contact-form";
import { profile, socialLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Muthukumar D.",
};

const contactLinks = [
  { label: profile.email, href: socialLinks.email, icon: Mail },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: ExternalLink },
].filter((link) => Boolean(link.href));

export default function ContactPage() {
  return (
    <div className="grid gap-16 px-6 py-16 md:grid-cols-2 md:px-16 md:py-24">
      <div className="flex flex-col gap-6">
        <h1 className="font-display text-4xl font-extrabold text-fg md:text-6xl">Contact</h1>
        <p className="max-w-md text-base leading-relaxed text-fg-muted md:text-lg">
          Open to senior/lead/principal product design roles and select consulting engagements.
          Reach out directly, or use the form.
        </p>
        <ul className="flex flex-col gap-3 pt-2">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href?.startsWith("http") ? "_blank" : undefined}
                rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <link.icon className="size-4" aria-hidden="true" />
                {link.label}
              </a>
            </li>
          ))}
          <li className="inline-flex items-center gap-2.5 text-sm text-fg-muted">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </li>
        </ul>
      </div>

      <ContactForm />
    </div>
  );
}

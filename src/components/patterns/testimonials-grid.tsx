import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/section-reveal";
import type { Testimonial } from "@/lib/content/types";

// Renders real testimonials from the admin (see supabase/schema.sql's
// `testimonials` table) — falls back to the original "being collected"
// placeholder when none are published yet, rather than showing an empty
// section.
export interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  if (testimonials.length === 0) {
    return (
      <Reveal variant="up">
        <p className="border border-dashed border-border p-8 text-sm text-fg-muted">
          Client and colleague testimonials are being collected and will appear here soon.
        </p>
      </Reveal>
    );
  }

  return (
    <StaggerGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
      {testimonials.map((testimonial) => (
        <StaggerItem key={testimonial.id} className="grid-line-t flex flex-col gap-5 pt-8">
          <p className="text-base leading-relaxed text-fg md:text-lg">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            {testimonial.avatarUrl && (
              <div className="relative size-10 flex-none overflow-hidden rounded-full border border-border">
                <Image
                  src={testimonial.avatarUrl}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-fg">{testimonial.name}</span>
              {(testimonial.role || testimonial.company) && (
                <span className="text-meta text-fg-muted">
                  {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
                </span>
              )}
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export { TestimonialsGrid };

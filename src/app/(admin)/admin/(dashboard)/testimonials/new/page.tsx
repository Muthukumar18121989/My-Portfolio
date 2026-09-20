import type { Metadata } from "next";
import { TestimonialForm } from "../testimonial-form";

export const metadata: Metadata = { title: "New Testimonial" };

export default function NewTestimonialPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-display-lg text-fg">New Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}

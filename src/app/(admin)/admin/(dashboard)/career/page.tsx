import type { Metadata } from "next";
import { getCareerEntries } from "@/lib/data";
import { CareerForm } from "./career-form";

export const metadata: Metadata = { title: "Career Timeline" };
export const dynamic = "force-dynamic";

export default async function AdminCareerPage() {
  const careerEntries = await getCareerEntries();

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Career Timeline</h1>
        <p className="text-sm text-fg-muted">
          One source feeds both the homepage&rsquo;s Career Journey and the About page&rsquo;s
          Professional Journey.
        </p>
      </div>
      <CareerForm careerEntries={careerEntries} />
    </div>
  );
}

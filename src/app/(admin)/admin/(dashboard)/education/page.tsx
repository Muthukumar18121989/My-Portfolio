import type { Metadata } from "next";
import { getEducation } from "@/lib/data";
import { EducationForm } from "./education-form";

export const metadata: Metadata = { title: "Education" };
export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const education = await getEducation();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Education</h1>
      </div>
      <EducationForm education={education} />
    </div>
  );
}

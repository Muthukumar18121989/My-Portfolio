import type { Metadata } from "next";
import { getSkillGroups } from "@/lib/data";
import { SkillsForm } from "./skills-form";

export const metadata: Metadata = { title: "Skills" };
export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skillGroups = await getSkillGroups();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Skills & Tools</h1>
        <p className="text-sm text-fg-muted">
          Shown on the homepage&rsquo;s Capabilities section and the About page.
        </p>
      </div>
      <SkillsForm skillGroups={skillGroups} />
    </div>
  );
}

import type { Metadata } from "next";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "New Project" };

export default function NewProjectPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-display-lg text-fg">New Project</h1>
      <ProjectForm />
    </div>
  );
}

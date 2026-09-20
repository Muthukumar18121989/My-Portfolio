import type { Metadata } from "next";
import { getPhilosophy } from "@/lib/data";
import { ListEditor } from "@/components/admin/list-editor";
import { savePhilosophy } from "./actions";

export const metadata: Metadata = { title: "Design Philosophy" };
export const dynamic = "force-dynamic";

export default async function AdminPhilosophyPage() {
  const philosophy = await getPhilosophy();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Design Philosophy</h1>
        <p className="text-sm text-fg-muted">
          The 3 statements shown on the homepage and About page.
        </p>
      </div>
      <ListEditor
        itemLabel="Statement"
        fields={[
          { key: "title", label: "Title" },
          { key: "body", label: "Body", multiline: true },
        ]}
        initialItems={philosophy.map((p) => ({ title: p.title, body: p.body }))}
        emptyItem={{ title: "", body: "" }}
        action={savePhilosophy}
      />
    </div>
  );
}

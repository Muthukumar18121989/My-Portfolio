import type { Metadata } from "next";
import { getFunFacts } from "@/lib/data";
import { ListEditor } from "@/components/admin/list-editor";
import { saveFunFacts } from "./actions";

export const metadata: Metadata = { title: "Fun Facts" };
export const dynamic = "force-dynamic";

export default async function AdminFunFactsPage() {
  const funFacts = await getFunFacts();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Fun Facts</h1>
        <p className="text-sm text-fg-muted">
          Shown on the About page&rsquo;s &ldquo;Off the clock&rdquo; section.
        </p>
      </div>
      <ListEditor
        itemLabel="Fact"
        fields={[{ key: "content", label: "Text", multiline: true }]}
        initialItems={funFacts.map((f) => ({ content: f.content }))}
        emptyItem={{ content: "" }}
        action={saveFunFacts}
      />
    </div>
  );
}

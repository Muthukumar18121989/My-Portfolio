import type { Metadata } from "next";
import { getStats } from "@/lib/data";
import { ListEditor } from "@/components/admin/list-editor";
import { saveStats } from "./actions";

export const metadata: Metadata = { title: "Stats" };
export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  const stats = await getStats();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Stats</h1>
        <p className="text-sm text-fg-muted">The headline numbers shown on the About page.</p>
      </div>
      <ListEditor
        itemLabel="Stat"
        fields={[
          { key: "value", label: "Value (e.g. 10+)" },
          { key: "label", label: "Label" },
        ]}
        initialItems={stats.map((s) => ({ value: s.value, label: s.label }))}
        emptyItem={{ value: "", label: "" }}
        action={saveStats}
      />
    </div>
  );
}

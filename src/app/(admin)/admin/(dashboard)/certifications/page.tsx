import type { Metadata } from "next";
import { getCertifications } from "@/lib/data";
import { ListEditor } from "@/components/admin/list-editor";
import { saveCertifications } from "./actions";

export const metadata: Metadata = { title: "Certifications" };
export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Certifications</h1>
        <p className="text-sm text-fg-muted">
          Shown on the About page&rsquo;s Credentials section.
        </p>
      </div>
      <ListEditor
        itemLabel="Certification"
        fields={[{ key: "content", label: "Name" }]}
        initialItems={certifications.map((c) => ({ content: c.content }))}
        emptyItem={{ content: "" }}
        action={saveCertifications}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Settings</h1>
        <p className="text-sm text-fg-muted">Resume file and site-wide small content.</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}

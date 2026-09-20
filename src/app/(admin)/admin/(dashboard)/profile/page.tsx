import type { Metadata } from "next";
import { getProfile } from "@/lib/data";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Profile" };
export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Profile</h1>
        <p className="text-sm text-fg-muted">
          Name, role, bio, and photo — used across the homepage, About, and Contact.
        </p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}

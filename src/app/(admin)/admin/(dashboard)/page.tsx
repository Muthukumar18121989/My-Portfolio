import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-display-lg text-fg">Dashboard</h1>
      <p className="text-sm text-fg-muted">
        Signed in and connected. Section editors (profile, About content, career timeline, skills,
        projects, testimonials, photo/resume uploads) are built next, once the auth and database
        foundation here is confirmed working end to end.
      </p>
    </div>
  );
}

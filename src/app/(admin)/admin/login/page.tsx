import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-20">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-meta text-accent">Admin</span>
          <h1 className="text-display-lg text-fg">Sign in</h1>
          <p className="text-sm text-fg-muted">
            A sign-in link will be emailed to the admin address.
          </p>
        </div>
        {error === "invalid-link" && (
          <p className="text-xs text-danger" role="alert">
            That link is invalid or expired — request a new one below.
          </p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}

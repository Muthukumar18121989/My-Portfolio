import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import "../globals.css";

// Separate root layout (own <html>/<body>) so the admin surface doesn't
// inherit the public site's NavBar/Footer — Next.js App Router supports
// multiple root layouts via top-level route groups, one per top-level
// group. See src/app/(site)/layout.tsx for the public equivalent.
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("design-os-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-bg text-fg font-body" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}

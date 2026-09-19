import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { NavBar } from "@/components/patterns/nav-bar";
import { Footer } from "@/components/patterns/footer";
import "./globals.css";

// Type-role fonts: Geist for display/headlines, Inter for body text,
// JetBrains Mono for metadata/labels/figure captions.
const fontDisplay = Geist({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muthukumar D — UX UI Designer / Product Designer",
    template: "%s — Muthukumar D",
  },
  description:
    "Senior UX Designer with 10+ years designing enterprise AI platforms, financial infrastructure, and consulting tools. Portfolio of case studies, process, and impact.",
  openGraph: {
    title: "Muthukumar D — UX UI Designer / Product Designer",
    description:
      "Senior UX Designer with 10+ years designing enterprise AI platforms, financial infrastructure, and consulting tools.",
    url: siteUrl,
    siteName: "Muthukumar D",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muthukumar D — UX UI Designer / Product Designer",
    description:
      "Senior UX Designer with 10+ years designing enterprise AI platforms, financial infrastructure, and consulting tools.",
  },
};

// Runs before paint via a blocking inline script so the correct theme applies
// immediately — without this, the page would flash the wrong theme on load
// while the client component in ThemeToggle hydrates. Always defaults to
// "dark" when nothing is stored yet — the site no longer follows the
// visitor's OS color-scheme preference for the first paint, only an
// explicit choice made via ThemeToggle.
const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("design-os-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg font-body" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <NavBar />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}

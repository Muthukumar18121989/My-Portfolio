import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESUME_PATH = "/Muthukumar-D-Resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or preview Muthukumar D's resume.",
};

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-16 md:px-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-extrabold text-fg md:text-6xl">Resume</h1>
          <p className="max-w-xl text-base leading-relaxed text-fg-muted">
            10+ years of UX design experience across enterprise AI, financial infrastructure, and
            global consulting. Preview below, or download the PDF.
          </p>
        </div>
        <Button asChild size="lg">
          <a href={RESUME_PATH} download="Muthukumar-D-Resume.pdf">
            Download PDF <Download className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-bg-surface">
        <object
          data={RESUME_PATH}
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label="Muthukumar D's resume preview"
        >
          <p className="flex h-40 items-center justify-center p-6 text-center text-sm text-fg-muted">
            Your browser can&apos;t preview PDFs inline.{" "}
            <a href={RESUME_PATH} className="text-accent hover:underline">
              Download the resume
            </a>{" "}
            instead.
          </p>
        </object>
      </div>
    </div>
  );
}

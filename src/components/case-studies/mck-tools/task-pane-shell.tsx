import * as React from "react";
import { X } from "lucide-react";

// The plugin's task pane chrome — PowerPoint's real add-in side panel is a
// fixed-width column with a colored header and a close control. The header
// is hardcoded Office-style chrome (so it reads as a genuine Office add-in);
// the body uses the portfolio's own real design tokens for its content,
// since the redesigned plugin experience is meant to embody that same
// design quality.
export interface TaskPaneShellProps {
  title: string;
  children: React.ReactNode;
}

function TaskPaneShell({ title, children }: TaskPaneShellProps) {
  return (
    <div
      className="mx-auto w-full max-w-[360px] overflow-hidden rounded-sm border border-[#c8c6c4] shadow-lg"
      style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 text-white"
        style={{ background: "#2b579a" }}
      >
        <span className="text-xs font-semibold">{title}</span>
        <X className="size-3.5" aria-hidden="true" />
      </div>
      <div className="max-h-[520px] overflow-y-auto bg-bg p-3">{children}</div>
    </div>
  );
}

export { TaskPaneShell };

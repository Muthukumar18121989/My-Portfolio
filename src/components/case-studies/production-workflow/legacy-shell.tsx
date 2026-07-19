import * as React from "react";

// Recreation of the ~2008-era IBM-style enterprise desktop app the legacy
// production platform was built on. Deliberately hardcoded, unthemed colors
// (not the site's design tokens) — this needs to look dated regardless of
// the portfolio's own light/dark mode, the same way EnterpriseProjectCard's
// dark cards stay fixed regardless of theme.
const TREE_ITEMS = [
  { label: "Inbox", count: 24 },
  { label: "In Progress", count: 12 },
  { label: "Pending Review", count: 6 },
  { label: "Completed", count: 148 },
  { label: "Archived", count: 892 },
];

export interface LegacyShellProps {
  screenTitle: string;
  activeTreeItem?: string;
  statusText?: string;
  children: React.ReactNode;
}

function LegacyShell({
  screenTitle,
  activeTreeItem = "Inbox",
  statusText,
  children,
}: LegacyShellProps) {
  return (
    <div
      className="overflow-hidden rounded-sm border border-[#7a7a7a] shadow-lg"
      style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 py-1 text-white"
        style={{ background: "linear-gradient(to bottom, #1c5aa6, #0a2f6e)" }}
      >
        <span className="font-bold" style={{ fontSize: "11px" }}>
          GPS — Global Production System v3.2 — {screenTitle}
        </span>
        <div className="flex gap-1">
          {["_", "□", "✕"].map((sym, i) => (
            <span
              key={i}
              className="flex h-4 w-4 items-center justify-center border border-[#2a2a2a] bg-[#d4d0c8] text-[9px] text-black"
            >
              {sym}
            </span>
          ))}
        </div>
      </div>

      {/* Menu bar */}
      <div className="flex gap-3 border-b border-[#7a7a7a] bg-[#ece9d8] px-2 py-1 text-black">
        {["File", "Edit", "View", "Requests", "Tools", "Window", "Help"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-1 border-b border-[#7a7a7a] bg-[#ece9d8] px-2 py-1.5">
        {["New", "Open", "Refresh", "Assign", "Print", "Export"].map((t) => (
          <span
            key={t}
            className="border border-[#a0a0a0] bg-[#f5f4ee] px-2 py-0.5 text-black"
            style={{ boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #8a8a8a" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Body: tree nav + content */}
      <div className="flex bg-[#d4d0c8]">
        <div className="w-36 shrink-0 border-r border-[#a0a0a0] bg-[#ece9d8] p-2">
          {TREE_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`mb-0.5 px-1.5 py-1 text-black ${
                item.label === activeTreeItem ? "bg-[#0a2f6e] text-white" : ""
              }`}
            >
              📁 {item.label} ({item.count})
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 bg-white p-2 text-black">{children}</div>
      </div>

      {/* Status bar */}
      <div className="border-t border-[#a0a0a0] bg-[#ece9d8] px-2 py-1 text-black">
        {statusText ?? "Connected to PPRODDB01 | User: msrinivasan | Ready"}
      </div>
    </div>
  );
}

export { LegacyShell };

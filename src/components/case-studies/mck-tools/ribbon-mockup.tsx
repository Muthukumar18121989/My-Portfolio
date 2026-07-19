import { UserSearch, Shapes, ChevronDown } from "lucide-react";

// Recreation of the Microsoft PowerPoint ribbon with the McK Tools add-in
// tab active. Hardcoded Office-style colors (not the site's design tokens)
// — this needs to read as genuine Office chrome regardless of the
// portfolio's own theme, the same reasoning as the legacy IBM shell in the
// Production Workflow Revamp case study.
const RIBBON_TABS = [
  "File",
  "Home",
  "Insert",
  "Design",
  "Transitions",
  "Animations",
  "Slide Show",
  "Review",
  "View",
  "McK Tools",
];

function RibbonMockup() {
  return (
    <div
      className="overflow-hidden rounded-sm border border-[#c8c6c4] shadow-lg"
      style={{ fontFamily: "Segoe UI, Arial, sans-serif", fontSize: "12px" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 text-white"
        style={{ background: "#2b579a" }}
      >
        <span className="text-[11px]">Q3_Client_Steering_Committee_Deck.pptx — PowerPoint</span>
        <div className="flex gap-1 text-[10px]">
          <span>_</span>
          <span>□</span>
          <span>✕</span>
        </div>
      </div>

      {/* Tab strip */}
      <div className="flex gap-4 border-b border-[#c8c6c4] bg-white px-3 pt-1.5 text-[#444]">
        {RIBBON_TABS.map((tab) => (
          <span
            key={tab}
            className={
              tab === "McK Tools"
                ? "border-b-2 border-[#2b579a] pb-1.5 font-semibold text-[#2b579a]"
                : "pb-1.5"
            }
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Ribbon body — McK Tools group */}
      <div className="flex items-stretch gap-6 bg-[#f3f2f1] px-4 py-2.5">
        <div className="flex flex-col items-center gap-1">
          <div className="flex size-9 items-center justify-center rounded-sm bg-white shadow-sm">
            <UserSearch className="size-5 text-[#2b579a]" aria-hidden="true" />
          </div>
          <span className="text-[10px] text-[#444]">Profile Extractor</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex size-9 items-center justify-center rounded-sm bg-white shadow-sm">
            <Shapes className="size-5 text-[#2b579a]" aria-hidden="true" />
          </div>
          <span className="text-[10px] text-[#444]">McK Icons</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="flex size-9 items-center justify-center rounded-sm bg-white shadow-sm">
            <span className="text-[10px] text-[#444]">+</span>
          </div>
          <span className="text-[10px] text-[#444]">More Tools</span>
        </div>
        <div className="ml-auto flex items-center gap-1 self-center text-[10px] text-[#666]">
          McK Tools v2.4 <ChevronDown className="size-3" aria-hidden="true" />
        </div>
      </div>
      <div className="border-t border-[#c8c6c4] bg-[#f3f2f1] py-1 text-center text-[9px] text-[#888]">
        McK Tools Group
      </div>
    </div>
  );
}

export { RibbonMockup };

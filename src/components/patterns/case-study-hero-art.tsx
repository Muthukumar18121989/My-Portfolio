// Original, hand-built cover art for case studies that don't have a
// shareable hero photo (the underlying platforms are enterprise/NDA
// products). Pure SVG, themed entirely off the site's own design tokens so
// it adapts automatically between dark and light mode.

function TwinxHeroArt() {
  return (
    <svg
      viewBox="0 0 800 343"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of two linked digital-twin dashboards"
    >
      <rect width="800" height="343" fill="var(--color-bg-surface)" />
      <g opacity="0.5" stroke="var(--color-border)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={80 * (i + 1)} y1="0" x2={80 * (i + 1)} y2="343" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={68 * (i + 1)} x2="800" y2={68 * (i + 1)} />
        ))}
      </g>

      {/* Two offset "twin" panels */}
      <rect
        x="140"
        y="86"
        width="260"
        height="170"
        rx="10"
        fill="none"
        stroke="var(--color-fg-muted)"
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="400"
        y="110"
        width="260"
        height="170"
        rx="10"
        fill="var(--color-bg)"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
      />

      {/* Bars inside the "live" twin panel */}
      <rect
        x="428"
        y="150"
        width="24"
        height="90"
        rx="3"
        fill="var(--color-accent)"
        opacity="0.85"
      />
      <rect
        x="464"
        y="180"
        width="24"
        height="60"
        rx="3"
        fill="var(--color-accent)"
        opacity="0.55"
      />
      <rect
        x="500"
        y="130"
        width="24"
        height="110"
        rx="3"
        fill="var(--color-accent)"
        opacity="0.7"
      />
      <rect
        x="536"
        y="200"
        width="24"
        height="40"
        rx="3"
        fill="var(--color-accent)"
        opacity="0.4"
      />
      <line x1="416" y1="252" x2="608" y2="252" stroke="var(--color-fg-muted)" strokeWidth="1.5" />

      {/* Faint bars echoing inside the outline "source" panel */}
      <rect
        x="168"
        y="150"
        width="20"
        height="70"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.3"
      />
      <rect
        x="200"
        y="170"
        width="20"
        height="50"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.3"
      />
      <rect
        x="232"
        y="130"
        width="20"
        height="90"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.3"
      />

      {/* Simulation link between the two panels */}
      <path
        d="M400 171 C 370 171, 370 195, 400 195"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      <circle cx="400" cy="171" r="5" fill="var(--color-accent)" />
      <circle cx="400" cy="195" r="5" fill="var(--color-accent)" />

      {/* Entity nodes scattered around, evoking simulated actors */}
      {[
        [90, 60],
        [710, 60],
        [90, 290],
        [720, 300],
        [660, 70],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 2 === 0 ? 4 : 3}
          fill="var(--color-fg-muted)"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

function EuroclearHeroArt() {
  return (
    <svg
      viewBox="0 0 800 343"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a financial reporting dashboard"
    >
      <rect width="800" height="343" fill="var(--color-bg-surface)" />
      <g opacity="0.5" stroke="var(--color-border)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={80 * (i + 1)} y1="0" x2={80 * (i + 1)} y2="343" />
        ))}
      </g>

      {/* Ledger panel */}
      <rect
        x="110"
        y="70"
        width="330"
        height="205"
        rx="10"
        fill="none"
        stroke="var(--color-fg-muted)"
        strokeWidth="2"
        opacity="0.6"
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1="132"
          y1={104 + i * 34}
          x2="418"
          y2={104 + i * 34}
          stroke="var(--color-fg-muted)"
          strokeWidth="1.5"
          opacity="0.35"
        />
      ))}
      <rect
        x="132"
        y="90"
        width="130"
        height="10"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.5"
      />

      {/* Reporting / trend panel */}
      <rect
        x="460"
        y="70"
        width="230"
        height="205"
        rx="10"
        fill="var(--color-bg)"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
      />
      <polyline
        points="484,220 520,190 556,205 592,160 628,175 664,130"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [484, 220],
        [520, 190],
        [556, 205],
        [592, 160],
        [628, 175],
        [664, 130],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="var(--color-accent)" />
      ))}
      <line
        x1="484"
        y1="240"
        x2="664"
        y2="240"
        stroke="var(--color-fg-muted)"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* Compliance mark */}
      <path
        d="M735 96 L753 104 L753 122 C753 136 745 146 735 150 C725 146 717 136 717 122 L717 104 Z"
        fill="none"
        stroke="var(--color-good)"
        strokeWidth="2.5"
      />
      <path
        d="M727 122 L733 129 L745 114"
        fill="none"
        stroke="var(--color-good)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductionWorkflowHeroArt() {
  return (
    <svg
      viewBox="0 0 800 343"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a request moving through a workflow board"
    >
      <rect width="800" height="343" fill="var(--color-bg-surface)" />
      <g opacity="0.5" stroke="var(--color-border)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={80 * (i + 1)} y1="0" x2={80 * (i + 1)} y2="343" />
        ))}
      </g>

      {/* Three workflow columns */}
      {[
        { x: 90, active: false },
        { x: 340, active: true },
        { x: 590, active: false },
      ].map((col, i) => (
        <rect
          key={i}
          x={col.x}
          y="56"
          width="200"
          height="230"
          rx="10"
          fill={col.active ? "var(--color-bg)" : "none"}
          stroke={col.active ? "var(--color-accent)" : "var(--color-fg-muted)"}
          strokeWidth={col.active ? 2.5 : 2}
          opacity={col.active ? 1 : 0.5}
        />
      ))}

      {/* Column header bars */}
      <rect
        x="112"
        y="74"
        width="70"
        height="8"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.4"
      />
      <rect x="362" y="74" width="70" height="8" rx="3" fill="var(--color-accent)" opacity="0.8" />
      <rect
        x="612"
        y="74"
        width="70"
        height="8"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.4"
      />

      {/* Cards inside the active middle column */}
      {[104, 150, 196].map((y, i) => (
        <rect
          key={i}
          x="360"
          y={y}
          width="160"
          height="36"
          rx="6"
          fill="var(--color-bg-surface)"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          opacity={i === 0 ? 1 : 0.6}
        />
      ))}

      {/* Faint cards in the outer columns */}
      {[104, 150].map((y, i) => (
        <rect
          key={`l${i}`}
          x="110"
          y={y}
          width="160"
          height="30"
          rx="6"
          fill="var(--color-fg-muted)"
          opacity="0.15"
        />
      ))}
      <rect
        x="610"
        y="104"
        width="160"
        height="30"
        rx="6"
        fill="var(--color-fg-muted)"
        opacity="0.15"
      />

      {/* Flow arrows between columns */}
      <path
        d="M292 130 L336 130"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeDasharray="4 5"
        markerEnd="url(#arrow)"
      />
      <path
        d="M542 130 L586 130"
        stroke="var(--color-fg-muted)"
        strokeWidth="2"
        strokeDasharray="4 5"
        opacity="0.6"
      />

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--color-accent)" />
        </marker>
      </defs>
    </svg>
  );
}

function MckToolsHeroArt() {
  return (
    <svg
      viewBox="0 0 800 343"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a toolbar panel docked beside a slide"
    >
      <rect width="800" height="343" fill="var(--color-bg-surface)" />
      <g opacity="0.5" stroke="var(--color-border)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={80 * (i + 1)} y1="0" x2={80 * (i + 1)} y2="343" />
        ))}
      </g>

      {/* Slide canvas */}
      <rect
        x="90"
        y="66"
        width="420"
        height="220"
        rx="8"
        fill="none"
        stroke="var(--color-fg-muted)"
        strokeWidth="2"
        opacity="0.55"
      />
      <rect
        x="118"
        y="94"
        width="180"
        height="14"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.35"
      />
      <rect
        x="118"
        y="130"
        width="240"
        height="8"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.25"
      />
      <rect
        x="118"
        y="150"
        width="200"
        height="8"
        rx="3"
        fill="var(--color-fg-muted)"
        opacity="0.25"
      />
      <circle cx="150" cy="220" r="26" fill="var(--color-fg-muted)" opacity="0.2" />
      <rect
        x="200"
        y="200"
        width="90"
        height="40"
        rx="4"
        fill="var(--color-fg-muted)"
        opacity="0.2"
      />

      {/* Docked task pane */}
      <rect
        x="546"
        y="56"
        width="164"
        height="240"
        rx="8"
        fill="var(--color-bg)"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
      />
      <rect
        x="562"
        y="76"
        width="132"
        height="18"
        rx="4"
        fill="var(--color-accent)"
        opacity="0.85"
      />
      {[108, 140, 172].map((y, i) => (
        <rect
          key={i}
          x="562"
          y={y}
          width="132"
          height="24"
          rx="4"
          fill="var(--color-fg-muted)"
          opacity={i === 0 ? 0.4 : 0.2}
          stroke="var(--color-border)"
          strokeWidth="1"
        />
      ))}
      <rect
        x="562"
        y="256"
        width="70"
        height="16"
        rx="8"
        fill="var(--color-accent)"
        opacity="0.85"
      />

      {/* Connector arrow from pane to slide */}
      <path
        d="M546 176 L520 176"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeDasharray="4 5"
        markerEnd="url(#mck-arrow)"
      />

      <defs>
        <marker id="mck-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--color-accent)" />
        </marker>
      </defs>
    </svg>
  );
}

export { TwinxHeroArt, EuroclearHeroArt, ProductionWorkflowHeroArt, MckToolsHeroArt };

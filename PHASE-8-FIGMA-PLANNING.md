# Phase 8 — Figma File Structure Plan

No code, no Figma writes yet — this is the file structure Phase 9 will populate via Figma MCP. Built directly on the Phase 5 sitemap/templates and the Phase 6 design system spec, so nothing here is invented fresh.

## Page order and purpose

1. **Cover** — project title/branding, version + date stamp, and a table of contents linking to every page below. First thing anyone opens.
2. **Tokens** — visual, human-readable reference boards for the Phase 6 spec: color swatches (light + dark, each semantic token labeled), type scale specimens, spacing scale ruler, radius/shadow samples, motion easing curves. This is documentation to *look at*, not the functional layer.
3. **Variables** — the actual Figma Variables collections that components consume: a Color collection with light/dark modes (one variable per Phase 6 semantic token — `color/bg`, `color/accent`, `color/locked`, etc.), a Number collection for spacing/radius, and a Typography collection for the type scale. This is the functional counterpart to the Tokens page.
4. **Wireframes** — low-fidelity, grayscale structure for every Phase 5 template (Home, Work index, Project detail, About, Resume, Writing index/detail, Contact, Recruiter Mode, Private Portfolio), at three breakpoints (390 / 768 / 1440, matching Phase 6's breakpoint scale). Purpose: settle layout/hierarchy before visual design starts, and catch the kind of structural gap Phase 2 found on the current site (no mobile layout at all) before any pixel is styled.
5. **High Fidelity** — the same template × breakpoint matrix as Wireframes, now fully designed with real tokens, both light and dark mode. This is what Phase 9 actually produces.
6. **Components** — the Phase 6 component list (Button, Nav bar incl. mobile drawer, Project card incl. locked variant, Metadata badge, Testimonial block, Timeline item, Article card, Form field, Footer, Theme toggle) built as real Figma components with variant properties matching every state Phase 6 specified (default/hover/focus-visible/disabled/loading where applicable). Built to be Code Connect-ready for Phase 10.
7. **Prototype** — wired, clickable connections between High Fidelity frames, reusing the exact user flows from Phase 5 (recruiter fast-scan, hiring-manager deep-read, VP-Design 2-minute impression, private/NDA access-request) rather than inventing new click-paths.
8. **Documentation** — usage notes: accessibility annotations (focus order, contrast pass/fail per the Phase 6 WCAG 2.2 AA target), component usage rules, a pointer back to the Phase 4 case-study editorial framework so whoever's designing a new project page later doesn't have to hunt for it, and a changelog section — this file is meant to stay alive for years, per the Design OS premise, so it needs a running record of what changed and why.

## Naming & organization conventions

- Frames named `[template]/[breakpoint]/[theme]` — e.g. `Project Detail/1440/Dark` — so Wireframes and High Fidelity stay organized by template first (all Home variants grouped together) rather than by breakpoint or theme.
- Components named to match the Phase 6 spec's component names exactly (`Button`, `Project Card`, `Form Field`, etc.) so Code Connect mapping in Phase 10 is a direct name match, not a guessing exercise.
- Locked/gated states (project cards, private-access prompts) built as explicit variants, not separate one-off frames — keeps the Private Portfolio and Work-index locked-card pattern from Phase 5 visually consistent by construction.

## Next (Phase 9, pending your go-ahead)

UI design: build Wireframes then High Fidelity screens for every template above (Landing, About, Projects/Work, Research, Branding, Presentation Design, Articles, Resume, Contact, Recruiter Mode, Admin Dashboard) using 21st.dev for pattern reference, then push into Figma via Figma MCP once you approve — I'll need to reconnect the Figma MCP server before that push step; will check at the start of Phase 9.

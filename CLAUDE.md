# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A "Design OS" — Muthukumar's personal portfolio platform, built to last 10+ years, not a one-off site. Full project history and decisions live in the `PHASE-*.md` files in this repo, in order. Read `PROJECT-EXECUTION-PLAN.md` first for the overall roadmap, then `PHASE-9.6-ARCHITECTURE-REMEDIATION.md` and `ARCHITECTURE_FREEZE_v1.md` (once generated) for the current, authoritative architecture — later phase docs amend earlier ones; where they conflict, the latest amendment wins.

## Stack (locked in Phase 7, amended in Phase 9.6)

- **Next.js (App Router)** + **TypeScript strict**
- **Tailwind CSS v4** (CSS-first `@theme` tokens) + **shadcn/ui** (Radix primitives)
- **Motion** (the renamed Framer Motion — package is `motion`, import from `motion/react`, not `framer-motion`)
- **Supabase** for Postgres, Auth (magic link), and Storage — no Sanity, no Auth.js (see Phase 7 for why both were rejected)
- **`next-mdx-remote`** for CMS-authored long-form content (not `@next/mdx`, which is file-based and wrong for runtime CMS content)
- **Storybook 10** (`nextjs-vite` framework integration)

Always verify library specifics against Context7 before writing code — several of the above (Motion's rename, Supabase's `@supabase/ssr` pattern, Storybook's major version) were already caught as stale-memory traps during planning.

## Non-negotiable rules carried from the architecture phases

- **Every page has exactly one real `<h1>`.** The site being replaced had zero real headings anywhere — this is a hard accessibility/SEO rule, not a style preference.
- **5-tier breakpoint scale, tested at all of them**: 640 / 768 / 1024 / 1280 / 1536px. The original site had no responsive breakpoints at all, which is why it broke below ~1024px.
- **WCAG 2.2 AA target**: labeled form fields, 4.5:1/3:1 contrast, visible focus rings, `prefers-reduced-motion` respected, skip-to-content link.
- **No content visibility state beyond the 5 defined ones** (public/recruiter/private/draft/archived). NDA is an orthogonal acknowledgment flag, not a 6th state — see Phase 9.6.
- **Slugs are globally unique** across projects/research/presentations, with reserved words (`research`, `presentations`, `admin`, `private`, `recruiter`) rejected at creation.
- **Phase 10 opens with a component retrofit, not new work first**: Home, Recruiter Mode, and Admin Dashboard currently have hand-built duplicate nav/footer instead of using the real NavBar/Footer Figma components — fix that before building the remaining 8 planned components.

## Known technical debt (see ARCHITECTURE_FREEZE_v1.md for the full register)

Typeface pairing is decided (Geist display / Inter body / JetBrains Mono metadata, per the Phase 9.6 round-2 fix) — self-hosting the licensed font files is still deferred to Phase 14; `next/font/google` is the placeholder delivery mechanism until then, not the final one. Figma has no in-file documentation/annotations yet — all guidance lives in these markdown files only.

## Working conventions

- Don't add abstractions, backend systems, or auth layers beyond what's specified — see Phase 7 for the reasoning behind rejecting Sanity and Auth.js as redundant additions.
- Content-bearing tables always carry a `visibility` field; don't special-case content types that skip it.
- Match the existing phase-doc pattern when recording new architectural decisions: what's wrong, why it's a problem, options considered, recommendation with reasoning — not just the final answer.

## Figma synchronization workflow

The live design file (`https://www.figma.com/design/4T0HIlD4um8261swOubWeo/Untitled`) is the visual source of truth for the 9 approved templates and the `Design OS / Color` variable collection. Two distinct sync mechanisms, not one:

1. **Design review / inspection** — done through the Figma MCP tools directly (already used throughout Phases 9–9.6: `get_metadata`, `get_screenshot`, `use_figma` for read-only queries). No project code is involved; this is how Claude Code reads the file during design and review phases.
2. **Code Connect** (`figma.config.json`, scaffolded in Phase 10.0) — maps real, built React components to their Figma counterparts, so Figma's inspect panel shows the actual code snippet for a component instead of a generic one. **Still nothing is mapped, correctly, even after Phase 10.1 built all 8 remaining code components** — Code Connect maps to a specific Figma node, and mapping to a one-off frame inside a screen (rather than a real, reusable Figma component) would be fragile and misleading: that frame isn't a canonical definition, it's incidental to one screen and could move or be deleted without anyone treating it as a breaking change. Verified directly against the live file before writing this: only `NavBar` and `Footer` exist as real Figma components today (node IDs `6:30`/`6:31`) — the other 8 (Button, Form Field, Metadata Badge, Theme Toggle, Project Card, Testimonial Block, Timeline Item, Article Card) exist only as code now, per `ARCHITECTURE_FREEZE_v1.md`'s known debt register. Building their Figma-side counterparts (a proper Components page, per the original Phase 8 plan that was never executed) is separate, not-yet-scoped work — Code Connect mapping for them follows once that exists, not before. Once a component has a real Figma counterpart:
   - Add a `ComponentName.figma.tsx` file next to it in `src/components/`, matching the `include` glob in `figma.config.json`
   - Use `figma.connect(ComponentName, '<figma-node-url>', { props: {...}, example: (props) => <ComponentName {...props} /> })`
   - Publish with `npx figma connect publish` (requires `FIGMA_ACCESS_TOKEN`, see `.env.example`) — this is a manual, deliberate step per component, not a build-time or CI step, since it only makes sense once a component's variants/props are stable.

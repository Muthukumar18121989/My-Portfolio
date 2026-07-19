# Phase 6 — Design System (documentation only, no implementation)

Grounds the Phase 3 brand pillars and Phase 5 page templates into a usable spec. Token naming follows Tailwind CSS v4's CSS-first `@theme` convention (verified against current docs via Context7 rather than assumed from memory), so Phase 7's implementation can consume this directly without translation — but the framework choice itself is still Phase 7's decision, not locked here.

## Design principles (from Phase 3, made concrete)

1. Proof over illustration — real artifacts in every hero/moment, never stock imagery
2. One confident typographic move per surface, not several combined
3. Generous whitespace as a deliberate signal, not empty space to be filled
4. Motion is restrained and purposeful — reveals and hover state, never decorative looping

## Color system

Semantic tokens, not raw color names, so light/dark mode is a value swap, not a rebuild. Defined in OKLCH (Tailwind v4's current default color format, per its docs).

| Token | Role |
|---|---|
| `--color-bg` / `--color-bg-subtle` | page background / secondary surface (cards, footer) |
| `--color-fg` / `--color-fg-muted` | primary text / secondary text |
| `--color-border` | dividers, card outlines, input borders |
| `--color-accent` | the single brand accent — used for links, primary CTAs, active states, and nothing else (protects the "one confident move" principle) |
| `--color-accent-fg` | text/icon color on top of `--color-accent` fills |
| `--color-success` / `--color-warning` / `--color-danger` | form validation and status states only |
| `--color-locked` | gated-content indicator (lock icon, "Request access" badge) — visually distinct from danger/warning so it doesn't read as an error |

**Light and dark mode are both first-class**, not a dark mode bolted on later — every token above gets a light and dark value from day one. Dark is the default per the Phase 3 benchmark lean (Linear, Vercel-adjacent, Framer all default dark) — final call confirmed visually in Phase 9.

## Typography

**Two-typeface system**, matching the "one confident move" principle rather than a font for every occasion:
- **Display** — a distinctive geometric or grotesk sans for headlines only (H1/H2 and hero statements). Open-source candidates to choose between in Phase 9: Geist, General Sans, or Instrument Sans.
- **Text** — a highly legible neutral sans for body copy, UI, and nav. Candidate: Inter or Geist (if Geist is used for display, pair with Inter for text to keep the "single move" distinct).
- **Mono** — for metadata labels only (tool tags, dates, role labels) — a direct callback to the Stripe/Vercel monospace-label pattern from Phase 3. Candidate: Geist Mono or JetBrains Mono.

**Type scale** (1.25 ratio, 16px base):
`--text-xs: 0.75rem` · `--text-sm: 0.875rem` · `--text-base: 1rem` · `--text-lg: 1.125rem` · `--text-xl: 1.25rem` · `--text-2xl: 1.5rem` · `--text-3xl: 1.875rem` · `--text-4xl: 2.25rem` · `--text-5xl: 3rem` · `--text-6xl: 3.75rem`

**Heading hierarchy rule (fixes a Phase 2 critical finding):** every page has exactly one real `<h1>`. The current site uses zero real headings anywhere — styled `<p>` tags throughout — which breaks both SEO and screen-reader navigation. This is a hard rule for Phase 14, not a style preference.

## Grid & breakpoints

Standard 5-tier breakpoint scale — **the current site has none of these**, which is why it collapses below ~1024px (Phase 2 finding #2). Non-negotiable for Phase 14: every layout is tested at all five.

`sm: 640px` · `md: 768px` · `lg: 1024px` · `xl: 1280px` · `2xl: 1536px`

12-column grid, max content width 1280px (1440px for full-bleed hero moments), gutters scale with the spacing tokens below.

## Spacing scale

4px base unit: `--spacing-1: 0.25rem` through `--spacing-32: 8rem`, following Tailwind's standard geometric progression (1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32). One scale, used everywhere — no ad hoc pixel values.

## Design tokens — naming convention

Following Tailwind v4's `@theme` namespaces so these compile directly to utility classes later:
`--color-*` (palette above) · `--font-*` (display/text/mono families) · `--text-*` (type scale) · `--spacing-*` (spacing scale) · `--radius-*` (sm/md/lg/full corner radii) · `--shadow-*` (sm/md/lg elevation) · `--ease-*` (motion easing, see below) · `--breakpoint-*` (grid breakpoints above)

## Components & variants (spec for Phase 10 to build)

Each component ships with: light + dark values, responsive behavior at all 5 breakpoints, and full keyboard/focus support — not optional extras.

- **Button** — primary (accent fill) / secondary (outline) / ghost (text-only); sm/md/lg; default/hover/focus-visible/disabled/loading states
- **Nav bar** — desktop inline + mobile drawer (the current site has no mobile fallback at all — this is the direct fix); persistent Recruiter Mode button and search icon slot per Phase 5
- **Project card** — standard + locked variant (lock icon, "Request access"), uniform aspect ratio per the Phase 3 Airbnb-grid reference
- **Metadata badge** — role/type/tool tags, mono type
- **Testimonial block** — quote + attribution + optional linked project
- **Timeline item** — for Resume's career history, with a "linked case studies" slot
- **Article card** — for Writing index
- **Form field** — label, input/textarea, helper text, error state — built as real functional form components from the start (directly fixes Phase 2's finding that the current contact form has no actual inputs at all)
- **Footer** — nav links + Testimonials/Awards links + LinkedIn + email, deliberately no phone/address fields (Phase 2, Phase 5)
- **Theme toggle** — light/dark switch

## Motion principles

- Duration scale: `150ms` (micro, e.g. hover) / `250ms` (standard, e.g. reveal) / `400ms` (large, e.g. page transition)
- Easing tokens: `--ease-fluid: cubic-bezier(0.3, 0, 0, 1)` for entrances, `--ease-snappy: cubic-bezier(0.2, 0, 0, 1)` for interactive feedback
- Scroll-triggered reveals fire once per element, never re-trigger on scroll-back
- **`prefers-reduced-motion` is respected everywhere** — motion becomes instant or a simple fade, no exceptions

## Accessibility standards

Target: **WCAG 2.2 AA**, checked in Phase 15, not treated as a launch-day audit item. Concrete rules that directly close Phase 2 findings:
- `<html lang="en">` set (current site has it empty)
- Exactly one real `<h1>` per page, full semantic heading hierarchy (current site has zero)
- Every form input has a visible, associated `<label>` (current site's "form" has no real inputs at all)
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text/UI components, checked against both light and dark token sets
- Visible focus rings on every interactive element, including the mobile nav drawer
- All meaningful images carry real alt text; decorative images are marked `aria-hidden`
- Skip-to-content link on every page
- Full keyboard navigation, including the locked-card request-access flow

## Storybook strategy

Organized to mirror the Phase 5 template hierarchy, not a flat component list:
- **Foundations** (MDX docs pages, not interactive stories) — color, type, spacing, motion tokens documented with live swatches
- **Primitives** — Button, Input/Form field, Badge, Theme toggle — one story per variant × state combination
- **Patterns** — Project card (incl. locked variant), Nav bar (incl. mobile drawer), Testimonial block, Timeline item, Article card, Footer
- **Templates** — full-page compositions (Home, Work index, Project detail, About, Resume, Recruiter Mode) assembled from Patterns, for reviewing real layouts before Phase 14 build
- a11y addon enabled on every story; light/dark toggle in the toolbar; controls exposed for every variant prop

## Next (Phase 7, pending your go-ahead)

Technical architecture: evaluate Next.js, React, Tailwind CSS, TypeScript, shadcn/ui, Framer Motion, Auth.js, Sanity CMS, Supabase, MDX, and Storybook — validated against current docs via Context7 — then lock the stack, folder structure, CMS model, and auth flow.

---

## Amendment (Phase 9.6 — Architecture Remediation, full rationale in PHASE-9.6-ARCHITECTURE-REMEDIATION.md)

The Phase 9.5 council found the real Figma variable collection only ever shipped `good` and `info` — never the full success/warning/danger/info set this doc originally called for — plus several categories from a fuller token audit were missing entirely. Both are closed here, before Phase 10 binds any component to these values.

### New/formalized color tokens

| Token | Role | Note |
|---|---|---|
| `--color-danger` | Form validation errors, destructive actions | Reuses the existing rust hue (shared "stop" meaning with `--color-locked`) but as a **formally separate token** — `locked` means gated content, `danger` means an error state; they must never be bound interchangeably |
| `--color-warning` | Non-blocking caution states | New amber tone, distinct from both the teal accent and danger-rust |
| `--color-good` | Success / "Public" status | Formally specified — existed in the built Figma file as an undocumented extension; now documented |
| `--color-info` | Informational / "Recruiter" status | Same — formally specified |
| `--color-secondary` | Lower-emphasis actions | Muted variant of accent; previously conflated with ghost-button styling alone |
| `--color-focus` | Focus rings | Alias of `accent`, **implemented via `@theme inline`** — verified via Context7 against current Tailwind v4 docs: a plain `@theme { --color-focus: var(--color-accent); }` resolves the reference at definition time, before the dark/light override applies, so focus rings would silently ignore theme switching. `@theme inline` resolves it at point of use instead, which is the only correct way to alias a token that itself changes per mode. |
| `--color-overlay` | Modal/drawer backdrops | Needed now that the mobile nav drawer and admin modal both require one |

### New non-color tokens

- `--opacity-disabled: 0.5` — semantic disabled-state opacity, applied via a `disabled` state rule
- `--z-dropdown`, `--z-drawer`, `--z-modal`, `--z-toast` — a real stacking scale, needed now that overlays coexist and must layer predictably

**High-contrast mode:** evaluated and explicitly **not added** — WCAG 2.2 AA (this doc's actual stated target) doesn't require a separate high-contrast mode; adding one now would be scope creep beyond the accessibility target already set, not a gap against it. Logged as a future (P2) improvement only.

**Contrast verification gate:** added as a hard requirement **before Phase 10 begins**, not deferred to Phase 15 as originally scheduled — the locked teal/rust/amber/good/info values need a numeric 4.5:1 (text) / 3:1 (UI) check against both Dark and Light grounds now, while retuning a variable is cheap, before 9 screens and a component library are built against these exact values.

### Component/typography reality check

Per the Phase 9.5 Figma audit: only NavBar and Footer exist as real Figma components (no variants, no states), and 3 of 9 screens (Home, Recruiter Mode, Admin Dashboard) don't even use those two — they have hand-built duplicate nav/footer frames. Phase 10 must open with a **retrofit pass** (swap those 3 screens onto real instances) before building the remaining 8 components, not build net-new components while leaving known drift in place.

**Typeface pairing — decided, not deferred (council review round 2 correction):** the first remediation pass logged the Inter-only pairing as "revisit at Phase 14," which the Creative Director council flagged correctly — deferring the *decision itself* (not just webfont licensing/hosting) risks locking type hierarchy, spacing, and component proportions to Inter-only rhythm across 9 templates, then paying a re-touch cost everywhere if a distinct display face is chosen later. **Display candidate is now selected: Geist.** Distinct enough from Inter (body) to satisfy the "one confident typographic move" principle from Phase 3, geometric and confident at large hero sizes, and already one of the three original Phase 6 candidates — this isn't a new option, it's closing an open one. System-font fallback stays in place until Phase 14 self-hosts the licensed files; the pairing *decision* is frozen now, only the asset hosting is deferred.

**Drawer/modal motion — specified (was missing, flagged by the Motion Designer council):**
- **Drawer** (mobile nav): slides in via `translateX(-100% → 0)` with a backdrop fade, 250ms, `--ease-snappy`. Reverse on close.
- **Modal** (e.g., the admin New Project overlay): `scale(0.96 → 1)` + fade, 250ms, `--ease-fluid`.
- Both render as an instant show/hide with no transform under `prefers-reduced-motion`, per the existing motion-principles rule — no exception for overlays.

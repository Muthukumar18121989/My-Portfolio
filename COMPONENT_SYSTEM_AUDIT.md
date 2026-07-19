# Component System Audit

Gate check before Phase 10.2, per instruction — review only, no code changes. Every component file was re-read fresh for this audit (not from memory), cross-referenced against `PHASE-6-DESIGN-SYSTEM.md` (including its Phase 9.6 amendment) and the live Figma file.

## Method

10 code files (`src/components/ui/*.tsx`, `src/components/patterns/*.tsx`) reviewed against the 10 criteria requested, then cross-checked against Phase 6's component spec and the live Figma component count.

---

## 1. Missing Components

Phase 6 specifies **10** components. **8 exist in code; 2 do not exist in code at all: Nav bar and Footer.**

This is the headline finding. Nav bar and Footer exist only as Figma components (built in Phase 9, retrofitted onto Home in Phase 10.1) — nobody has built their React equivalents. Every single page in the Phase 5 sitemap uses one or both. Phase 10.2 cannot build a real page without them; skipping this would force exactly the hand-rolled-duplicate-markup anti-pattern that Phase 10.1 just spent a whole task eliminating from Home in Figma.

## 2. Duplicate Components

**None found.** `Input` and `Textarea` are co-located inside `form-field.tsx` rather than split into their own files — not a duplicate (they're two different primitives), but a structural inconsistency, listed under Refactor below.

## 3. Components needing refactor

1. **`Button`'s `asChild` + `disabled`/`loading` combination is broken.** When `asChild` renders the button as an `<a>` (its documented use case — wrapping `next/link`), `disabled` is passed as a prop and `disabled:opacity-disabled` / `disabled:pointer-events-none` are gated on Tailwind's `disabled:` variant. Neither works on an anchor: `<a disabled>` isn't a real HTML state, and the `:disabled` CSS pseudo-class doesn't apply to anchors at all. A "disabled" or "loading" link would render fully interactive and undimmed.
2. **All four link-rendering components use a raw `<a href>` instead of `next/link`**: `ProjectCard`, `ArticleCard`, `TestimonialBlock`'s project link, `TimelineItem`'s related-project links. This is systemic, not isolated — every internal link in the component library bypasses Next.js's client-side routing and prefetching, the exact optimization this stack was chosen for. External links (there are none yet) would be the only legitimate use of a plain anchor.
3. **`ProjectCard`'s locked variant is still a normal navigable link.** `PHASE-5-INFORMATION-ARCHITECTURE.md`'s locked-card pattern specifies cards should show "Request access" *instead of* a normal link when gated — as built, a locked card still has an `href` and navigates on click, it just displays different copy. The request-access flow (a form, a modal, whatever Phase 11 decides) has no hook here.
4. **`FormField`'s prop spreading uses an unsound double type assertion** (`as React.InputHTMLAttributes<...> & React.TextareaHTMLAttributes<...>`) to force two incompatible HTML attribute sets together. TypeScript can't catch a misuse like passing `rows` to the `Input` path — the "strict" TypeScript this project mandates is nominally satisfied but not actually protecting this component.
5. **Inconsistent `forwardRef` usage.** `Button`, `Input`, `Textarea` accept a `ref`; `FormField`, `MetadataBadge`, `ThemeToggle`, `ProjectCard`, `TestimonialBlock`, `TimelineItem`, `ArticleCard` do not. No documented rule decides which components should be ref-forwardable — right now it's whichever ones happened to need it first.
6. **`TimelineItem` keys its achievement list on the achievement text itself** (`key={achievement}`) — fragile if two achievements are ever worded identically, or the list is reordered.

## 4. Variant gaps

- **`MetadataBadge` has no semantic `kind` prop.** Role/type/tool badges are visually identical and distinguished only by position in a row — fine for sighted users with the surrounding card for context, but there's no `kind="role" | "type" | "tool"` prop to hang an `sr-only` prefix off for screen-reader users who don't get that positional context for free.
- **No component has been verified across its full variant × theme × breakpoint matrix.** Individually, variants exist (Button's 3×3, Form Field's 5 states, Project Card's 2). None have been checked in combination — e.g., Button `secondary` + `loading` + light mode, or Project Card `locked` at the `sm` breakpoint — Storybook stories cover each axis independently, not the cross-product.
- **Nav bar's mobile-drawer variant (Phase 6's flagship responsive requirement) doesn't exist anywhere in code**, for the obvious reason that Nav bar itself doesn't exist in code yet (see §1).

## 5. Accessibility gaps

- The Button `asChild`/`disabled` bug above is an accessibility bug, not just a visual one: a screen reader user tabbing to a "disabled" link-button would find it fully focusable and activatable.
- `MetadataBadge`'s role/type/tool ambiguity for screen readers, per §4.
- **`ThemeToggle` has no pre-hydration theme script.** It correctly avoids an SSR hydration mismatch by deferring to an effect, but that means the very first paint always follows `prefers-color-scheme` regardless of a previously stored preference — a user who chose "light" on a dark-OS machine sees a flash of dark before the effect corrects it. The standard fix (a synchronous inline script in `<head>`, before hydration) doesn't exist anywhere in this codebase.
- **The Phase 9.6-mandated contrast-verification gate still hasn't been run.** `ARCHITECTURE_FREEZE_v1.md` requires numeric 4.5:1/3:1 checks against the real token values *before Phase 10 begins* — it wasn't done in 10.0 or 10.1, and now 8 components are built and Storybook-approved against untested contrast values.
- `TimelineItem` and `ArticleCard` both render an `<h3>`, assuming they'll always sit under a page's `<h2>` section heading. Nothing enforces that — it's an untested assumption, since no real page exists yet to check it against.

## 6. Storybook gaps

- **Only `Button` has explicit `argTypes`.** The other 7 components rely on Storybook's TypeScript-based auto-inference for controls, which is adequate for primitive string/boolean props but doesn't produce clean controls for object props (`TestimonialBlock`'s `project`, `TimelineItem`'s `relatedProjects`) — Phase 6 asks for "controls exposed for every variant prop," which today means "for one component."
- **No Foundations-tier docs exist.** Phase 6's Storybook strategy calls for MDX pages with live color/type/spacing/motion swatches — none were built in 10.0 or 10.1.
- **No Templates-tier stories exist** (full-page compositions) — expected, since no pages exist yet, but worth naming as still-open scope, not forgotten.
- The a11y addon is configured (`test: "todo"`) but that mode only *surfaces* violations in the test UI — nobody has actually opened Storybook and reviewed the 25 story variants for a11y violations yet; "configured" and "checked" are different claims.

## 7. Figma gaps

Verified against the live file (confirmed twice this session, most recently just before writing this audit): **only `NavBar` and `Footer` exist as Figma components — the same 2 as before Phase 10.1, unchanged.** The 8 components built in code this phase (Button, Form Field, Metadata Badge, Theme Toggle, Project Card, Testimonial Block, Timeline Item, Article Card) have **zero** Figma presence as reusable components — they exist only as one-off shapes inside the 9 approved screens. Both `NavBar` and `Footer` have empty `componentPropertyDefinitions` — no variants modeled even for the 2 that do exist. Code Connect mappings: zero, correctly (see Phase 10.1's report — mapping to non-canonical frames would be worse than no mapping).

## 8. Recommended implementation order

1. **Nav bar (code)** — blocks every page; highest priority by a wide margin.
2. **Footer (code)** — same reason, second only because Nav bar matters more per-page.
3. **Fix the `asChild`/`disabled` Button bug** — cheap now, becomes a live accessibility bug the moment any page wraps a `next/link` in a disabled Button.
4. **Migrate all internal links to `next/link`** — mechanical, same fix pattern across 4 files.
5. **Add the pre-hydration theme script** — small, prevents a real (if minor) FOUC once ThemeToggle ships on a page.
6. **Run the Phase 9.6 contrast-verification gate** — numeric check against real token values, still outstanding since before Phase 10.0.
7. **Resolve `ProjectCard`'s locked-link semantics** — needs a decision (button vs. link-to-request-flow), not just a code fix, so sequence it after the mechanical fixes above.
8. Everything else in §3–6 (forwardRef consistency, FormField's type assertion, explicit argTypes, Foundations docs) — lower urgency, doesn't block Phase 10.2 the way §1–2 do.

---

## Foundational component completeness: 80% — below the 90% threshold

8 of the 10 Phase 6-specified components exist in code. **Recommendation: do not proceed directly to Phase 10.2 — one more component iteration is justified first**, scoped narrowly to items 1–2 above (Nav bar, Footer). Items 3–7 are real but don't block page-building the way missing Nav bar/Footer do; they could reasonably run in parallel with early Phase 10.2 work if you'd rather not gate everything on them. The Figma-side gap (§7) is pre-existing, already-logged debt, not new to this audit, and doesn't block Phase 10.2 the way the code-side gap does — Phase 10.2 builds pages in code, not Figma.

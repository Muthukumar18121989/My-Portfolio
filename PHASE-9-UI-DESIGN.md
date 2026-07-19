# Phase 9 — UI Design (mockup pass + Figma sync complete)

21st.dev and Figma MCP were unavailable when this phase started, so — per your direction — screens were first designed as high-fidelity HTML mockups grounded in Phases 3/5/6/7. Once the Figma connector was reauthorized and you shared the target file, all 9 screens were rebuilt natively in Figma using the Plugin API (`use_figma`), bound to real Figma Variables — not pasted-in images.

Live review artifact (all 9 templates, tabbed, with a working light/dark toggle): `phase-9-mockups.html` in this repo, published at the artifact URL shared in chat.

**Figma file:** https://www.figma.com/design/4T0HIlD4um8261swOubWeo/Untitled
- **Cover** page (renamed from the default "Page 1")
- **High Fidelity** page — all 9 screens, laid out left to right: Home, Work Index, Project Detail (TwinX), About, Writing, Resume, Contact, Recruiter Mode, Admin Dashboard
- **Design OS / Color** variable collection — 10 semantic tokens (bg, bg-surface, border, fg, fg-muted, accent, accent-fg, locked, good, info), each with Dark and Light mode values matching the Phase 6 spec
- **NavBar** and **Footer** components, reused as instances across every screen that needs them, rather than duplicated per screen
- Fonts: Inter (display/body) and JetBrains Mono (metadata/labels) — both confirmed available in the file before use, standing in for the Phase 6 type-role spec until Phase 14 locks final licensed webfonts

## Visual identity locked for this pass

- **Concept:** "instrument panel" — real product artifacts shown in bordered, figure-captioned viewport frames (Fig. 01, Fig. 02...), a quiet hairline ruler texture, uniform-grid project cards with mono metadata rows.
- **Color:** ink (blue-black) / paper (cool sage-white) grounds, a precision **teal** accent — deliberately outside the blue/purple cluster every Phase 3 benchmark competitor sits in. Semantic status colors (good/info, plus the existing locked/rust) are kept separate from the accent, used only for visibility-state pills in the Admin Dashboard.
- **Type:** three roles — display (headlines only), body (reading), mono (metadata/labels/captions). System font stacks stand in for now; licensed, self-hosted webfonts are a Phase 14 decision.

## Templates built (9 of 11 — Research/Branding/Presentation Design intentionally not separate templates)

Home, Work index, Project Detail (TwinX), About, Writing, Resume, Contact, Recruiter Mode, Admin Dashboard.

**Why only 9, not 11:** per Phase 5's IA, Research/Branding/Presentation Design aren't distinct page templates — they're filters within the Work index, sharing the same Project Detail template as regular case studies. Building separate templates for them would duplicate a pattern already covered by Work index + Project Detail, so that reuse is by design, not a gap.

## Bugs from Phase 2 addressed directly in these mockups

- Contact form now has real, labeled fields (including a demonstrated error state) — current site's form has no inputs at all.
- Resume timeline dates corrected to remove the TCS/McKinsey overlap Phase 2 flagged; résumé download is on-domain, not an external Drive link.
- Footer/contact drop the phone number and street address Phase 2 flagged as unnecessary exposure.
- Work index demonstrates the locked-card pattern (Euroclear marked "Recruiter only") and an honest empty state for filters with no content yet, rather than either hiding gated work or faking placeholder cards.
- Testimonials and Writing show clearly labeled placeholder/empty states instead of the fabricated-looking single testimonial Phase 2 found — no invented quotes or fake articles anywhere in these mockups.

## Post-sync fixes

Two gaps found after the initial sync, both fixed:

1. **Light mode wasn't visible.** All 9 screens were bound to variables with Dark/Light values, but no frame was ever explicitly set to resolve as Light — everything defaulted to Dark. Fixed by duplicating all 9 screens as `[Name] — Light` frames (laid out below the dark set on the High Fidelity page) with an explicit Light mode override. While fixing this, found and corrected a second issue: an explicit Dark-mode override had been accidentally baked onto the nav bar during an early verification step and had propagated into the reusable NavBar component and all 6 of its instances — cleared on all 7 affected nodes so light mode now renders correctly everywhere, nav included.
2. **Prototype wasn't clickable.** The Prototype page from the Phase 8 plan was never actually built — screens existed but had zero click interactions wired. Fixed by adding real Figma prototype reactions (`ON_CLICK` → `NAVIGATE`, smart-animate transition) covering: every nav link and the Recruiter Mode pill (wired once on the shared NavBar/Footer components, which cascades to all 6 screens using them), Home's hero CTAs, the TCS TwinX project card/row on Home, Work Index, and Recruiter Mode, Project Detail's back link and both footer CTAs, and About's résumé link. Only real destinations were wired — Euroclear Bank and Virtual Personal Stylist cards aren't clickable since no detail page exists for them yet, consistent with not fabricating content that isn't there.

**Scope note:** the click-through wiring covers the dark-mode set (the primary 9-screen deliverable). The Light-mode duplicates share nav/footer navigation automatically (component instances cascade reactions live), but page-specific buttons and cards within the Light frames aren't separately wired — they're static color-reference duplicates, not a second parallel prototype. Say the word if full click-through on the Light set matters too.

## Admin Dashboard: Projects and Settings panels

The initial Admin Dashboard build only had the Overview panel with real content — Projects and Settings existed only as inactive sidebar labels. Built out both as full, navigable panels (separate top-level Figma frames, wired the same way every other screen-to-screen link works):

- **Admin Dashboard — Projects**: full project table (all 6 projects, status pills) plus a "+ New project" button.
- **New Project modal**: wired to open as a real Figma overlay when "+ New project" is clicked. Fields: Title (text), Type (segmented selector — Case Study/Research/Presentation/Branding), Visibility (segmented selector using the same semantic pill colors as the Overview table — Public/Recruiter/Private/Draft/Archived), and two upload dropzones for **Project PDF** and **Project PPT**. Close (✕), Cancel, and Create all dismiss the overlay.
- **Admin Dashboard — Settings**: kept the existing General section (admin email, site title, default theme) and added a new **Home page** section — hero headline, hero subheading, the three Scope stats (Years / Designers mentored / Industries), three Featured Project slots, and toggles for the Writing teaser and Testimonial highlight sections. One Save button covers both sections.
- Sidebar navigation between Overview, Projects, and Settings is now fully bidirectional and clickable across all three frames.

One real bug hit and fixed during this: `OVERLAY` navigation rejects a `SMART_ANIMATE` transition (only `NAVIGATE` accepts it) — the script failed atomically on the first attempt, caught via the error message, fixed by using `transition: null` for the overlay action.

## Next

Phase 9 is complete: mockups approved, all 9 screens synced to Figma with real variables, reusable Nav/Footer components, both Dark and Light modes rendering correctly, primary navigation flows wired as an actual clickable prototype, and the Admin Dashboard's Projects/Settings panels built out with real content and a working New Project modal. Ready for Phase 10 — the full component library (variants, states, dark/light, accessibility, Storybook) building directly on the tokens and components established here.

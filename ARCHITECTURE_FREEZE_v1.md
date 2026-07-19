# Architecture Freeze v1

**Architecture Version:** 1.0
**Approval Date:** 2026-07-11
**Status:** FROZEN — this is the official baseline for Phase 10 (Development) onward. No architectural changes past this point without producing `ARCHITECTURE_FREEZE_v2.md`.

---

## Approved documents (in reading order)

1. `PROJECT-EXECUTION-PLAN.md` — overall roadmap
2. `PHASE-2-FRAMER-AUDIT.md` — baseline problems this project fixes
3. `PHASE-3-COMPETITOR-BENCHMARK.md` — design direction
4. `PHASE-4-PRODUCT-STRATEGY.md` — vision, personas, success metrics
5. `PHASE-5-INFORMATION-ARCHITECTURE.md` + its Phase 9.6 amendment — sitemap, nav, mobile collapse spec, slug policy
6. `PHASE-6-DESIGN-SYSTEM.md` + its Phase 9.6 amendment — tokens, components, motion, a11y, typeface decision
7. `PHASE-7-TECHNICAL-ARCHITECTURE.md` + its Phase 9.6 amendment (round 2 corrected) — stack, schema, auth, folders
8. `PHASE-8-FIGMA-PLANNING.md` — Figma file structure plan
9. `PHASE-9-UI-DESIGN.md` — what was actually built
10. `PHASE-9.5-ARCHITECTURE-REVIEW.md` — first council review
11. `PHASE-9.6-ARCHITECTURE-REMEDIATION.md` — remediation + second council review + round-2 fixes (this is the most authoritative single document for *why* the schema/tokens look the way they do)
12. `CLAUDE.md` — development entry point and working conventions

## Approved stack

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 (`@theme` / `@theme inline`) · shadcn/ui (Radix primitives) · Motion (`motion` package, not `framer-motion`) · Supabase (Postgres + Auth + Storage) · `next-mdx-remote` · Storybook 10. Sanity and Auth.js explicitly evaluated and rejected (Phase 7) — Supabase covers both needs without a redundant layer.

## Approved design system

17 semantic color tokens (10 original + `danger`, `warning`, `secondary`, `focus`, `overlay`, plus formalized `good`/`info`), all with Dark and Light values; `--color-focus` implemented via `@theme inline` (Context7-verified requirement). Non-color additions: `--opacity-disabled`, a 4-step `--z-*` stacking scale. Typeface pairing: **Geist (display) + Inter (body) + JetBrains Mono (metadata/labels)** — decided, not deferred; only webfont self-hosting waits for Phase 14. Drawer motion (translateX+fade, 250ms, `--ease-snappy`) and modal motion (scale+fade, 250ms, `--ease-fluid`) specified, both instant under `prefers-reduced-motion`. WCAG 2.2 AA target, with a numeric contrast-verification gate required before Phase 10 begins (not deferred to Phase 15). High-contrast mode deliberately excluded — out of scope for the stated AA target, not a gap.

## Approved CMS / database

Full schema in `PHASE-7-TECHNICAL-ARCHITECTURE.md`'s round-2-corrected amendment: `content_slugs` (global uniqueness registry), `projects`/`research_items`/`presentation_items`/`articles`, `content_media` (polymorphic, 12+ types, versioned, with accessibility fields), `skills`, `taxonomy_terms`/`content_taxonomy_terms` (polymorphic), `testimonials`, `awards`, `resume_entries`, `access_requests`/`access_grants` (token-based, expiring, revocable), `nda_acknowledgments`, `audit_log` (P2/deferred), `roles`. Required indexes named explicitly, including a unique index on `access_grants.token`.

## Approved authentication

Two-tier: admin/owner via Supabase magic-link + RLS on custom JWT claims; grant-gated private-content reads via a `SECURITY DEFINER` RPC function (`get_gated_content(token)`) rather than session-based RLS, since grantees never authenticate — this was a genuine gap found and fixed in council review round 2, not part of the original design. Access-request endpoint rate-limited, non-enumerable.

## Approved media model

`content_media`, polymorphic across projects/research/presentations, supporting hero/gallery images, PDF, PPT, Word, video, GIF, YouTube, Loom, Figma embeds, Google Drive, ZIP, and external links — embed-only viewing, versioned (`superseded_by`), ordered, captioned, with required alt text (DB-enforced), caption tracks for video, and fallback descriptions for non-image embeds. Performance budget: 8 inline items per project by default, lazy-loaded, current-version-only queries by default. PPT/Word rendering strategy is an explicit **open implementation decision for Phase 10**, not resolved here — schema accommodates whichever approach is chosen.

## Approved search model

Controlled taxonomy (`taxonomy_terms`/`content_taxonomy_terms`) covering 11 categories, with 4 mandatory at entry (industry, domain, deliverable, platform) and 7 optional, plus scalar fields for year/business_goal/impact/difficulty/confidentiality. Hybrid search readiness built in from day one: `tsvector` for keyword search (active at launch) and a dormant `vector(384)` embedding column for semantic search (populated later, no migration needed to activate) — both patterns Context7-verified against current Supabase/pgvector docs.

## Approved Figma structure

Confirmed via live read-only audit: 2 of 8 originally planned pages exist (Cover — currently empty, and High Fidelity — 9 screens across Dark and Light modes). One variable collection (`Design OS / Color`, 10 variables, Dark/Light modes). Only NavBar and Footer exist as real components; 8 more are required, and 3 screens (Home, Recruiter Mode, Admin Dashboard) need retrofitting onto the real components before any new component work — **this retrofit is Phase 10's mandatory first task**, not optional cleanup.

## Approved Storybook structure

Foundations → Primitives → Patterns → Templates, per Phase 6, contingent on the Figma component retrofit above — cannot be meaningfully populated until the Primitives/Patterns layer exists as real components, not one-off frames.

## Approved Admin Dashboard

Overview, Projects (with New Project modal: Title/Type/Visibility/media upload), Settings (general + Home page section: hero copy, `stats[]` array, featured-project slots, section toggles) are built in Figma. Articles/Testimonials/Awards/Résumé/Access-requests panels are reserved sidebar routes, not yet built — full build-out remains Phase 11 scope.

---

## Decision log

| Decision | Alternatives considered | Why |
|---|---|---|
| `content_media` as one polymorphic table with a `metadata JSONB` escape hatch, not per-type tables or a JSONB-only column | Per-type tables (over-normalized); JSONB array on `projects` (no referential integrity, unversionable) | Stays stable as media types grow; native ordering/versioning/captions |
| `access_grants` separate from `access_requests` | Fields bolted onto `access_requests`; real Supabase Auth accounts per requester | Cleanly separates intake from the permission ledger; supports revocation/audit without account overhead |
| NDA as an orthogonal `requires_nda_acknowledgment` flag, not a 6th visibility state | Full 6th `visibility` enum value | Keeps the state machine at 5 tiers; NDA is a property of the viewing flow, not the content's tier |
| Controlled taxonomy table over freeform tags or a single enum | Single `industry` column; freeform `tags[]` | Only option that scales to 18 requested facets while staying queryable and consistent |
| Grant-gated reads via `SECURITY DEFINER` RPC, not session-based RLS | JWT-claim RLS (doesn't work — no session exists for grantees) | The only mechanism that actually works for unauthenticated, token-holding visitors |
| Geist + Inter typeface pairing, decided now | Leaving the decision open until Phase 14 | Avoids locking 9 templates' hierarchy to Inter-only rhythm by default, then re-touching everything later |
| Sanity and Auth.js rejected | Sanity for CMS; Auth.js for auth | Both redundant with a custom admin UI on Supabase, which was already required for the "Design OS" branding |

## Risk register

| Risk | Severity | Mitigation / status |
|---|---|---|
| PPT/Word have no native browser embed | Medium | Explicit open decision for Phase 10 (conversion vs. embeddable viewer service); schema doesn't block either choice |
| Only 1 content owner exists (`roles` has 1 row) — single point of failure for admin access | Low | `roles` modeled as a table specifically so this is a future insert, not a migration |
| Taxonomy vocabulary consistency depends on one person's discipline over a decade | Low-Medium | Mandatory facets narrowed to 4; optional facets don't block publishing |
| Figma Cover page is empty; no in-file documentation | Low | Logged as P2 — doesn't block development, affects future-collaborator onboarding only |
| Vector search column is dormant, unpopulated at launch | Low | Deliberate — Phase 13 ships keyword/taxonomy search first; activating semantic search later is additive |

## Known technical debt (not blocking, explicitly logged)

- No standalone visitor-analytics/events table beyond `access_grants.first_viewed_at` — flagged by the Research council as a real future need, not added now to avoid over-building ahead of actual traffic.
- `audit_log` exists in the schema but is P2/deferred — not wired into Phase 10 build scope.
- Figma: empty Cover page, no in-file component documentation/annotations/changelog, no dedicated Wireframes/Tokens/Components/Prototype/Documentation pages (Phase 8's original 8-page plan never fully built — only Cover + High Fidelity exist).
- High-contrast mode not implemented (deliberately out of scope for the WCAG 2.2 AA target).
- Branding has a filter tab in Work index but no distinct URL segment (lives under `/work/presentations/[slug]`) — cosmetic.

## Future improvements

- Populate the `embedding` vector column and ship semantic search once there's enough real content to make it worthwhile.
- Build a proper `events`/analytics table if visitor-behavior insight becomes a real product need.
- Expand `roles` beyond the single owner if collaborators are ever added.
- Build out the remaining Figma pages (Tokens visual reference board, dedicated Components/Prototype/Documentation pages) once Phase 10's component retrofit is done — documenting real components, not aspirational ones.

## Success criteria (unchanged from Phase 4, reconfirmed here)

Functional baseline once live: working contact form (fixes the Phase 2 critical bug), resume downloads, recruiter-mode unlock/access-grant requests, average time on a case-study page, mobile vs. desktop traffic split (currently unmeasurable — mobile was broken), home→project→contact conversion, and self-reported interview attribution. No analytics baseline exists yet — first 90 days post-launch establish it.

---

**This document is the frozen baseline.** Any future architectural change — not a bug fix, not a content edit, an actual structural change to schema, IA, design tokens, or auth — requires `ARCHITECTURE_FREEZE_v2.md` before implementation.

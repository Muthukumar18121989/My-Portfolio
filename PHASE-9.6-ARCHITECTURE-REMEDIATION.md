# Phase 9.6 — Architecture Remediation & Architecture Freeze

No production code, no pages, no UI in this phase — architecture only, per instruction. Two Context7 checks were run before writing this (Supabase RLS custom-claim patterns, and pgvector/hybrid-search setup) since the access-control and search redesigns below depend on current, not remembered, API shape.

**Document mapping** (this project uses `PHASE-N-*.md` naming, not the generic names in the brief):
`PROJECT_SPEC.md` → `PHASE-4-PRODUCT-STRATEGY.md` · `DESIGN_SYSTEM.md` → `PHASE-6-DESIGN-SYSTEM.md` · `ARCHITECTURE.md` → `PHASE-7-TECHNICAL-ARCHITECTURE.md` · `CLAUDE.md` → did not exist, created fresh in this phase · Figma structure / CMS schema / IA / user flows → `PHASE-8`, `PHASE-7`, `PHASE-5` respectively, plus the live Figma file itself.

---

## Step 1–2 — Cross-reference and remediation matrix

Findings below start from `PHASE-9.5-ARCHITECTURE-REVIEW.md`'s 19 items, re-triaged into P0–P3, plus 2 new items found while cross-referencing the Storybook strategy and the Step 6/7 requirements (marked *new*).

| # | Finding | Priority | Source |
|---|---|---|---|
| 1 | No `project_media` table — schema can't hold Phase 12's required media types | **P0** | 9.5 |
| 2 | `access_requests` has no token/expiry/scope — can't issue or revoke a real access link | **P0** | 9.5 |
| 3 | No domain/industry/taxonomy metadata — AI Search literally cannot function | **P0** | 9.5 |
| 4 | No danger/warning color token — the form-error state (the bug this rebuild exists to fix) has nothing to bind to | **P0** | 9.5 |
| 5 | 8 of 10 planned components don't exist as real Figma components; Home/Recruiter Mode/Admin Dashboard don't even use the 2 that do | **P0** | 9.5 |
| 6 | Mobile nav collapse behavior unspecified — same bug category that broke the original site | **P0** (elevated from Medium) | 9.5 |
| 7 | *Storybook strategy is unbuildable as written* — Phase 6 organizes stories as Foundations→Primitives→Patterns→Templates, but Primitives/Patterns don't exist as components yet (same root cause as #5, listed separately because it blocks a distinct deliverable) | **P0** (new, consequence of #5) | new |
| 8 | Home page stat model conflict — Phase 5 says "one stat," Phase 9 built three named stat fields | P1 | 9.5 |
| 9 | Admin Dashboard/Settings surface built in Figma, never reflected back into the Phase 5 IA | P1 | 9.5 |
| 10 | No "Skills" entity despite Phase 11 requiring it as its own editable type | P1 | 9.5 |
| 11 | No reusable media library table (folds into #1's redesign) | P1 | 9.5 |
| 12 | Access-request form has no rate-limiting / anti-enumeration protection | P1 | 9.5 |
| 13 | Token contrast never numerically verified against locked color values | P1 | 9.5 |
| 14 | No slug-uniqueness/reserved-word rule across Work sub-namespaces | P1 | 9.5 |
| 15 | `good`/`info` Figma variables exist with no formal Phase 6 spec | P1 | 9.5 |
| 16 | *"NDA" wasn't a modeled state at all* — Step 6 of this phase names NDA as a required visibility tier; Phase 7's schema only ever had 5 states, none of them NDA | **P1** (new) | new |
| 17 | Typeface pairing collapsed to a single family (Inter) for display+body | P2 | 9.5 |
| 18 | Figma Cover page is empty | P2 | 9.5 |
| 19 | Zero in-file Figma documentation/annotations/changelog | P2 | 9.5 |
| 20 | Featured-project count inconsistent between docs (2–3 vs. exactly 3) | P2 | 9.5 |
| 21 | Branding has a filter tab but no distinct URL segment | P3 | 9.5 |

**7 P0s, 8 P1s, 4 P2s, 1 P3.** All P0s and P1s are remediated below. P2/P3 are logged as known debt in the freeze document (Step 12) rather than blocking.

---

## Step 3 — P0 remediation (full analysis)

### P0-1: Media architecture

**What's wrong:** `projects` has one `cover_image` field. Phase 12 requires PDF, PPT, Word, Video, GIF, YouTube, Loom, Figma embeds, Google Drive, ZIP, external links, hero + gallery images — all per project, embedded-only, no forced downloads.
**Why it's a problem:** a single scalar can't represent "N items, each a different type, each possibly needing different embed behavior."
**Technical debt if deferred:** every project entered before the fix has to be re-entered once a real media model exists; the Admin Dashboard's New Project modal (already built in Figma with only PDF/PPT fields) has to be redesigned mid-flight.
**UX risk:** recruiters/hiring managers hit projects with no way to view supporting material beyond one image — directly undermines the "proof over illustration" principle from Phase 3.
**Implementation risk:** PPT and Word have no native browser embed — treating them as "embed-only" requires a rendering strategy, not just a URL field.

- **Option A — JSONB array column on `projects`.** Fast to ship, but no referential integrity, awkward to query/version, can't enforce "exactly one hero image."
- **Option B — one relational `project_media` table, generic across types.** `project_id, media_type (enum), storage_path_or_url, embed_mode, sort_order, caption, alt_text, version, created_at`, plus a `metadata JSONB` column for type-specific extras (YouTube video ID, Figma embed params, ZIP file size) so adding a new media type never requires a schema migration, just a new enum value.
- **Option C — one table per media type** (`project_pdfs`, `project_videos`, …). Over-normalized; querying "all media for a project, in order" means a UNION across 12 tables.

**Recommendation: Option B.** It's the only one that stays stable as Phase 12's type list grows, supports ordering/captions/alt text/versioning natively, and keeps the Admin Dashboard's upload flow to one generic "add media" component instead of one form per type. **PPT/Word viewing dependency flagged separately** — resolve via a conversion step (render to PDF/images on upload) or an embeddable viewer service; this is a Phase 10 implementation decision, not a schema blocker, since the schema (`embed_mode`, `metadata`) already accommodates whichever approach is chosen.

```
project_media
  id, project_id (fk), media_type (enum: hero_image|gallery_image|pdf|ppt|word|video|gif|youtube|loom|figma_embed|gdrive|zip|external_link),
  storage_path_or_url, embed_mode (enum: inline|modal|link_out), sort_order, caption, alt_text,
  version (int, default 1), superseded_by (fk, nullable, self-referential — version history),
  created_at, updated_at
```

### P0-2: Access-grant lifecycle

**What's wrong:** `access_requests` (email, item_id, status, created_at) has no token, expiry, or record of what was actually granted.
**Why it's a problem:** the architecture doc already promises "a scoped, time-limited signed link" — the table as specified can't produce, verify, or revoke one.
**Technical debt if deferred:** retrofitting means migrating live data and potentially invalidating links already sent to real recruiters.
**UX risk:** without expiry, a private-project link works forever once issued — a real confidentiality problem for NDA-flagged work.
**Implementation risk:** without an `item_type`, `requested_item_id` isn't polymorphic-safe once private content spans projects, research, and presentations.

- **Option A — add `token`/`expires_at` directly to `access_requests`.** Conflates "someone asked" with "someone was granted" — a denied/pending row has meaningless empty grant fields.
- **Option B — separate `access_grants` table**, keeping `access_requests` as pure intake. `access_grants(id, request_id fk nullable, item_id, item_type, granted_to_email, token, expires_at, revoked_at, created_by, created_at)`.
- **Option C — real Supabase Auth accounts per requester** (magic-link login instead of a token). Heavier than needed for one-off recruiter access; creates and manages low-value identities indefinitely.

**Recommendation: Option B.** Cleanly separates the approval workflow from the permission ledger, supports revocation and audit trivially (a row either has `revoked_at` set or it doesn't), and mirrors how mainstream "share with anyone with the link" features are modeled elsewhere. Token is an **opaque random value looked up in the DB on each view** (not a signed stateless JWT) — at this traffic scale, the one extra DB read per view is free, and it buys instant revocation without needing to track a token blocklist. `item_type` added as an enum (`project|research_item|presentation_item`) to keep the FK polymorphic-safe.

### P0-3: Search / taxonomy metadata

**What's wrong:** no field anywhere answers "what industry," "what domain," "what deliverable" — Phase 13's example queries ("show banking projects") have nothing to query.
**Why it's a problem:** this phase's Step 7 expands the required facets to 18 categories (Industry, Domain, Client Type, Role, Deliverables, Research Methods, Design Methods, Platform, Technology, Year, Business Goal, Impact, Skills, Project Type, Tags, Keywords, Difficulty, Confidentiality) — far beyond what any single column can hold.
**Technical debt if deferred:** every project gets manually re-tagged after the fact instead of tagged once at entry.
**UX risk:** AI Search ships as a feature that answers nothing, actively damaging credibility for a UX-leadership candidate whose whole pitch is "I design systems that work."

- **Option A — one `industry` enum column.** Too rigid; can't hold 18 facet types.
- **Option B — one `tags TEXT[]` freeform array.** Flexible but loses type safety (can't tell "industry:banking" from "skill:banking"), no faceted-filter UI support, easy to get inconsistent labels over time ("Fintech" vs "FinTech" vs "Financial Services").
- **Option C — controlled taxonomy: `taxonomy_terms` table + `project_taxonomy_terms` join table**, with scalar fields directly on `projects` for the naturally single-value facets (`year`, `business_goal`, `impact_summary`, `difficulty`, `confidentiality`).

**Recommendation: Option C.**
```
taxonomy_terms
  id, category (enum: industry|domain|client_type|deliverable|research_method|design_method|platform|technology|skill|project_type|keyword),
  label, slug (unique per category)
project_taxonomy_terms
  project_id (fk), term_id (fk)
-- plus, directly on projects:
year (int), business_goal (text), impact_summary (text), difficulty (enum: junior|mid|senior|leadership), confidentiality (enum: none|nda|embargoed)
```
**Future vector search compatibility (per Step 7):** add an `embedding vector(384)` column (pgvector, confirmed current syntax via Context7) on projects, populated by a background job when content is entered or edited. Not populated at launch — Phase 13 ships keyword/taxonomy filtering first — but the column exists now so enabling semantic search later is additive (backfill + a similarity-search RPC function), never a migration. A `fts tsvector generated always as (...)` column is added alongside it so hybrid (keyword + semantic) search is possible from day one without re-architecting, per Supabase's documented hybrid-search pattern.

### P0-4: Missing danger/warning tokens

**What's wrong:** the real Figma variable collection has `good` and `info` but no `danger`/`warning` — the Form field's error state (literally the Phase 2 bug this whole rebuild exists to fix) has no color to bind to.
**Why it's a problem:** Phase 6 already promised a success/warning/danger/info token set; the built file quietly shipped only half of it.
**Technical debt if deferred:** Phase 10 wires every form component to variables — fixing the token set after that means re-touching every bound instance.
**UX risk:** a broken/invalid form field either renders with no error indication (silently), or someone improvises a color inline that isn't a token — reintroducing the "no design system" problem this project exists to solve.

- **Option A — reuse `locked` (rust) as danger, skip warning.** Conflates "gated content" semantics with "form error" semantics; two unrelated states would look identical.
- **Option B — add `danger` only, still skip `warning`.** Fixes the immediate form-error bug but leaves a real spec gap (Phase 6 explicitly wants all three).
- **Option C — add both `danger` and `warning`** as fully separate tokens: `danger` reuses the existing rust hue (both signal "stop"), formally split from `locked` so Phase 10 doesn't conflate them; `warning` is a new amber tone, distinct from the teal accent and from danger-rust.

**Recommendation: Option C.** Two new variables, both modes (Dark/Light), added to the same `Design OS / Color` collection — cheapest possible fix, and it's needed regardless of when it happens, so doing it now avoids re-touching bound instances later.

### P0-5 / P0-7: Component architecture (component debt + Storybook blocker)

**What's wrong:** only NavBar and Footer exist as real Figma components (no variants, no states, empty descriptions), and even those aren't used on Home, Recruiter Mode, or Admin Dashboard — those three screens have hand-built duplicate nav/footer frames instead. The other 8 planned components (Button, Project card, Metadata badge, Testimonial block, Timeline item, Article card, Form field, Theme toggle) are one-off shapes baked into each screen. Phase 6's Storybook strategy assumes a Primitives/Patterns layer that doesn't exist yet.
**Why it's a problem:** "component library" (Phase 10's stated deliverable) implies extending existing components, not building from nothing while also fixing 3 screens that silently diverged from the system they were supposed to demonstrate.
**Technical debt if deferred:** every screen keeps its own copy of the same button/card markup; a design change means editing 9 places instead of 1; Storybook can't be populated as documented.
**UX risk:** low direct visitor-facing risk today, but high risk of visual drift over time (exactly the inconsistency Phase 3's benchmark called out other portfolios for).
**Implementation risk:** Phase 10 could easily be scoped as "build 8 new components" without anyone noticing 3 screens need retrofitting to actually use them — silent scope loss.

- **Option A — leave Home/Recruiter Mode/Admin Dashboard as-is, only componentize the remaining 8 forward.** Cheapest short-term, but permanently bakes in inconsistency on the 3 most-trafficked/most-visible screens (Home is the highest-traffic template in the entire system).
- **Option B — componentize all 10, and explicitly make "retrofit the 3 divergent screens to use NavBar/Footer instances" the first task of Phase 10**, before any new component work.
- **Option C — start over on all 9 screens from a component-first rebuild.** Highest quality ceiling, but discards approved, reviewed work for marginal gain over Option B.

**Recommendation: Option B.** Phase 10 opens with a reconciliation pass (swap Home/Recruiter Mode/Admin Dashboard's hand-built nav/footer for real instances), then builds the remaining 8 components with full variant/state coverage on a dedicated **Components** page (per the original, never-built Phase 8 plan) rather than scattering them further across screens. Storybook structure follows automatically once real components exist — no separate remediation needed beyond sequencing.

### P0-6: Mobile navigation collapse

**What's wrong:** 5 nav links + a persistent Recruiter Mode button + a search icon slot, with zero specified behavior below the point they stop fitting a mobile viewport.
**Why it's a problem:** this is the exact bug category (no mobile nav fallback at all) that made the original Framer site nearly unusable on phones — the audit that started this entire rebuild.
**Technical debt if deferred:** Phase 10 would build Home's nav without a mobile spec, then need a second pass once someone notices it breaks at 390px — again.
**UX risk:** direct hit to the Recruiter persona (Phase 4), who screens on mobile most often.

- **Option A — hamburger + slide-out drawer** below the `md` (768px) breakpoint, using the Sheet/Drawer primitive already available via shadcn/Radix (Phase 7's chosen stack).
- **Option B — bottom tab bar**, app-style, fixed navigation with icon+label.
- **Option C — priority+/overflow pattern** — show what fits, collapse the rest into a "More" menu, keep Recruiter Mode always pinned.

**Recommendation: Option A.** Most standard and lowest-risk pattern for a content site (not an app); doesn't flatten the hierarchy between "Recruiter Mode" (a primary action) and ordinary nav links the way a bottom tab bar would; ships with primitives already in the approved stack, so no new dependency. Recruiter Mode stays visible as a pinned button even when the drawer is collapsed, consistent with its "distinct from a nav link" status from Phase 5.

---

## Step 3 (cont.) — P1 remediation (condensed)

| # | Decision | Rationale |
|---|---|---|
| 8 | Home shows a `stats[]` array (min 1, typically 3), not a hardcoded single stat. Settings' 3-slot UI becomes the general case, not a special case. | Matches what was actually built and reviewed; array shape means adding/removing a stat later needs no schema change. |
| 9 | Phase 5 IA amended (see Step 4) to formally include `/admin` sub-routes (Overview, Projects, Settings, + reserved routes for Articles/Testimonials/Awards/Résumé/Access requests pending Phase 11 build-out). | Keeps the IA the single source of truth; Phase 11 now has something to build from instead of contradicting Phase 9's Figma work. |
| 10 | `skills` becomes its own table (`id, label, category, proficiency_note`) with an optional `resume_entry_id` link, not a field embedded in `resume_entries`. | Independent lifecycle from resume roles; can be surfaced on About/Resume/AI Search facets without being trapped inside one role's JSON. |
| 11 | Resolved by the Step 5 media redesign — no separate action needed. | — |
| 12 | Access-request endpoint gets rate-limiting (IP + email, e.g. 5/hour) and a response that never reveals whether a given item exists (generic "request received" regardless of validity). | Standard mitigation for an unauthenticated public form gating confidential content. |
| 13 | Contrast check added as a required gate before Phase 10 starts (not deferred to Phase 15) — verify the locked teal/rust/good/info hex values against both Dark and Light grounds at 4.5:1 (text) / 3:1 (UI) before any component binds to them. | Cheaper to retune a variable now than after 9 screens + components reference it. |
| 14 | Slug uniqueness enforced globally (not per-namespace) via a DB unique constraint on `slug`, plus a reserved-word list (`research`, `presentations`, `admin`, `private`, `recruiter`) rejected at creation time. | One constraint now vs. a silent routing collision discovered in production later. |
| 15 | `good`/`info` formally added to Phase 6's token table (Step 8 below) with defined roles and required contrast targets. | Removes the undocumented-extension risk before Phase 10 references them. |
| 16 | NDA modeled as an **orthogonal flag**, not a 6th visibility state: `requires_nda_acknowledgment boolean` on `projects` (usable regardless of visibility tier), plus an `nda_acknowledgments` table (`grant_id fk, acknowledged_at, ip_address nullable`). Rejected alternative: NDA as a full 6th `visibility` enum value — would force every visibility-branching piece of code/RLS policy to carry a permanent 6th case for what is really a property of the *viewing flow*, not the content's tier. | Keeps the state machine at 5 tiers; NDA becomes "show an acknowledgment gate before rendering," composable with Private or Recruiter tiers alike. |

---

## Step 4 — Updated architecture (applied to source docs)

Amendment sections have been appended to the following docs, each dated and cross-referencing this phase, per the decision log requirement in Step 12:
- `PHASE-5-INFORMATION-ARCHITECTURE.md` — Admin sub-routes formalized; mobile nav collapse spec added; slug-uniqueness rule added.
- `PHASE-6-DESIGN-SYSTEM.md` — `danger`/`warning` tokens added; `good`/`info` formally specified; contrast-check gate added ahead of Phase 10.
- `PHASE-7-TECHNICAL-ARCHITECTURE.md` — full schema amendment: `project_media`, `access_grants`, `taxonomy_terms`/`project_taxonomy_terms`, `skills`, `nda_acknowledgments`, `audit_log` tables; RLS policy pattern (custom-claim based, per the Context7-verified pattern); rate-limiting note on the access-request endpoint.
- `CLAUDE.md` — created fresh (did not exist before this phase) with the approved stack, conventions, and pointers to the phase docs, so Phase 10 development has an entry point.

---

## Step 5 — Expanded media architecture

Covered in full under P0-1 above. Summary: one `project_media` table, generic across all 14 required types via a `media_type` enum + `metadata JSONB`, with native support for ordering (`sort_order`), captions, alt text (accessibility metadata — required field, not optional, consistent with Phase 6's WCAG 2.2 AA target), and version history (`version` + self-referential `superseded_by`). Attachments and ZIP files use the same table with `embed_mode = link_out` rather than a separate model.

## Step 6 — Redesigned access control

**Roles:** `owner` (admin, full access, currently 1 row but modeled as a table not a hardcoded email so adding collaborators later is an insert, not a migration), `viewer_public` (implicit, anonymous), `viewer_grant` (holds a valid, unexpired, unrevoked `access_grants` row).

**Visibility tiers (unchanged, 5-state):** Public / Recruiter / Private / Draft / Archived — confirmed already correctly implemented in both the schema and the Figma Admin Dashboard (a prior review's premise that this was 4-state was checked directly against the file and found incorrect).

**NDA:** orthogonal flag + acknowledgment log, per P1-16 above — not a 6th tier.

**Access-grants (invite tokens, expiry, revocation):** per P0-2 — `access_grants` table with opaque token, `expires_at`, `revoked_at`. Revoking is a single `UPDATE ... SET revoked_at = now()`; every view checks the grant is both unexpired and unrevoked.

**Audit log:** new `audit_log` table (`actor, action, target_type, target_id, metadata jsonb, created_at`), append-only, covering every admin mutation (create/edit/publish/archive a project, approve/deny/revoke a grant) — standard, low-complexity pattern, satisfies the audit requirement without needing a dedicated logging service at this scale.

**RLS pattern (Context7-verified against current Supabase docs):** policies keyed on custom JWT claims rather than hardcoded user IDs — e.g. a policy checks `(auth.jwt() ->> 'role') = 'owner'` for admin-only writes, and grant-gated reads check the requesting session's grant token against `access_grants` directly (grantees don't need a real Supabase Auth session at all — token-based, not session-based, consistent with the "lightweight, no account creation" principle from Phase 7).

**Enterprise scalability:** because roles live in a table and grants are polymorphic (`item_type` + `item_id`), extending to multiple content owners, team-based permissions, or org-level sharing later is additive — new role values, new item types — not a redesign.

## Step 7 — Improved search architecture

Covered in full under P0-3. Summary: a controlled `taxonomy_terms` vocabulary covering 11 of the 18 requested facets (industry, domain, client_type, deliverable, research_method, design_method, platform, technology, skill, project_type, keyword), with the remaining naturally-scalar facets (year, business_goal, impact, difficulty, confidentiality) as direct columns on `projects`. Hybrid search readiness (`tsvector` + `pgvector embedding` columns, both confirmed against current Supabase docs) is built in from day one as dormant capacity — Phase 13 ships keyword/taxonomy filtering first; semantic search activates later by populating the embedding column, no migration required.

## Step 8 — Expanded design tokens

Full requested token category audit against Phase 6's existing spec:

| Category | Status | Action |
|---|---|---|
| Primary/Accent | Existing (`accent`) | No change |
| Secondary | **Missing** | Add `--color-secondary` — a muted variant of accent for lower-emphasis actions (was previously conflated with `ghost` button styling alone; now a real token) |
| Success | Existing (`good`) | Formally documented (was undocumented extension, P1-15) |
| Warning | **Missing** | Added (P0-4) |
| Error/Danger | **Missing** | Added (P0-4) |
| Info | Existing (`info`) | Formally documented (P1-15) |
| Neutral | Existing (`fg-muted`) | No change |
| Surface/Background | Existing (`bg`, `bg-surface`) | No change |
| Border | Existing (`border`) | No change |
| Focus | **Missing** | Add `--color-focus` — currently focus rings reuse `accent`, which is correct per Phase 6's a11y rules but was never a *named* token, so Phase 10 has nothing explicit to reference; add as an alias of `accent` so intent is explicit without a new color |
| Interactive/Disabled | **Missing** | Add `--opacity-disabled` (0.5) as a semantic opacity token, applied via a `disabled` state rule rather than a new color, consistent with how disabled states are conventionally handled |
| Overlay | **Missing** | Add `--color-overlay` (black, alpha-scaled) for modal/drawer backdrops — needed now that the mobile nav drawer (P0-6) and admin modal (already built) both require one |
| Elevation/Shadow | Existing (`--shadow-sm/md/lg`, Phase 6) | No change |
| Motion | Existing (`--ease-fluid`, `--ease-snappy`, duration scale) | No change |
| Typography | Existing (type scale, 3 font roles) | No change (typeface *pairing* is P2, not P0/P1 — see below) |
| Spacing/Radius | Existing | No change |
| Z-index | **Missing** | Add a `--z-*` scale (`dropdown`, `drawer`, `modal`, `toast`) — needed now that overlays (drawer + modal) coexist and must stack predictably |
| Dark/Light | Existing | No change |
| High Contrast | **Missing** | Logged as **P2** (future improvement, not blocking) — WCAG 2.2 AA (Phase 6's actual target) doesn't require a separate high-contrast mode; adding one now would be scope creep against the stated accessibility target, not a gap against it |

Every new token above gets both Dark and Light values before Phase 10 begins, per the same discipline as the original 10.

## Step 9 — Component architecture review

Covered in full under P0-5/P0-7. Atomic hierarchy for Phase 10: **Foundations** (tokens, documented via Figma variable descriptions — currently empty, fix while componentizing) → **Primitives** (Button, Form field, Metadata badge, Theme toggle) → **Patterns** (Project card incl. locked/NDA states, Nav bar incl. mobile drawer, Testimonial block, Timeline item, Article card, Footer) → **Templates** (the 9 existing screens, retrofitted to reference Patterns instead of one-off shapes). No detached copies permitted past Phase 10 — every page must use shared components, enforced by making the Home/Recruiter Mode/Admin Dashboard retrofit the mandatory first task, not an optional cleanup.

## Step 10 — Figma audit (reconciled, not re-run)

A live, read-only Figma audit was already performed minutes before this phase, as part of the Phase 9.5 council (one dedicated agent connected directly to the file). Nothing has been written to the Figma file since, so those findings are re-used here rather than re-verified, to avoid a redundant round-trip:

- **Confirmed:** only 2 of 8 planned Figma pages exist (Cover, High Fidelity); Cover is empty; one variable collection with 10 variables across Dark/Light modes; only NavBar/Footer are real components (no variants); 14 instances exist but Home/Recruiter Mode/Admin Dashboard don't use them; zero in-file documentation/annotations; no orphaned/debug content (clean build hygiene, confirmed).
- **Architecture fix (not visual fix), per this step's instruction:** the remediation is sequencing and structure — a real Components page, a real Documentation page (component descriptions + accessibility annotations + changelog), and the retrofit pass — not restyling anything already approved.

---

## Cross-document consistency check

Re-read `PHASE-5`, `PHASE-6`, `PHASE-7`, `PHASE-8`, `PHASE-9`, and `PHASE-9.5` together after the above decisions: no remaining contradictions found at this stage. The NDA/visibility-state question (P1-16) was the last structural inconsistency; it's now resolved as an orthogonal flag rather than a state, which keeps every existing visibility-branching reference in the other docs correct as written (they don't need to be renumbered from 5 states to 6).

---

## Step 11 — Multi-agent review of the remediated architecture

16 named personas, consolidated into 5 agents (3–4 personas each), each independently reviewing the remediation above. **First-round result: not unanimous approval.** Two personas gave an outright "No" (Creative Director, Motion Designer) and the Technical Architecture group found one genuine implementation blocker plus several conditional issues. This is treated as the review working correctly, not as a failure to resolve — the findings below were concrete and fixable, and are now fixed directly in the source docs (not just logged).

| Council group | Personas | Verdict | Key finding |
|---|---|---|---|
| Design Leadership & Craft | Principal UX Designer, Design Director, Creative Director, Motion Designer | 2 conditional, 2 no | Typeface pairing left undecided by default (not actually chosen, just deferred); drawer/modal motion never specified despite new z-index scale implying their coexistence |
| Research & Strategy | UX Research Lead, Product Strategist, Enterprise UX Consultant | 3 conditional | No visitor-engagement tracking anywhere in the schema; 11-category taxonomy is more tagging labor than ~10–20 lifetime projects justifies if all mandatory; `audit_log` was never actually triaged, just added |
| Technical Architecture | Design System Architect, Frontend Architect, Backend Architect | 2 conditional, 1 blocker | `--color-focus` alias would silently break dark/light switching without `@theme inline` (Context7-verified); `content_media`/taxonomy tables weren't actually polymorphic despite claiming to fix research/presentation coverage; global slug uniqueness was specified as a single DB constraint across 4 separate tables, which Postgres can't do; **no index list, especially missing a UNIQUE index on `access_grants.token`**; **blocker: grant-gated reads were specified as covered by JWT-claim RLS while also admitting grantees have no session — self-contradictory, `auth.jwt()` isn't available to an unauthenticated visitor** |
| Quality & Compliance | Accessibility Expert, Performance Engineer, SEO Specialist | 2 conditional, 1 no | `alt_text` "required" was prose-only, not a DB constraint; no captions/transcripts for video, no fallback text for embeds; no lazy-loading/thumbnail/version-filtering strategy for media-heavy pages; **no per-project SEO metadata fields at all — a direct regression against the Phase 2 finding ("My Framer Site" generic metadata) that started this entire project** |
| End-User Personas | Recruiter, Hiring Manager, VP of Design | 3 approve (1 conditional) | Recruiter and VP journeys unaffected/improved; Hiring Manager flagged a content-curation risk (no default media ordering convention) rather than an architecture defect |

### Round 2 — fixes applied directly to source docs

Every finding above marked blocker or "no" has been fixed (not just logged) in `PHASE-6-DESIGN-SYSTEM.md` and `PHASE-7-TECHNICAL-ARCHITECTURE.md`'s amendment sections, specifically:

1. **Typeface pairing decided**: Geist selected as the display face (paired with Inter body), not left as an open Phase 14 question — only webfont hosting/licensing stays deferred, the decision itself is frozen now.
2. **Drawer/modal motion specified**: translateX+fade for the drawer, scale+fade for the modal, both on the existing `--ease-snappy`/`--ease-fluid` tokens, both instant under reduced motion.
3. **`--color-focus` fixed**: now specified as requiring `@theme inline`, verified against current Tailwind v4 docs via Context7 — the original spec would have silently broken theme-switching on every focus ring.
4. **Media/taxonomy made genuinely polymorphic**: `project_media`/`project_taxonomy_terms` renamed to `content_media`/`content_taxonomy_terms`, keyed on `(content_id, content_type)` so research and presentation items actually get the coverage originally claimed.
5. **Slug uniqueness fixed**: replaced the unenforceable cross-table constraint with a `content_slugs` registry table every content type writes to on creation.
6. **Required indexes named explicitly**: unique index on `access_grants.token` (security-critical, not just performance), plus indexes on the taxonomy join table and `content_media`.
7. **Access-grant RLS blocker resolved**: grant-gated reads now go through a `SECURITY DEFINER` RPC function (`get_gated_content(token)`) that validates the token itself and is callable without a user session — RLS on the underlying tables stays deny-by-default, this is the one deliberate, scoped bypass.
8. **Minimal engagement signal added**: `access_grants.first_viewed_at`.
9. **Taxonomy entry policy narrowed**: industry/domain/deliverable/platform mandatory, the other 7 categories optional — schema unchanged, entry burden reduced.
10. **`audit_log` re-triaged**: explicitly P2/deferred to Phase 11, removed from the freeze-blocking set.
11. **Feature folders added**: `features/research/`, `features/presentations/`, `features/taxonomy/`, `features/media/` — the original folder structure only had `features/projects/`, which the schema had already outgrown.
12. **Media accessibility fields added**: `alt_text` is now a real `NOT NULL` constraint, plus `caption_track_url` (video captions/transcript) and `fallback_description` (non-image embeds), and `thumbnail_url` required for video/gallery.
13. **Media performance budget specified**: max 8 inline media items per project by default, lazy-load below the fold, current-version-only as the default query filter.
14. **SEO metadata fields added**: `meta_title`/`meta_description` on content tables, `hero_image` designated as the OG-image source — this was the single most important miss from round 1, since fixing exactly this class of bug was the original reason this project exists.
15. **Media ordering convention documented** (admin UX guideline, not a schema change): hero → process/decision artifacts → supporting attachments.

No second full review round was run after these fixes — they're concrete, narrowly-scoped corrections to specific, well-identified problems, not new architectural directions that would themselves need independent re-litigation. The remaining P2 items (high-contrast mode, in-file Figma documentation, empty Figma Cover page, Branding URL segment) are logged as known debt in the freeze document below, not blockers.

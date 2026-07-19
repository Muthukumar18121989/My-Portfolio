# Phase 7 — Technical Architecture

Scoped as an efficient pass (per your call, given context budget): stack picks below are justified by reasoning and what Phases 3/6 already established; Context7 was used only on the three areas with real version-specific risk — Motion's rename, Supabase's current SSR auth pattern, and Storybook's current major version. Full docs weren't pulled for candidates rejected below.

## Stack decision

| Layer | Pick | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | Content-heavy, SEO-critical site (Phase 2 found zero SEO customization) — needs Next's Metadata API, static generation for case studies, and built-in image optimization (directly fixes the broken/never-loading images found in Phase 2). A plain React SPA can't fix the SEO findings; Next.js is the default here, not a real toss-up. |
| Language | **TypeScript, strict mode** | Explicitly required by the original brief (Phase 14). No alternative considered. |
| Styling | **Tailwind CSS v4** | Already the basis of the Phase 6 token spec (`@theme` directive), verified via Context7 in that phase. |
| Components | **shadcn/ui** | Confirmed organically in Phase 3 — every strong reference component found on 21st.dev was shadcn-based. Radix primitives underneath also satisfy the Phase 6 WCAG 2.2 AA target (focus management, ARIA handled at the primitive level). |
| Motion | **Motion** (not Framer Motion) | Verified via Context7: Framer Motion was renamed. Current package is `motion`, imported from `motion/react` — `npm install motion`, not `framer-motion`. Phase 6's motion-principles doc already described the behavior generically enough that this rename doesn't change anything except the install command. |
| Backend / DB / Auth / Storage | **Supabase only** | Covers Postgres (content + access-request tables), Auth (magic link, for both admin login and private-content access), and file storage (project images) in one system. See "CMS approach" below for why this replaces Sanity, and "Auth flow" for why it replaces Auth.js. |
| Long-form content rendering | **`next-mdx-remote`**, not `@next/mdx` | `@next/mdx` compiles MDX files at build time — wrong fit here, since article/case-study bodies are written through the Admin Dashboard at runtime, not committed as files. `next-mdx-remote` compiles MDX strings fetched from the database on request, which matches a CMS-driven model instead of a file-based one. |
| Component workshop | **Storybook 10** (`nextjs-vite` framework integration, `appDirectory: true`) | Confirmed current major via Context7 — Storybook 9 is two majors back and only gets critical-CVE patches, not the version to build against today. |

## What's explicitly rejected, and why

- **Sanity** — rejected in favor of a fully custom Admin Dashboard. Phase 9's UI design list and Phase 11's CMS brief both treat the Admin Dashboard as a *designed page in the Design OS itself* ("premium personal design platform"), not a bounce-out to a generic third-party editorial UI. Sanity Studio would work functionally but would be an off-brand interface bolted onto an otherwise fully custom system — Supabase as a headless data layer under a custom-built admin UI keeps the whole platform, including the editing experience, consistent with the brand.
- **Auth.js** — rejected as a redundant layer. Supabase already provides magic-link auth; adding Auth.js on top would mean running two auth systems for one need (a single admin login + lightweight visitor access-requests). This is the "don't add abstractions beyond what's needed" call.

## Folder structure (feature-based, per the original brief's requirement)

```
src/
  app/                        # Next.js App Router routes (maps 1:1 to Phase 5 sitemap)
    (public)/
      page.tsx                    # Home
      work/
        page.tsx                    # Work index
        [slug]/page.tsx              # Project detail
        research/[slug]/page.tsx
        presentations/[slug]/page.tsx
      about/
        page.tsx
        testimonials/page.tsx
        awards/page.tsx
      writing/
        page.tsx
        [slug]/page.tsx
      resume/page.tsx
      contact/page.tsx
      recruiter/page.tsx
      private/page.tsx
    admin/                       # authenticated, excluded from public nav (Phase 11)
    api/                         # route handlers (form submission, access requests)
  features/                   # feature-based modules, not type-based
    projects/         { components/, queries/, types.ts }
    research/          { components/, queries/, types.ts }   # added Phase 9.6 — was missing despite research_items being a real table since Phase 7's original draft
    presentations/    { components/, queries/, types.ts }   # added Phase 9.6, same reason
    taxonomy/          { components/, queries/, types.ts }   # shared across projects/research/presentations — owns content_taxonomy_terms and the tag-entry UI
    media/              { components/, queries/, types.ts }   # owns content_media: upload flow, version history, thumbnail generation
    articles/         { components/, queries/, types.ts }
    testimonials/    { components/, queries/, types.ts }
    resume/           { components/, queries/, types.ts }
    access-requests/ { components/, queries/, types.ts }   # now also owns the get_gated_content RPC call
    contact/          { components/, actions.ts }
  components/                 # cross-feature primitives/patterns from Phase 6 (Button, Nav, Card, Footer...)
  lib/
    supabase/         { client.ts, server.ts, middleware.ts }   # per the @supabase/ssr pattern below
  styles/
    theme.css                   # Phase 6 tokens as Tailwind v4 @theme
```

## CMS data model (Supabase / Postgres)

Tables map directly to Phase 5's content types, each carrying the five-state visibility field from Phase 5/12:

- `projects` — title, slug, role, type, tools[], context/problem/process/outcome/reflection (MDX body fields), cover_image, `visibility` (public/recruiter/private/draft/archived)
- `research_items`, `presentation_items` — same shape as projects, scoped to their Work sub-filters
- `articles` — title, slug, body (MDX), published_at, `visibility`
- `testimonials` — quote, author, role, company, optional `project_id` (linked-testimonial rule from Phase 4)
- `awards` — title, issuer, date
- `resume_entries` — role, company, start_date, end_date, achievements[], optional linked `project_ids[]`
- `access_requests` — email, requested_item_id, status (pending/approved/denied), created_at — powers the Private Portfolio request-access flow from Phase 5

## Auth flow

Built on the `@supabase/ssr` pattern (current API confirmed via Context7 — `createServerClient` with cookie handling in middleware, `supabase.auth.getUser()` to check session):

1. **Admin login** — single-owner magic-link auth restricted to one allow-listed email. Middleware checks the session on every `/admin` route and redirects to a login screen if absent, per the standard `@supabase/ssr` protected-route pattern.
2. **Private Portfolio access** — deliberately *not* a full visitor account system (would be over-engineering for one-off recruiter/stakeholder access). A visitor hits a locked card, submits their email, which writes a row to `access_requests`. Approving it from the Admin Dashboard issues a scoped, time-limited signed link for that specific item — no account creation, no password, matching the lightweight nature of the actual need.
3. **Recruiter Mode** stays fully public per Phase 5 — no auth involved.

## Next (Phase 8, pending your go-ahead)

Figma planning: file structure (Cover, Wireframes, High Fidelity, Components, Tokens, Variables, Prototype, Documentation pages) — no code, preparing for Figma MCP sync in Phase 9.

---

## Amendment (Phase 9.6 — Architecture Remediation, full rationale in PHASE-9.6-ARCHITECTURE-REMEDIATION.md)

The CMS data model above is superseded by the schema below, which closes gaps the Phase 9.5 council found: no media model beyond a single cover image, no way to actually expire/revoke a private-access link, and no metadata for AI Search to query.

### Full schema — corrected after council review round 2 (see PHASE-9.6 for the findings that forced these fixes: the original version of this section wasn't actually polymorphic despite claiming to be, and the slug-uniqueness rule was unenforceable as stated)

```
content_slugs   -- the actual mechanism for the "globally unique slug" rule; a single unique
                -- constraint across 4 separate tables isn't possible in Postgres, so every
                -- content row registers here on create, enforced by a Postgres AFTER INSERT
                -- trigger on each of the 4 content tables (not application-code discipline —
                -- a verification pass on round-2 fixes correctly flagged that "app-level
                -- transaction" alone doesn't guarantee consistency; a DB trigger does)
  slug (primary key), content_type (enum: project|research_item|presentation_item|article),
  content_id, created_at

projects
  id, title, slug, role, type,
  context/problem/process/outcome/reflection (MDX body fields),
  visibility (enum: public|recruiter|private|draft|archived),
  requires_nda_acknowledgment (boolean, default false),
  year (int), business_goal (text), impact_summary (text),
  difficulty (enum: junior|mid|senior|leadership), confidentiality (enum: none|nda|embargoed),
  meta_title (text, nullable — falls back to title), meta_description (text, nullable — falls back to a truncated impact_summary),
  embedding (vector(384), nullable — dormant until Phase 13 backfills it),
  fts (tsvector, generated) — hybrid search readiness, both confirmed against current Supabase/pgvector docs
research_items, presentation_items, articles — same shape as projects where applicable, each also registers in content_slugs

content_media   -- renamed from project_media: keyed polymorphically so research/presentation
                -- items can carry media too, closing the gap the technical council flagged
                -- (the P0-1 fix claimed system-wide coverage but the original table only had project_id)
  id, content_id, content_type (enum: project|research_item|presentation_item),
  media_type (enum: hero_image|gallery_image|pdf|ppt|word|video|gif|youtube|loom|figma_embed|gdrive|zip|external_link),
  storage_path_or_url, embed_mode (enum: inline|modal|link_out), sort_order,
  caption, alt_text (NOT NULL constraint — enforced at the DB level, not just labeled required in prose),
  thumbnail_url (required for video/gallery types — poster frame, generated on upload),
  caption_track_url (nullable — closed captions/transcript, for video/youtube/loom types),
  fallback_description (nullable — accessible text alternative for ppt/word/figma_embed/gdrive, distinct from alt_text since those aren't images),
  version (int, default 1), superseded_by (fk, nullable, self-referential), created_at, updated_at
  -- default query pattern: WHERE superseded_by IS NULL (current version only) — must be the
  -- default in every query helper, not opt-in, per the performance council's finding
  -- default admin-UX convention for sort_order: hero → process/decision artifacts → supporting attachments

skills
  id, label, category, proficiency_note, resume_entry_id (fk, nullable)

taxonomy_terms
  id, category (enum: industry|domain|client_type|deliverable|research_method|design_method|platform|technology|skill|project_type|keyword),
  label, slug (unique per category)
content_taxonomy_terms   -- renamed from project_taxonomy_terms, same polymorphism fix as content_media
  content_id, content_type, term_id (fk)
  -- entry policy (not a schema constraint): industry/domain/deliverable/platform are the only
  -- mandatory facets at content-creation time; the remaining 7 categories are optional and
  -- filled in opportunistically — the product-strategy council flagged the full 11-category
  -- set as more tagging labor than ~10-20 lifetime projects justifies if all were mandatory

testimonials — quote, author, role, company, optional project_id
awards — title, issuer, date
resume_entries — role, company, start_date, end_date, achievements[], optional linked project_ids[]

access_requests — email, requested_item_id, item_type (enum: project|research_item|presentation_item), status (pending|approved|denied), created_at
access_grants — id, request_id (fk, nullable), item_id, item_type, granted_to_email, token (opaque, unique, DB-checked not stateless JWT), expires_at, revoked_at, first_viewed_at (nullable — minimal engagement signal, closes the "was it ever opened" gap the research council flagged), created_by, created_at
nda_acknowledgments — grant_id (fk), acknowledged_at, ip_address (nullable)
audit_log — actor, action, target_type, target_id, metadata (jsonb), created_at (append-only)
  -- re-triaged P2/deferred to Phase 11, not part of the freeze-blocking set — it was never
  -- run through the same P0-P3 prioritization as everything else in this schema
roles — currently 1 row (owner), modeled as a table so adding collaborators later is an insert, not a migration

-- Required indexes (named explicitly — the technical council flagged that none were specified,
-- and the token lookup is security-critical, not just a performance nicety):
--   UNIQUE INDEX on access_grants(token)
--   INDEX on taxonomy_terms(category)
--   INDEX on content_taxonomy_terms(content_id, content_type)
--   INDEX on content_taxonomy_terms(term_id)
--   INDEX on content_media(content_id, content_type)
```

**Performance note (media):** no page renders more than 8 media items inline by default — additional items sit behind a "view all" expansion. Lazy-load everything below the fold. `thumbnail_url` is generated at upload time, not on first render.

**SEO note:** `meta_title`/`meta_description` close the original "My Framer Site" generic-metadata bug directly — Phase 10 must wire these into Next.js `generateMetadata` per route, and designate the `hero_image` row in `content_media` as the OG-image source. This was missed in the first remediation pass despite being the literal top finding from the Phase 2 audit that started this project — flagged by the SEO council review, fixed here.

### Auth flow amendment

Private Portfolio access is now **token-based via `access_grants`**, not a same-request signed link with no persistence: request → admin approval creates an `access_grants` row with an opaque token and `expires_at` → the visitor's link embeds that token → every view checks the grant is unexpired and unrevoked. Revocation is a single `UPDATE ... SET revoked_at = now()`. Approving also stamps `first_viewed_at` on first successful read, giving a minimal "was this ever opened" signal.

**Corrected mechanism (council review round 2 caught a real gap here — the first draft claimed grant-gated reads were covered by JWT-claim RLS while also admitting grantees have no session, which is self-contradictory; `auth.jwt()` isn't available to an unauthenticated visitor):** admin/owner writes are gated by RLS keyed on custom JWT claims, as originally specified (pattern confirmed current via Context7). Grant-gated **reads** instead go through a `SECURITY DEFINER` Postgres RPC function (`get_gated_content(token text)`), called via Supabase's RPC endpoint with the public anon key — no user session required. The function itself validates the token exists, is unexpired, and isn't revoked, then returns the content row; RLS on the underlying tables stays locked down (deny-by-default for anonymous reads), and this one function is the sole, deliberate bypass, not an open policy. The access-request endpoint gets rate-limiting (IP + email) and never reveals whether a requested item exists.

### NDA handling

Not a 6th visibility state — `requires_nda_acknowledgment` is an orthogonal boolean usable on any non-public tier, logged via `nda_acknowledgments` when a grantee clicks through. Keeps the 5-state visibility model (Public/Recruiter/Private/Draft/Archived, confirmed correct and unchanged) intact.

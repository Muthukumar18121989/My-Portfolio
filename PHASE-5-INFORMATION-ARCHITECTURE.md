# Phase 5 — Information Architecture

Built directly on the personas/journeys in [PHASE-4-PRODUCT-STRATEGY.md](PHASE-4-PRODUCT-STRATEGY.md) and the "small nav, sub-navigation for depth" principle from [PHASE-3-COMPETITOR-BENCHMARK.md](PHASE-3-COMPETITOR-BENCHMARK.md).

## Sitemap

```
/                       Home
/work                   Work index (filter: Case Studies / Research / Presentations / Branding)
  /work/[project-slug]      Project case study detail
  /work/research/[slug]     Research artifact detail
  /work/presentations/[slug] Presentation/branding artifact detail
/about                  About (point of view, career narrative, leadership scope)
/about/testimonials     Testimonials (linked from About + footer, not primary nav)
/about/awards           Awards (linked from About + footer, not primary nav)
/writing                Articles index
  /writing/[slug]           Article detail
/resume                 Resume (native page + on-domain PDF download)
/contact                Contact (working form)
/recruiter              Recruiter Mode (condensed scan view)
/private                Private Portfolio (gated, request-access flow)
/admin                  Admin Dashboard (authenticated CMS, not in public nav — built in Phase 11)
```

**Dropped from the current site's IA:** a standalone `/skills` page. Per the Phase 2 finding that every tool was rated "Expert" with no gradient, Skills becomes a supporting module inside About and Resume instead of a page competing for primary nav space — consistent with keeping top-level nav small as content grows.

## Navigation structure

**Primary nav (5 items — stays this size even as Research/Branding/Presentations/Awards get added, per Phase 3's benchmark finding that Vercel/Notion/Figma keep large product surfaces under a small nav):**
`Work · About · Writing · Resume · Contact`

**Persistent header elements, visually distinct from the nav links (not just more list items):**
- **Recruiter Mode** — a standalone button/toggle, not a nav link, because it's a persona-specific fast path (Phase 4 recruiter journey needs a dedicated entry, not one more item to scan past)
- **Search** — icon slot reserved now for AI Search (built in Phase 13), so nav doesn't need restructuring later

**Footer:** repeats primary nav + Testimonials + Awards + Private Portfolio (request access) + LinkedIn. Deliberately **excludes** phone number and city-level address — Phase 2 flagged both as an unnecessary privacy exposure; footer contact is email + LinkedIn + the working contact form only.

## Content visibility states

Every project/article carries one of the states defined for Phase 12: **Public / Recruiter-only / Private / Draft / Archived.** IA implication: cards for Recruiter-only or Private items show a lock icon and "Request access" instead of a normal link when viewed without permission — the Work grid and Private Portfolio page share this same locked-card pattern rather than inventing a second one.

## User flows (mapped from Phase 4 personas onto actual routes)

**Recruiter — fast scan (target: under 90 seconds)**
`Home (hero proves title/seniority in first view) → clicks "Recruiter Mode" → /recruiter (condensed: title, years, top 3 projects, resume, contact) → downloads resume and/or → /contact (functional form, fixes the Phase 2 critical bug) → done`
Alt entry: arrives directly at a shared `/recruiter` link from a job application, skipping Home entirely.

**Hiring manager — deep read**
`Arrives via a shared link straight to /work/[project-slug] → reads Context → Problem → Process/Decisions → Outcome → Reflection → sees an inline testimonial tied to that specific project → clicks a related project → visits /about to corroborate leadership claims → checks /resume for career-timeline consistency (Phase 2's overlapping-dates issue must be resolved before this flow can succeed) → returns to /contact`

**VP Design / executive — 2-minute impression**
`Home → /about (point-of-view intro + leadership-scope stats: team size, mentees) → /writing (skims one article for a real opinion, not just deliverables) → optionally /work for one flagship case study → forms an impression; contact typically happens through an intermediary (recruiter/hiring manager), not directly`

**Private/NDA stakeholder**
`Given a direct /private link, or hits a locked card on /work → requests access (email/magic-link) → gains temporary access → views the gated case study`

**Content owner (Muthukumar, via Phase 11 CMS)**
`Logs into /admin → creates/edits a project or article → sets visibility state → publishes → item appears immediately in /work, /writing, /recruiter, and/or /private depending on the state set`

## Page-level content hierarchy

**Home** — Hero (real project artifact + title/seniority stated plainly, per Phase 3's "proof not promise") → Featured work (2–3 projects, uniform-card grid) → About teaser with one leadership stat → Writing teaser (once articles exist) → one testimonial highlight → footer CTA (Contact + Resume).

**Work index** — Filter/tabs (All / Case Studies / Research / Presentations / Branding) → uniform-aspect-ratio card grid (role · type · tools metadata, matching the Phase 3 Airbnb-grid reference) → locked-card treatment for gated items → graceful empty state for filters with little content early on (e.g., Research/Branding at launch).

**Project detail** — Hero (title, role, company/context, timeframe, tools) → Context → Problem → Process & Decisions (real artifacts, not the currently-blank gallery from Phase 2) → Outcome (a metric wherever honestly possible) → Reflection → inline project-linked testimonial if one exists → related projects → Contact/Resume CTA. Every project uses this exact template — no exceptions, no external-file-only case studies (directly closes the Phase 2 finding that two of four projects only exist as OneDrive/Slides links).

**About** — point-of-view intro (replacing the current generic boilerplate) → career narrative → leadership-scope stats module → Awards module → Testimonials module → link to Resume.

**Resume** — corrected career timeline (no overlapping dates) → stats → on-domain PDF download (replacing the external Google Drive link) → each role links to the case studies produced during it.

**Writing index/detail** — simple chronological list → article body → short author bio → related project link.

**Contact** — a real, functional form (name, email, subject, message) plus direct email and LinkedIn — no publicly listed phone number or street-level address.

**Recruiter Mode** — single-scroll condensed page: title/seniority line, 3 tightest project previews, resume download, contact button. No footer clutter, no secondary nav — built for the 30–90 second read.

**Private Portfolio** — access-gated list of NDA/private projects using the same locked-card pattern as Work; access request flow, then normal project-detail template once unlocked.

**Admin Dashboard** — out of visitor-facing IA entirely; route reserved now, full scope in Phase 11.

---

## Amendment (Phase 9.6 — Architecture Remediation, full rationale in PHASE-9.6-ARCHITECTURE-REMEDIATION.md)

Three gaps found by the Phase 9.5/9.6 review, closed here:

**Admin sub-routes formalized.** Phase 9 built real Overview/Projects/Settings panels in Figma, plus a New Project modal — none of which were reflected back into this IA. Formal sub-routes: `/admin` (Overview), `/admin/projects` (table + New Project flow: Title, Type, Visibility, media upload — see Phase 7 amendment for the full media model), `/admin/settings` (general settings + a **Home page** section: hero headline/subheading, a `stats[]` array of Scope stats, featured-project slots, section toggles). `/admin/articles`, `/admin/testimonials`, `/admin/awards`, `/admin/resume`, `/admin/access-requests` are reserved routes, sidebar-visible but not yet built — full build-out is still Phase 11 scope, this just keeps the IA honest about what already exists.

**Mobile nav collapse specified.** Below the `md` (768px) breakpoint, the 5-item primary nav collapses into a hamburger-triggered slide-out drawer (shadcn/Radix Sheet primitive, already in the approved stack). Recruiter Mode stays visible as a pinned button even when the drawer is collapsed — it doesn't collapse into the drawer with ordinary nav links, consistent with its "distinct from a nav link" treatment elsewhere in this doc. This directly closes the mobile-nav-collapse bug category from the Phase 2 audit before Phase 10 builds the nav component without a spec for it.

**Slug uniqueness rule.** Slugs are unique **globally**, not per Work sub-namespace (project/research/presentation slugs share one namespace), enforced by a DB unique constraint. Reserved words (`research`, `presentations`, `admin`, `private`, `recruiter`) are rejected at creation time to prevent a content slug from colliding with a filter or system route.

**NDA note:** the Private Portfolio flow above already mentions "NDA/private projects" — per the Phase 9.6 backend review, NDA is modeled as an acknowledgment gate orthogonal to the visibility tier (Public/Recruiter/Private/Draft/Archived stays 5 states), not a 6th state. No change needed to the flow as described here; the enforcement mechanism is detailed in the Phase 7 amendment.

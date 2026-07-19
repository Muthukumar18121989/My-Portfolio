# Final Architecture Review (pre-development)

Conducted via a 4-agent Multi-Agent Design Council, each reviewing independently and cross-referencing docs against each other and against the actual live Figma file (not just what the docs claim) — one agent caught and corrected a false premise I'd fed it (see Backend #2 below), which is good evidence this was a genuine adversarial review, not a rubber stamp.

**Council composition:** Information Architecture · Design System · Backend Architecture (CMS schema + auth + project model, reviewed together since they're coupled) · Figma Reality Check (connected live to the Figma file, read-only)

**Verdict up front:** the core structure is sound — sitemap, personas, and 5 of 6 Phase 2 audit findings are genuinely closed. But there are real gaps that need a decision now, before Phase 10 builds a component library and Phase 11 builds a CMS on top of what exists today. Full findings below, ranked by cost of fixing later.

---

## High severity — schema/architecture decisions needed before Phase 10/11 start

1. **No media table for Phase 12's required file types.** The `projects` table has only a single `cover_image` field. Phase 12 requires embeddable PDF, PPT, Video, Images, Figma, Loom, and Google Drive per project, "no forced downloads." A single scalar can't model that — needs a `project_media` child table (`project_id, media_type, url/storage_path, embed_mode, sort_order`) before any content gets entered, or every project has to be re-entered later. Separately: PPT has no native browser embed — "embedded viewing only" for PPT needs a conversion/viewer strategy, which is an unresolved dependency, not just a schema field.

2. **Private-content access links can't actually be issued or revoked as designed.** `access_requests` has `status` but no `token`, `expires_at`, or `item_type`. Phase 7's own text promises "a scoped, time-limited signed link" — the table as specified can't produce, verify, or revoke one. Flagged independently by both the IA and Backend reviewers, which is a strong signal it's real. Needs either new columns or a separate `access_grants` table before Phase 11 builds the approval flow.

3. **AI Search (Phase 13) has nothing to query.** "Show banking projects," "show Healthcare" require a domain/industry field. Nothing in the schema qualifies — `type` is Case Study/Research/Presentation/Branding, `tools[]` is a toolset. Add `domain`/`industry` (or `tags[]`) to `projects` now, or every piece of content gets manually re-tagged later.

4. **The Form field's error state has no color to bind to.** Phase 6 specifies success/warning/danger tokens for validation states — exactly the bug (non-functional contact form) this whole rebuild exists to fix. The real Figma variable collection has `good` and `info` but no danger/warning equivalent. Cheap now, expensive after Phase 10 wires every form component to variables.

5. **8 of Phase 6's 10 components don't exist as real Figma components — and even the 2 that do aren't used everywhere.** Only `NavBar` and `Footer` exist as actual reusable components (no variants, no states, empty descriptions). Buttons, cards, badges, form fields, etc. are one-off shapes baked into each screen. Worse: verified directly in the file — **Home, Recruiter Mode, and Admin Dashboard don't even use the NavBar/Footer components** — they have hand-built duplicate nav/footer frames instead, despite Phase 9's own writeup claiming full reuse. Home is the most-trafficked template in the whole system. Phase 10 will have to detach-and-rebuild large parts of the file rather than extend it.

## Medium severity — decide now, cheap now vs. costly later

6. **Home page stat model conflicts between docs.** Phase 5 says the home page shows "one leadership stat." What actually got built (and is now editable via the Settings/Home-page panel) is three named Scope stats. Someone needs to pick one shape before it becomes a schema field.

7. **The Admin Dashboard/Settings surface was built in Figma but never folded back into the Phase 5 IA.** If Phase 11's CMS gets scoped from Phase 5 alone, it will contradict what's already designed and approved.

8. **No "Skills" entity**, despite Phase 11 explicitly naming it as its own editable content type. Not embedded anywhere, not a separate table — just missing.

9. **No reusable media library table** — Phase 11 lists "Media" as its own editable type; only per-content media fields exist (and even those are incomplete, per #1).

10. **The access-request form (public, unauthenticated) has no rate-limiting or anti-enumeration protection** — as built, it could be spammed, or probed to learn which private project titles exist via response differences.

11. **Typeface pairing quietly collapsed to a single family** (Inter for both display and body) in the approved Figma mockups, undermining the "one confident typographic move" principle from Phase 3/6. Risk: "Phase 14 picks real fonts" becomes a cosmetic font-swap instead of a real revisit of the pairing decision, since nothing forces the conversation.

12. **Token contrast ratios were never numerically checked** against the actual locked color values (teal accent, status pill colors), despite Phase 6 requiring 4.5:1/3:1 AA contrast. These exact values are now bound across 9 screens and 2 components — cheaper to check now than after Phase 10 builds on them.

13. **Mobile nav collapse behavior is unspecified** — 5 nav links + a persistent Recruiter Mode button + a search icon slot, with no stated behavior below the point they stop fitting. This is precisely the category of bug (no mobile nav fallback) that broke the original site in Phase 2.

14. **No slug-uniqueness/reserved-word rule** across `/work/[project-slug]`, `/work/research/[slug]`, `/work/presentations/[slug]` — e.g. a case study literally titled "Research" would collide with a filter route.

15. **The Figma Cover page is completely empty** — no title, index, or version stamp, despite being the first thing anyone opens and despite Phase 8 explicitly speccing it.

16. **Zero in-file documentation in Figma** — no annotations, no component descriptions, no changelog. All guidance lives only in these external markdown files; a future collaborator opening just the Figma file has no onboarding at all.

17. **`good` and `info` color variables exist in the real file with no formal spec in Phase 6** — an undocumented extension Phase 10 would build against without a defined role or contrast target.

## Low severity / cosmetic

18. Branding has a filter tab in the Work index but no distinct URL segment (lives under `/work/presentations/[slug]`) — functionally fine, slightly confusing naming.
19. Featured-project count is inconsistent between docs (Phase 5 says "2–3", Phase 9 built exactly 3 slots) — trivial to reconcile.

---

## Recommended next step

Before Phase 10 (component library) starts, resolve at minimum the 5 High-severity items — they're the ones that turn into rework (schema migrations, re-tagging content, detach-and-rebuild in Figma) if deferred. The Medium items are cheap to decide now and expensive to retrofit once content exists; worth a pass but not necessarily blocking.

**Waiting for your approval before doing anything else** — this review produced findings only, no changes were made to any file, doc, or the Figma file itself.

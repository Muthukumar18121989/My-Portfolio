# Phase 4 — Product Strategy

Builds directly on the gaps found in [PHASE-2-FRAMER-AUDIT.md](PHASE-2-FRAMER-AUDIT.md) and the direction set in [PHASE-3-COMPETITOR-BENCHMARK.md](PHASE-3-COMPETITOR-BENCHMARK.md).

## Vision

A single, permanent home for Muthukumar's design work and thinking — one that gets more valuable every year instead of being rebuilt from scratch every few years. Where the current Framer site is a static brochure that happens to list projects, this platform is infrastructure: every new project, talk, article, or award has a place to live the day it happens, in a system built to hold 10+ years of output without needing to be re-platformed.

## Goals (in priority order)

1. **Win the first 90 seconds.** A recruiter or hiring manager scanning dozens of portfolios decides to keep reading (or doesn't) almost immediately — the hero, the first case study preview, and the nav have to prove seniority and clarity instantly. This is the direct fix for the current site's generic hero and broken mobile experience.
2. **Prove senior/leadership-level thinking, not just visual output.** At 10+ years and titles like "Lead UX Designer," the bar isn't "can this person use Figma" — it's judgment, process, stakeholder navigation, and business outcomes. Case studies need to carry that weight (fixes the thin, marketing-toned write-ups flagged in Phase 2).
3. **Make the site itself a portfolio piece.** For a UX/design leadership candidate, the platform's own UX, performance, and craft are evaluated as evidence of skill — not just the projects it describes. A broken contact form or a mobile layout that doesn't render is a worse signal than any individual case study is a good one.
4. **Support content growth without re-architecting.** Research, Branding, Presentation Design, Articles, Awards, and Recruiter Mode (Phase 5 IA) all need to slot into the same system as Projects, on day one of the CMS (Phase 11) — not bolted on later.

## Personas & journeys

### 1. Recruiter (external or in-house talent partner)

**Context:** Screening 20–50 profiles a day, often against a job req checklist. Spends 30–90 seconds on a portfolio before deciding "advance" or "pass." Frequently on a laptop between calls, sometimes on a phone.

**What they need fast:** current/most recent title and seniority, years of experience, 2–3 recognizable project types or company names, a way to grab the resume, and a way to reach the candidate.

**Journey:**
`Land on home → scan hero for title/seniority (2–3s) → glance at 2–3 featured projects (10–15s) → check Resume/Experience for dates and company names (15–20s) → download resume or hit Contact → done`

**What breaks this today:** mobile hero not rendering at all (Phase 2 finding #2), contact form not working (Phase 2 finding #1), resume behind an external Google Drive link, no clear "years of experience / current availability" signal above the fold.

**Design implication:** a "Recruiter Mode" view (per original IA) that surfaces exactly this — title, years, top 3 projects, downloadable resume, contact — with nothing else competing for attention.

### 2. Hiring Manager / Design Lead (the person who'd actually manage this hire)

**Context:** Fewer profiles than a recruiter, but goes deeper into 3–5 finalists. Reads at least one full case study end-to-end. Actively looking for how the candidate thinks, not just what they shipped.

**What they need:** the problem framing, the process (research → decisions → trade-offs), evidence of collaboration with engineering/PM/stakeholders, and a defensible outcome — ideally with a metric, even a modest one.

**Journey:**
`Land on a specific project (often via a shared link, not the home page) → read Context/Problem → skim Process for how decisions got made → look for their own reflection on what they'd do differently → check Skills/Testimonials to corroborate → decide whether to bring to next round`

**What breaks this today:** two of four projects have no on-site case study at all (external OneDrive/Slides links per Phase 2), the ones that do exist mix marketing language with thin process detail, testimonials page has one unverifiable quote from an unlisted employer, skills are all rated "Expert" uniformly (reads as ungraded, not credible).

**Design implication:** every project needs a consistent case-study framework (Context → Problem → Process/Decisions → Outcome → Reflection) hosted natively on the platform, no exceptions, no external file bounce-outs.

### 3. VP Design / senior executive stakeholder

**Context:** The least time of the three, but the highest-leverage read — often only sees the portfolio if a hiring manager already advanced the candidate, sometimes just skims one project and the About/Resume. Evaluating "would this person operate credibly at a leadership level," not craft detail.

**What they need:** evidence of team leadership and mentorship (already present in the resume — "mentored 15+ designers," "mentored designers, strengthened design system" — but currently buried in bullet lists), a point of view on design as a function/business lever (currently absent — About page is generic), and signals of scope (team size, org level, cross-functional reach).

**Journey:**
`Skim About or a single flagship case study → look for leadership/scope language → check for any thought-leadership content (articles, talks) → form an impression in under 2 minutes`

**What breaks this today:** About page reads as generic boilerplate with no distinctive point of view; there's no Articles/thought-leadership content yet at all (planned in original IA but not built); leadership scope (team size, mentee count) isn't surfaced anywhere prominent.

**Design implication:** About page needs an actual point of view, not template copy; an Articles section (even a small one to start) gives this persona something to evaluate beyond project output; leadership metrics (team size, mentees, org scope) deserve a visible, consistent placement — not just a resume bullet.

### 4. (Secondary) Content owner — Muthukumar himself, via the future CMS

Not a visitor-facing journey, but worth naming now since it shapes Phase 11: needs to add a new project, article, or award without touching code, and needs confidence that public/private/recruiter-gated visibility is easy to control per item. Scoped in full at Phase 11 — flagged here so IA (Phase 5) and CMS model design don't diverge later.

## Brand strategy

**Positioning:** Not "a UX designer's portfolio" — a working demonstration of how a design leader thinks, builds, and operates, presented as a platform rather than a document.

**Tone of voice:** Direct and evidence-led, not marketing-toned. Phase 2 flagged the current case studies for brochure phrasing ("cutting-edge AI," "modernize their legacy financial infrastructure") — the rewrite should favor specific, falsifiable statements (what was the actual constraint, what was actually decided, what actually changed) over adjectives.

**Visual brand pillars** (from Phase 3 synthesis, to be formalized into tokens in Phase 6):
- Proof over illustration — real artifacts in hero and project moments, not stock imagery
- One confident typographic move, applied consistently, not mixed per page
- Generous whitespace as a signal of confidence, not unfinished-ness
- Motion that's restrained and purposeful (reveals, hover state) rather than decorative

**Differentiation:** most design portfolios either over-invest in visual flourish with thin process narrative, or over-invest in process documentation with dated visual craft. The goal here is both at once — which is exactly what "Design OS" as a positioning implies: a system, not a slide deck.

## Content strategy

**Content pillars**, mapped to the IA sections from the original brief:
- **Projects** — the core proof; every project follows the same case-study framework; public vs. recruiter-gated vs. private set per project (see Phase 12)
- **Research** — standalone artifacts (research plans, synthesis, journey maps) that don't belong inside a single project case study
- **Presentation Design & Branding** — visual craft samples where the "problem" is the deliverable itself, not a product outcome
- **Articles** — thought leadership for the VP Design persona; can start small (1–2 pieces) and grow
- **Resume** — always current, hosted natively (not an external Drive link), with the date-overlap issue from Phase 2 corrected
- **Awards / Testimonials** — corroborating evidence; testimonials need to be real, attributable, and ideally linked to a specific project

**Editorial rule for the project rewrite** (directly actioned from your note that the Framer projects need rewriting): every case study gets Context → Problem → Process/Decisions → Outcome → Reflection, hosted on-platform. No case study ships as an external-file link only.

**Cadence:** for a decade-scale platform, content doesn't need to ship all at once — Projects and Resume are launch-blocking; Research, Articles, Awards can roll in post-launch as a standing cadence rather than a one-time sprint.

## Success metrics

No analytics exist today (confirmed in Phase 2), so the first 90 days post-launch establish the baseline rather than hit a target. Metrics to track from day one:
- **Functional baseline:** contact form submission rate (currently impossible — it doesn't work), resume download count, recruiter-mode unlock/access requests
- **Engagement:** average time on a case study page, scroll depth on flagship projects, mobile vs. desktop traffic split (currently unmeasurable — mobile is broken)
- **Funnel:** home → project → contact conversion rate; project → resume download rate
- **Outcome (lagging, self-reported):** interview requests attributable to the site, explicitly asked when a new interview process starts ("how did you find this portfolio")

## Next (Phase 5, pending your go-ahead)

Information architecture: sitemap, navigation structure, user flows, and content hierarchy for Projects, Research, Presentation Design, Branding, Articles, Resume, Awards, Testimonials, Recruiter Mode, Private Portfolio, and Admin Dashboard — built directly on the personas and journeys above.

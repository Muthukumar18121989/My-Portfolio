# Phase 2 — Audit: muthukumaruxdesigner.framer.website

Method: live browser testing (Playwright) at desktop 1440px, mid-width 929px, and mobile 390px, plus DOM/network inspection across Home, About, Skills, Projects (+ TwinX case study), Resume, Testimonials, Contact. This is a findings report only — no redesign.

## Critical bugs (fix regardless of any redesign)

1. **Contact form is fake — it has zero functionality.** The "Full Name / Email / Subject / Message / Send Message" block on `/contact` has no `<form>`, no `<input>`, no `<textarea>`, no `<button>` in the DOM at all. It's styled shapes that look like a form. A visitor cannot type into it or submit it. This is the site's one conversion action and it doesn't work.
2. **Site is effectively broken below ~1024px width — no responsive breakpoints.** Framer is rendering a single fixed desktop layout at every viewport. At 929px wide, the hero heading ("Muthukumar") runs off the right edge of the screen. At mobile width (390px), the entire nav and all hero content (headline, role, tagline, both CTA buttons) are pushed off-canvas to the right — the page looks blank except for the logo and background photo. Confirmed via bounding-box inspection: all this content sits at x≈500–850px regardless of a 390px viewport. Anyone opening this site on a phone sees a near-empty page.
3. **7 of 16 images fail to load on the TwinX case study page**, including the entire "UI Mockups & Prototypes" gallery (4 large screenshots render as blank white boxes) and 3 other supporting images. The image files themselves return HTTP 200 when fetched directly, so the assets exist — this is a rendering/lazy-load failure on the page, not missing files.

## SEO

- Page `<title>` is the Framer default **"My Framer Site"** on every page — never customized. Same generic string is used for the Open Graph title, so link previews shared on LinkedIn/Slack/email will show "My Framer Site," not your name or role.
- Meta description is the default **"Made with Framer"** on every page.
- No Open Graph image — shared links get no preview thumbnail.
- Zero `<h1>` elements anywhere on the site (headings are styled `<p>` tags). No real heading hierarchy for search engines or screen readers to parse.
- `<html>` has no `lang` attribute set.
- Case study project URLs have an inconsistent/typo'd slug (`euroclear-casetudy`, missing an "s").

## Mobile experience

Covered above as a critical bug — worth restating as its own category since it's the single biggest gap. There is currently no usable mobile experience: no visible nav (no hamburger fallback), no visible hero, no way to reach Projects without already knowing the URL path. Given recruiters frequently do a first pass on mobile, this likely costs first impressions today.

## Recruiter / hiring-manager experience

- Two of four featured case studies ("TwinX" and "Euroclear Bank") don't have their full write-up on-site — their "View Case Study" link bounces the visitor out to a OneDrive PowerPoint viewer and a Google Slides deck respectively. This breaks the browsing flow, depends on external file permissions staying open, won't match the site's look/feel, and is unreadable on mobile.
- On the TwinX card specifically, the whole card is also a link to an on-site case study page (`/twinx-casestudy`) while a nested "View Case Study" link inside it points to the external OneDrive file — two overlapping links with different destinations on the same card is confusing (and `<a>` inside `<a>` is invalid HTML).
- Resume page links out to a Google Drive share link for the PDF rather than hosting the file on-domain — adds a dependency on Drive sharing settings staying public, no control over presentation, no download analytics.
- Contact page publicly lists a personal mobile number and full city-level home address (India, Tamil Nadu, Chennai - 600002). Recruiters don't need street-level location, and publishing a phone number publicly invites spam/cold calls. Worth a deliberate decision here, not an accident.
- Email listed is a personal Hotmail address rather than a custom-domain address — minor, but reads less polished for a "Lead UX Designer" positioning next to a bank and an AI platform case study.

## Content & storytelling

- Resume shows **overlapping employment dates**: "Assistant Associate, TATA Consultancy Services" (2021–2024) and "Senior Business Presentation Specialist, McKinsey Global Services" (2015–2024) overlap for three years. Either this is intentionally concurrent work worth explaining, or it's a data error — as-is it will read as a credibility flag to anyone cross-checking against LinkedIn.
- Skills page rates every single tool — Figma, Adobe Creative Suite, PowerPoint, Photoshop, Illustrator, Adobe XD — as "Expert," with no gradient. Reads as unconsidered/templated rather than an honest self-assessment; some variation (or dropping the label entirely) would be more credible.
- Testimonials page has exactly **one** testimonial, from "Sarah Chen, Product Manager, TechFlow Solutions" — "TechFlow Solutions" doesn't match any employer named on the resume (TCS, McKinsey Global Services, Scope E-Knowledge Center, Santhi Enterprises). If this is placeholder/sample content left over from a template, it should either be replaced with a real quote or removed — an unverifiable single testimonial from an unrelated company is a bigger risk than having none.
- About/Skills copy is generic boilerplate ("passionate about creating meaningful digital experiences that solve real problems," "empathy, simplicity, continuous learning") — could describe almost any designer, doesn't differentiate you.
- **You've already flagged that the project write-ups themselves need a rewrite** — confirmed while reading them: the TwinX and Euroclear case studies mix marketing-brochure phrasing ("cutting-edge AI," "modernize their legacy financial infrastructure") with thin process detail, and two of four projects have no on-site narrative at all (see recruiter-experience section above).

## Visual design / UI / typography

- Visual style is clean and minimal (generous whitespace, a consistent blue accent, consistent card layout on Projects) — this is a genuine strength to preserve conceptually even if rebuilt.
- The bottom-right "Made in Framer" badge is visible on every page — signals a free-tier site rather than a custom platform, which undercuts the "premium enterprise platform" positioning you're going for.
- No dark mode.
- Home hero has a lot of dead whitespace at wide desktop widths (1440px+) — content column doesn't scale with viewport, it just sits in a fixed-width block with growing empty margins.

## Performance

- Not able to get a full Lighthouse-equivalent trace in this pass, but the confirmed image-loading failures on the case study page (large, unrendered assets still being requested) and reliance on external heavy viewers (OneDrive/Google Slides embeds) both work against load time and perceived performance. Worth a proper performance pass once the rebuild has a real page to measure.

## What's actually working (keep the intent, not necessarily the implementation)

- Clear, sensible information architecture already exists: Home, About, Skills, Projects, Testimonials, Resume, Contact — this maps well onto the IA you specified for the Design OS (Phase 5) with room to add Research, Branding, Presentation Design, Articles, Awards, Recruiter Mode.
- Project cards on `/projects` show role, project type, and tools per project — decent metadata pattern worth carrying forward.
- Resume page's timeline format with "Key Achievements" bullets per role is a reasonable structure to keep.
- Visual language (whitespace, single accent blue, card-based layout) is a clean starting point, not something that needs to be thrown out — it needs to be made responsive, real, and on-brand rather than reinvented from scratch.

## Net takeaway

The IA and visual direction are reasonable starting points. Everything else — working contact form, actual mobile support, real case study content on-domain (not external file links), SEO basics, and content accuracy (dates, testimonials, skill ratings) — needs to be rebuilt from the ground up. This lines up with treating the new platform as a full rebuild (Phases 4 onward) rather than a reskin.

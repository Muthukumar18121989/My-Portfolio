# Phase 3 — Competitor Benchmark

Method: live screenshots (desktop, 1440px) of each product's current homepage via browser automation, taken today, not recalled from memory. Supplemented with 21st.dev component search for concrete, buildable pattern references. This is a benchmark report only — nothing here is copied; it's synthesized into an original direction at the end.

## What each one does differently

**Linear** — dark theme, oversized flush-left headline in a single confident sans weight, and — the key move — the hero's "proof" is a real, live-looking product screenshot (an issue view with an AI agent thread active) sitting directly under the headline, not an illustration. Minimal top nav (6 text links + 2 buttons). Motion is restrained; the product screenshot does the persuading.

**Vercel** — light theme, huge asymmetric layout: headline pinned far left, a single black triangle (the logo, blown up) as the only "illustration," and a monospace three-line label sitting isolated on the right third of the screen. Customer logo bar directly under the fold. Confidence expressed through emptiness — most of the viewport is intentionally blank.

**Stripe** — a full sentence (not a punchy fragment) as the headline, with two-tone color coding to draw the eye to specific phrases ("your revenue," "services and... from your first transaction to your billionth"). Behind it, a signature diagonal gradient-mesh brand asset. A live-updating stat ("Global GDP running on Stripe: 1.678...%") sits above the headline as a credibility device. Auto-scrolling logo marquee.

**Notion** — the most human/playful of the set: hand-drawn character avatars floating above the headline, a headline built from mixed weights with one word ("Ship") called out in a colored pill/badge rather than just bold text, and the hero's proof is a product screenshot inside a literal browser-chrome frame. Logo wall at the very bottom.

**Arc / Dia** — the boldest color use of the group: saturated solid blue sections separated by a torn/scalloped edge (a genuine textile-inspired texture detail, not a straight line), a serif display headline (unusual for a tech product — reads more editorial/warm), and a rounded floating app-window screenshot as the centerpiece.

**Figma** — left-aligned headline paired with a physically layered collage of real canvas artifacts (a poster, a mobile UI, a fitness dashboard) fanned out at slight rotations and depths — it's literally showing you the product's actual output as the hero art rather than an abstract illustration.

**Airbnb** — the enduring pattern here isn't the homepage chrome (which is promo-heavy when logged out) but the two structural ideas worth stealing: the single combined "Where / When / Who" pill-shaped search control, and the browsable card grid — uniform aspect-ratio photo, favorite-heart overlay, rating badge, price line — repeated at scale. This is the closest reference for how a Projects grid should feel at a glance.

**Apple** — product-as-hero photography (studio-lit, multiple angles/colorways fanned out), centered minimal type, tiny top nav, and a "one full-bleed story per scroll" rhythm — each section is a complete visual statement before the next begins.

**Framer** — dark theme with an actively glowing-border AI prompt box as the primary hero interaction instead of a static CTA button, quick-suggestion chips beneath it, and the product's live canvas editor teased just below the fold. The hero itself argues "type what you want" rather than "click here to learn more."

## Cross-cutting patterns (seen in most/all of them)

1. **The hero's proof is real product output, not decoration.** Linear, Notion, Figma, Framer, and Arc all put an actual (or actual-looking) screenshot, canvas, or artifact in the hero — never generic stock illustration.
2. **One confident headline treatment per brand, not a mix.** Each site picks exactly one typographic move (Linear: scale; Stripe: sentence + color-coding; Notion: mixed-weight + pill callout) and doesn't combine several tricks at once.
3. **Restrained top nav.** 4–8 text links max, one or two buttons. None of them try to fit a full sitemap into the header.
4. **Negative space is used as a status signal.** Vercel and Apple in particular use emptiness deliberately — it reads as confidence, not as an unfinished page.
5. **Logo walls / social proof sit immediately below the fold**, not buried lower on the page.

## Concrete buildable references (21st.dev)

Pulled as grounding for what's actually implementable with the stack decided in Phase 7 (shadcn/ui + Tailwind + Framer Motion), not final picks:
- Hero patterns: animated blur-in hero with profile overlay, staggered-text hero with scroll indicator ([21st.dev search: "portfolio hero section"](https://21st.dev))
- Project/case-study grid: bento-grid case-study block, hover-zoom project card, staggered-animation card grid ([21st.dev search: "case study project card grid"](https://21st.dev))
- Navigation: floating navbar that hides on scroll/reveals on scroll-up, glass-style floating header with mobile drawer ([21st.dev search: "minimal sticky navigation bar"](https://21st.dev))

These confirm the patterns below are buildable with off-the-shelf shadcn-compatible primitives, not bespoke engineering.

## Synthesized direction for this Design OS (a point of view, not a locked design system — that's Phase 6)

Don't copy any single site. The synthesis:

- **Hero = proof, not promise.** Like Linear/Figma/Framer: the hero should show actual case-study artifacts (a real screen, a real diagram) near the headline, not an illustration or stock photo — directly fixes the current Framer site's generic desk-illustration hero.
- **One typographic move, not five.** Pick a single signature headline treatment (e.g., one accent color used consistently, the way Stripe two-tones its sentence) rather than mixing bold/italic/color/size tricks per page, which the current site does inconsistently.
- **Confident whitespace over dense sections.** Current site cramming everything into fixed-width blocks is the opposite of the Vercel/Apple restraint — more breathing room, especially on Projects and case study pages.
- **A real Projects grid, Airbnb-style.** Uniform card aspect ratio, consistent metadata line (role · type · tools), hover state — replacing the current inconsistent card treatment and the external OneDrive/Slides bounce-outs.
- **Nav stays small even as content grows.** With Research, Branding, Presentations, Articles, Awards, Recruiter Mode all planned (Phase 5), don't grow the top nav to 10+ links — group under 4–6 top-level items with sub-navigation, the way Vercel/Notion/Figma handle large product surfaces.
- **Motion is restrained and purposeful**, not decorative — scroll-triggered reveals and hover states (Framer Motion, per Phase 7 stack), not constant animation.

## Next (Phase 4, pending your go-ahead)

Product strategy: vision, personas (recruiter / hiring manager / VP design journeys), brand strategy, content strategy, success metrics — building directly on the gaps found in Phase 2 and the direction above.

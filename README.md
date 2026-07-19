# Muthukumar D — Portfolio

A premium, minimal UX/UI designer portfolio built with Next.js, TypeScript, and Tailwind CSS. Static, no backend — every route is prerendered at build time.

## Stack

- **Next.js 16** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` tokens) + **shadcn/ui** primitives (Radix)
- **Motion** (`motion/react`) for subtle scroll-reveal and reduced-motion-aware transitions
- **Lucide** icons
- No database, no auth, no CMS — all content lives in [`src/lib/content/`](src/lib/content/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (static export of every route) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run storybook` | Component library preview (optional — not required to run the site) |

## Editing content

Everything a recruiter would read — bio, stats, skills, career timeline, case studies, contact links — is plain TypeScript data, not hardcoded into pages:

- `src/lib/content/profile.ts` — name, summary, philosophy, stats, skills, social links
- `src/lib/content/experience.ts` — career timeline
- `src/lib/content/projects.ts` — case studies (each project page is generated from this file via `generateStaticParams`)

Pages under `src/app/` read from these files; editing content never requires touching page markup.

## Known placeholders (fill in before shipping)

- **Case study hero art** — each `/projects/[slug]` page uses original, hand-built SVG cover art (`src/components/patterns/case-study-hero-art.tsx`) instead of a real product photo, since the underlying platforms (TwinX, Euroclear Bank) are enterprise/NDA products with no shareable hero shot.
- **Application Screens** — the screenshot galleries on both case studies were carried over from the previous Framer portfolio's TwinX and Euroclear case study pages (`public/images/projects/`). Two of the four TwinX images were labeled "Dashboard Mockup — Placeholder for main dashboard" on the source site itself, so treat those as illustrative, not literal product screenshots. Personas/Wireframes body copy stays placeholder text, since those artifacts are client-confidential.
- **Behance / Dribbble** — not listed on the source resume, so they're left `null` in `src/lib/content/profile.ts` (`socialLinks`) and simply don't render in the footer/contact page. Fill in real URLs to have them appear.
- **Resume file** — `public/Muthukumar-D-Resume.pdf` is the source resume as provided. Replace it (same filename) whenever the resume is updated; the Resume page and Download Resume buttons reference it directly.
- **Testimonials** — intentionally left as an honest "coming soon" empty state rather than a fabricated quote (the previous site had one unverifiable, unattributed testimonial). Real testimonials can be added as a new section in `src/lib/content/` once sourced.

## Contact form

The contact form (`/contact`) is fully functional client-side (real inputs, real validation) but — since there's no backend — a valid submit opens the visitor's own email client via a pre-filled `mailto:` link rather than posting anywhere. This is disclosed in the form's helper text.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Set the one environment variable used for metadata/OG tags:
   - `NEXT_PUBLIC_SITE_URL` — your production URL (e.g. `https://muthukumar.design`)
4. Deploy. No other configuration or environment variables are required.

## Design tokens & accessibility

Colors, spacing, and motion easings are defined once in [`src/styles/theme.css`](src/styles/theme.css) as CSS custom properties, with dark mode as the default ground and a WCAG 2.2 AA–checked light-mode override (text ≥ 4.5:1, focus rings ≥ 3:1). Theme choice persists in `localStorage` and applies before first paint (see the inline script in `src/app/layout.tsx`) to avoid a flash of the wrong theme. All interactive elements have visible focus rings and respect `prefers-reduced-motion`.

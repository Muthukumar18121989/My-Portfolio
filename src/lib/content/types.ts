export interface TimelineEntry {
  role: string;
  company: string;
  dateRange: string;
  achievements: string[];
  relatedProjects?: { title: string; href: string }[];
}

// --- DB-backed content types (see supabase/schema.sql, src/lib/data.ts) ---

export interface Profile {
  name: string;
  role: string;
  roleLong: string;
  location: string;
  email: string;
  yearsExperience: number;
  heroSummary: string;
  aboutIntro: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
}

export interface PhilosophyItem {
  id: string;
  title: string;
  body: string;
  sortOrder: number;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
}

export interface FunFact {
  id: string;
  content: string;
  sortOrder: number;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
  sortOrder: number;
}

export interface Certification {
  id: string;
  content: string;
  sortOrder: number;
}

export interface Education {
  degree: string;
  school: string;
  dateRange: string;
  detail: string;
}

/** Unified career-timeline row — feeds both the homepage's Career Journey
    (needs the full shape) and /about's Professional Journey (uses a
    subset: role/company/dateRange/achievements). One source, two views. */
export interface CareerEntry {
  id: string;
  company: string;
  initials: string;
  role: string;
  dateRange: string;
  location: string;
  current: boolean;
  summary: string;
  skills: string[];
  responsibilities: string[];
  achievements: string[];
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatarUrl: string | null;
  published: boolean;
  sortOrder: number;
}

export interface SiteSettings {
  resumeUrl: string | null;
  /** Short taglines under the homepage's Career Journey stats. */
  careerTags: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
  /** Set when the real artifact (persona doc, wireframe, screen) isn't cleared for public sharing. */
  placeholder?: boolean;
}

export interface EnterpriseShowcaseCard {
  tag: string;
  title: string;
  overview: string;
  contributions: string[];
  /** Design tools/methods for this card. Omit when not specified rather than inventing a generic list. */
  toolkit?: string[];
  businessImpact: string;
}

export interface Project {
  /** DB row id — used by the admin editor. Public pages key off `slug`. */
  id: string;
  slug: string;
  title: string;
  company: string;
  role: string;
  type: string;
  year: string;
  /** One-line summary used on the project grid card. */
  summary: string;
  featured?: boolean;
  /** "public" shows under the Projects page's Public tab with no gate;
      "private" requires the password toggle to view. */
  visibility: "public" | "private";
  impact: string[];
  /** Enterprise-project showcase: the platform itself plus the business-unit
      modules under it, each as an alternating image/text card. Only used by
      platforms with more than one module worth showcasing (e.g. TwinX). */
  enterpriseShowcase?: EnterpriseShowcaseCard[];
  /** Real hero image (e.g. a device mockup) in place of the abstract SVG hero art. */
  heroImage?: { src: string; alt: string };
  /** Link to a fully-built standalone artifact (e.g. a self-contained concept
      site under /public) that this case study summarizes rather than
      reproduces. Opens in a new tab — it's outside the Next.js app shell. */
  externalUrl?: string;
  externalUrlLabel?: string;
  /** "laptop" frames each screen in a laptop device; "contain" shows the
      image at its natural aspect ratio without cropping (for mobile
      screenshots and process artifacts of varying proportions). */
  screenshotStyle?: "laptop" | "contain";
  /** Heading for the screenshots section. Defaults to "Application Screens" —
      override for projects whose `screenshots` aren't app UI (e.g. hardware
      product renders). */
  screenshotsHeading?: string;
  sections: {
    overview: CaseStudySection;
    problem: CaseStudySection;
    myRole: CaseStudySection;
    research: CaseStudySection;
    personas: CaseStudySection;
    journey: CaseStudySection;
    wireframes: CaseStudySection;
    process: CaseStudySection;
    uiDesign: CaseStudySection;
    decisions: CaseStudySection;
    challenges: CaseStudySection;
    takeaways: CaseStudySection;
  };
  /** Application screens carried over from the previous portfolio's case
      study pages (framerusercontent.com), not fabricated for this site. */
  screenshots: { src: string; caption: string }[];
}

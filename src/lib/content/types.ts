export interface TimelineEntry {
  role: string;
  company: string;
  dateRange: string;
  achievements: string[];
  relatedProjects?: { title: string; href: string }[];
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
  /** "laptop" frames each screen in a laptop device; "contain" shows the
      image at its natural aspect ratio without cropping (for mobile
      screenshots and process artifacts of varying proportions). */
  screenshotStyle?: "laptop" | "contain";
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

import type { TimelineEntry } from "./types";

// Career timeline, most recent first. Dates as stated on the resume — the
// TCS/McKinsey ranges are sequential (Aug 2015–Aug 2024, then Aug 2024–Present),
// not overlapping.
export const experience: TimelineEntry[] = [
  {
    role: "Senior UX Designer (Assistant Associate)",
    company: "TATA Consultancy Services",
    dateRange: "Aug 2024 – Present",
    achievements: [
      "Led end-to-end UX for an enterprise AI platform serving 5+ business units — research with 15+ stakeholders, journey mapping, and high-fidelity prototypes cut task completion time by 30%.",
      "Designed journeys, dashboards, and interaction models for AI-driven workflows across 3 core product modules.",
      "Built and maintained a reusable Figma design system, accelerating design-to-dev handoff by 40%.",
      "Redesigned enterprise dashboards and reporting workflows for a financial infrastructure platform, cutting navigation steps by 35%.",
      "Collaborated with AI coding agents to generate reusable UI components and production-ready interfaces while maintaining design consistency.",
    ],
  },
  {
    role: "Senior UX Designer & Automation Specialist",
    company: "McKinsey Global Services",
    dateRange: "Aug 2015 – Aug 2024",
    achievements: [
      "Designed UX for 10+ enterprise tools and workflow-driven dashboards used by global consulting teams.",
      "Delivered automation-focused workflow redesigns that improved team efficiency by 50% and cut manual effort by 25% across key operational processes.",
      "Produced 100+ visual deliverables — brochures, posters, presentations, and design specs — over a 9-year engagement.",
      "Mentored 5+ junior designers, establishing design review processes adopted team-wide.",
    ],
  },
  {
    role: "Senior Web Analyst",
    company: "Scope E-Knowledge Center",
    dateRange: "Oct 2013 – Aug 2015",
    achievements: [
      "Conducted web analytics to identify usability gaps, delivering redesign recommendations that improved content discoverability and session engagement.",
    ],
  },
  {
    role: "Electrical Engineer",
    company: "Santhi Enterprises",
    dateRange: "Jun 2011 – Oct 2013",
    achievements: [
      "Started here, before design — an engineering foundation in systems thinking that still shapes how I approach product problems today.",
    ],
  },
];

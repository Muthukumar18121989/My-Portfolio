export interface CareerMilestone {
  company: string;
  /** Short initials used for the placeholder logo badge — no real company
      logo assets are used here. */
  initials: string;
  role: string;
  dateRange: string;
  location: string;
  current?: boolean;
  summary: string;
  skills: string[];
  responsibilities: string[];
  achievements: string[];
}

// Career-only timeline — deliberately excludes client and project names
// (those live in the Projects section). Built strictly from the resume's
// employment history, most recent first.
export const careerJourney: CareerMilestone[] = [
  {
    company: "TATA Consultancy Services",
    initials: "TCS",
    role: "Senior UX Designer (Assistant Associate)",
    dateRange: "Aug 2024 – Present",
    location: "Chennai, India",
    current: true,
    summary:
      "Leading end-to-end UX for enterprise AI and financial-infrastructure products, partnering with global business units to turn complex, data-heavy workflows into interfaces people can actually use.",
    skills: [
      "Figma",
      "Design Systems",
      "Journey Mapping",
      "Interaction Design",
      "Usability Testing",
    ],
    responsibilities: [
      "Led UX strategy for enterprise applications",
      "Conducted research with stakeholders across multiple business units",
      "Designed journeys, dashboards, and interaction models for AI-driven workflows",
      "Built and maintained reusable design systems",
      "Collaborated with cross-functional engineering and product teams",
    ],
    achievements: [
      "Cut task completion time by 30% through usability-tested redesigns",
      "Accelerated design-to-dev handoff by 40% with a shared design system",
      "Reduced navigation steps by 35% in compliance-heavy reporting workflows",
    ],
  },
  {
    company: "McKinsey Global Services",
    initials: "MGS",
    role: "Senior UX Designer & Automation Specialist",
    dateRange: "Aug 2015 – Aug 2024",
    location: "Chennai, India",
    summary:
      "Designed UX for enterprise tools and automation-focused workflow redesigns supporting global consulting teams over a 9-year engagement.",
    skills: ["UX Design", "Workflow Automation", "Visual Design", "Design Mentorship"],
    responsibilities: [
      "Designed UX for 10+ enterprise tools and workflow-driven dashboards",
      "Delivered automation-focused workflow redesigns",
      "Produced high-volume visual deliverables to a consistent quality standard",
      "Mentored junior designers and established design review practices",
    ],
    achievements: [
      "Improved team efficiency by 50% through automation workflow redesign",
      "Reduced manual effort by 25% across key operational processes",
      "Produced 100+ deliverables with zero major revision cycles",
      "Mentored 5+ junior designers",
    ],
  },
  {
    company: "Scope E-Knowledge Center",
    initials: "SEK",
    role: "Senior Web Analyst",
    dateRange: "Oct 2013 – Aug 2015",
    location: "Chennai, India",
    summary:
      "Conducted web analytics to identify usability gaps and shaped content strategy for improved discoverability and engagement.",
    skills: ["Web Analytics", "UX Research"],
    responsibilities: [
      "Conducted web analytics to identify usability gaps",
      "Delivered redesign recommendations",
      "Improved content discoverability and session engagement",
    ],
    achievements: [],
  },
  {
    company: "Santhi Enterprises",
    initials: "SE",
    role: "Electrical Engineer",
    dateRange: "Jun 2011 – Oct 2013",
    location: "Chennai, India",
    summary:
      "Where it started — an engineering foundation in systems thinking that still shapes how I approach product problems today.",
    skills: ["Systems Thinking", "Electrical Engineering"],
    responsibilities: [],
    achievements: [],
  },
];

export const careerStats = {
  years: "10+",
  organizations: String(careerJourney.length),
  tags: [
    "Enterprise UX & Product Design",
    "Global Cross-functional Collaboration",
    "Enterprise SaaS & AI Products",
    "UX Strategy & Design Leadership",
  ],
} as const;

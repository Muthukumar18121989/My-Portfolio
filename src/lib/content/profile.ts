// Content extracted from Muthukumar D's resume, rewritten for a recruiter-first
// read. No claims here beyond what the resume states — see PHASE-2-FRAMER-AUDIT.md
// for why fabricated/unverifiable content (e.g. the old site's single unattributed
// testimonial) is treated as a liability, not a nice-to-have.

export const profile = {
  name: "Muthukumar D",
  role: "UX UI Designer / Product Designer",
  roleLong: "Senior UX Designer — Product Design for Enterprise & Consumer Experiences",
  location: "Chennai, India",
  email: "muthukumar_d@hotmail.com",
  yearsExperience: 10,
  heroSummary:
    "I design intuitive, scalable products across enterprise AI platforms, financial infrastructure, and global consulting — turning ambiguous, data-heavy problems into interfaces people can actually use.",
  aboutIntro:
    "Senior UX Designer with 10+ years of experience crafting intuitive, scalable digital products across enterprise AI platforms, financial infrastructure, and global consulting environments. My focus is end-to-end UX — research, interaction design, Figma prototyping, and design systems — with a track record of reducing user friction, improving task efficiency, and influencing product strategy through data-driven decisions.",
  philosophy: [
    {
      title: "Start from the mental model, not the screen",
      body: "The hardest part of designing for AI-driven, data-heavy platforms isn't the UI — it's figuring out how the people using it already think about the problem. I run research and journey mapping before wireframes, not after.",
    },
    {
      title: "Design systems are a product decision, not a chore",
      body: "A shared, reusable Figma system across an enterprise platform's 3 product modules cut design-to-dev handoff time by 40%. Consistency compounds — it's usually the highest-leverage thing I can build early.",
    },
    {
      title: "Compliance and constraints are design inputs, not obstacles",
      body: "Designing for a regulated financial platform means the interface has to satisfy compliance requirements, not route around them. Structured stakeholder workshops up front save far more time than late-stage rework.",
    },
  ],
} as const;

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/muthukumar1812",
  email: `mailto:${profile.email}`,
  // Not listed on the resume — add real profile URLs here when available.
  behance: null as string | null,
  dribbble: null as string | null,
} as const;

export const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "30%", label: "Task completion time cut through a usability-tested redesign" },
  { value: "40%", label: "Faster design-to-dev handoff via a shared design system" },
  { value: "50%", label: "Team efficiency gained from automation workflow redesign" },
] as const;

export const companies = [
  "TATA Consultancy Services",
  "Euroclear Bank",
  "McKinsey Global Services",
  "Scope E-Knowledge Center",
] as const;

export const skillGroups = [
  {
    label: "Design",
    items: [
      "End-to-end UX Design",
      "User Research & Usability Testing",
      "Interaction Design",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Journey Mapping",
      "Information Architecture",
      "Mobile-first & Responsive Design",
    ],
  },
  {
    label: "Tools",
    items: ["Figma", "FigJam", "Adobe XD", "Miro", "Illustrator", "Photoshop", "Notion", "JIRA"],
  },
  {
    label: "Methods",
    items: [
      "Design Thinking",
      "Agile / Scrum",
      "Stakeholder Facilitation",
      "Design Sprints",
      "Usability Testing",
    ],
  },
  {
    label: "AI Tools",
    items: ["Google Gemini (AI Studio)", "Prompt Engineering", "GCP Vertex AI", "MCP"],
  },
] as const;

/** Flattened, deduped list for the homepage marquee. */
export const marqueeSkills = Array.from(new Set(skillGroups.flatMap((g) => g.items)));

export const certifications = [
  "Certified UX/UI Designer",
  "Silver Certification in Mentorship",
] as const;

export const education = {
  degree: "B.E. in Electrical & Electronics Engineering",
  school: "Rajalakshmi Engineering College, Chennai",
  dateRange: "Jun 2007 – Aug 2011",
  detail: "First Class",
} as const;

export const funFacts = [
  "Started my career as an Electrical Engineer before moving into UX — I still think in systems.",
  "Mentored 5+ junior designers at McKinsey and helped establish design review practices adopted team-wide.",
  "Now pairing with AI coding agents to turn design systems into production-ready interfaces.",
] as const;

import type { Project } from "./types";

// Case study content built strictly from resume facts. Sections marked
// `placeholder: true` cover artifacts (personas, wireframes) that are
// client-confidential and aren't fabricated here — see PHASE-2-FRAMER-AUDIT.md's
// note on not inventing case study specifics.
export const projects: Project[] = [
  {
    slug: "twinx-ai-platform",
    title: "TwinX AI Platform",
    company: "TATA Consultancy Services",
    role: "Senior UX Designer (Lead)",
    type: "Enterprise AI Product",
    year: "2024 – Present",
    summary:
      "End-to-end UX for an enterprise AI platform used across 5+ business units — from research through a scalable design system.",
    featured: true,
    visibility: "private",
    impact: [
      "30% reduction in task completion time, validated through usability testing",
      "40% faster design-to-dev handoff via a shared Figma design system",
      "Design system adopted across all 3 shipped product modules",
    ],
    enterpriseShowcase: [
      {
        tag: "Enterprise Platform",
        title: "TwinX™ — Enterprise Digital Twin Platform",
        overview:
          "TwinX is TCS's enterprise Digital Twin platform: it lets organizations simulate business scenarios, visualize complex operational systems, run predictive analysis, and make AI-assisted decisions — as one cross-domain platform serving multiple industries rather than a single-purpose tool.",
        contributions: [
          "Led UX strategy for enterprise applications",
          "Designed end-to-end user journeys",
          "Conducted workflow analysis",
          "Created wireframes and high-fidelity UI",
          "Built scalable enterprise design patterns",
          "Simplified complex business workflows",
          "Collaborated with product managers, developers, and business stakeholders",
          "Designed responsive enterprise interfaces",
          "Improved usability and accessibility",
          "Designed reusable interaction models",
        ],
        toolkit: [
          "Figma",
          "FigJam",
          "Design Systems",
          "Wireframing",
          "Prototyping",
          "Interaction Design",
          "UX Research",
          "Accessibility",
          "Information Architecture",
          "Journey Mapping",
          "Design Tokens",
          "Component Library",
        ],
        businessImpact:
          "Designed a unified enterprise experience that simplified complex workflows, reduced user effort, improved navigation, increased operational efficiency, and enabled scalable UX across multiple business domains.",
      },
      {
        tag: "Design System",
        title: "Enterprise Design System",
        overview:
          "The design system underpinning every TwinX module: a component library, design tokens, typography and color system, accessibility standards, and interaction patterns — documented and governed so new modules could adopt it rather than reinvent it.",
        contributions: [
          "Created reusable components",
          "Designed scalable UI patterns",
          "Defined interaction behaviors",
          "Established accessibility guidelines",
          "Created design documentation",
          "Built responsive layouts",
          "Standardized enterprise experiences",
          "Reduced design inconsistencies",
          "Accelerated product delivery",
        ],
        toolkit: [
          "Figma",
          "Auto Layout",
          "Variants",
          "Design Tokens",
          "WCAG",
          "Component Library",
          "Prototype",
        ],
        businessImpact:
          "Reduced design debt, improved consistency, accelerated product development, and improved cross-team collaboration.",
      },
      {
        tag: "Retail",
        title: "Retail Analytics Dashboard",
        overview:
          "An enterprise dashboard helping retail business units monitor performance, promotions, KPIs, operational insights, inventory, and sales trends within the TwinX platform.",
        contributions: [
          "Conducted stakeholder interviews",
          "Mapped retail workflows",
          "Designed dashboard hierarchy",
          "Improved information architecture",
          "Designed KPI visualization",
          "Reduced cognitive load",
          "Optimized filtering experience",
          "Improved responsive layouts",
        ],
        businessImpact:
          "Enabled faster business decisions through intuitive data visualization and simplified analytics.",
      },
      {
        tag: "Supply Chain",
        title: "Supply Chain Operations Dashboard",
        overview:
          "A UX solution for monitoring logistics, warehouse operations, inventory movement, supplier performance, and operational efficiency across the supply chain business unit.",
        contributions: [
          "Workflow optimization",
          "Dashboard UX",
          "Task prioritization",
          "Process visualization",
          "Interaction design",
          "Responsive experience",
        ],
        businessImpact: "Improved operational visibility and reduced workflow complexity.",
      },
      {
        tag: "Telecom",
        title: "Telecom Operations Platform",
        overview:
          "An enterprise dashboard for monitoring telecom assets, network performance, field operations, customer insights, and service health.",
        contributions: [
          "Complex workflow mapping",
          "Dashboard UX",
          "Visual hierarchy",
          "Information architecture",
          "Real-time monitoring UI",
          "Responsive enterprise experience",
        ],
        businessImpact: "Simplified operational monitoring and improved decision making.",
      },
      {
        tag: "Healthcare",
        title: "Healthcare / Pharma Platform",
        overview:
          "Enterprise workflows supporting pharmaceutical experiments, healthcare operations, configurable business processes, and analytical dashboards — drawing on healthcare-domain enterprise work where client specifics stay confidential.",
        contributions: [
          "Workflow optimization",
          "Configurable UI",
          "Data visualization",
          "Form UX",
          "Accessibility",
          "Reusable components",
        ],
        businessImpact:
          "Reduced operational complexity and improved usability for healthcare professionals.",
      },
      {
        tag: "Generative AI",
        title: "AI Assistant & Enterprise Copilot",
        overview:
          "A conversational AI interface letting enterprise users retrieve business insights using natural language — designed for trust and transparency, not just conversational novelty.",
        contributions: [
          "Conversation flows",
          "Prompt UX",
          "Interaction design",
          "AI response patterns",
          "Chat experience",
          "Context-aware interfaces",
          "AI usability",
          "Designing trust and transparency",
        ],
        toolkit: ["Google Gemini (AI Studio)", "GCP Vertex AI"],
        businessImpact:
          "Reduced user effort and improved productivity through AI-assisted workflows.",
      },
    ],
    screenshotStyle: "laptop",
    sections: {
      overview: {
        heading: "Overview",
        body: "TwinX is TCS's enterprise AI platform, built to bring AI-driven workflows to 5+ business units under one coherent product experience. I led design from early research through a production-ready design system, embedded daily in an agile squad alongside PMs and engineers.",
      },
      problem: {
        heading: "Problem",
        body: 'Each business unit arrived with different, data-heavy, ambiguous requirements for what "using AI" inside the platform should even mean. There was no shared mental model of the product across the teams it needed to serve.',
      },
      myRole: {
        heading: "My Role",
        body: "Senior UX Designer (Lead) — owned discovery, journey mapping, dashboard and interaction design, and the design system used across all 3 shipped modules.",
      },
      research: {
        heading: "Research",
        body: "Ran structured research and interviews with 15+ stakeholders across the 5+ business units to surface where each group trusted AI output, where they wanted to verify it, and where existing workflows had to be preserved rather than replaced.",
      },
      personas: {
        heading: "Personas",
        body: 'Persona artifacts from this engagement are internal TCS deliverables and aren\'t cleared for public sharing. In practice, research converged on distinct mental models per business unit rather than one universal "AI user."',
        placeholder: true,
      },
      journey: {
        heading: "Journey",
        body: "Mapped end-to-end journeys for AI-driven workflows across the 3 core modules, converting ambiguous, data-heavy requirements into a small set of reusable interaction patterns instead of one-off screens per team.",
      },
      wireframes: {
        heading: "Wireframes",
        body: "Wireframe artifacts from this engagement to be added once cleared for public sharing.",
        placeholder: true,
      },
      process: {
        heading: "Design Process",
        body: "Design sprints ran on the agile squad's cadence, with iterative feedback from PMs and engineers and usability testing rounds that directly shaped the final interaction models.",
      },
      uiDesign: {
        heading: "UI Design",
        body: "Built a reusable Figma component library spanning 10+ screens, applied consistently across all 3 modules — the direct driver behind moving design-to-dev handoff from ad hoc to standardized.",
      },
      decisions: {
        heading: "Design Decisions",
        body: "Prioritized one shared design system over per-module custom UI, even at the cost of slower initial velocity. The payoff: a 40% faster handoff to engineering and visual consistency across a platform used by 5+ business units.",
      },
      challenges: {
        heading: "Challenges",
        body: "Reconciling genuinely different mental models across business units without fragmenting the product into 5 disconnected tools, and designing for AI output that's non-deterministic while keeping the interface feel predictable and trustworthy.",
      },
      takeaways: {
        heading: "Takeaways",
        body: "The biggest lever wasn't a single screen — it was the design system. Investing in reusable patterns early paid off in both speed and in the platform feeling like one product rather than 5 unconnected tools.",
      },
    },
    screenshots: [
      { src: "/images/projects/twinx-ai-platform/main-dashboard.png", caption: "Main dashboard" },
      {
        src: "/images/projects/twinx-ai-platform/simulation-builder.png",
        caption: "Simulation builder",
      },
      {
        src: "/images/projects/twinx-ai-platform/ai-chat-interface.png",
        caption: "AI chat interface",
      },
      { src: "/images/projects/twinx-ai-platform/design-system.png", caption: "Design system" },
    ],
  },
  {
    slug: "euroclear-bank",
    title: "Euroclear Bank Platform",
    company: "TATA Consultancy Services (client: Euroclear Bank)",
    role: "Senior UX Designer",
    type: "Financial Market Infrastructure",
    year: "2024 – Present",
    summary:
      "Redesigned dashboards and reporting workflows for a financial infrastructure platform, cutting navigation steps by 35% in a compliance-heavy environment.",
    featured: true,
    visibility: "private",
    impact: [
      "35% fewer navigation steps across core reporting workflows",
      "UX decisions formally aligned with regulatory requirements via structured stakeholder workshops",
    ],
    sections: {
      overview: {
        heading: "Overview",
        body: "Euroclear Bank's platform handles enterprise dashboards and reporting workflows for financial market infrastructure — a compliance-heavy environment where every interaction carries regulatory weight.",
      },
      problem: {
        heading: "Problem",
        body: "Existing dashboards and reporting workflows required too many navigation steps to complete routine tasks, for an audience of compliance and operations professionals rather than casual users.",
      },
      myRole: {
        heading: "My Role",
        body: "Senior UX Designer — redesigned enterprise dashboards and reporting workflows, and produced high-fidelity prototypes and interaction flows for compliance-heavy interfaces.",
      },
      research: {
        heading: "Research",
        body: "Ran structured stakeholder workshops to align UX decisions directly with regulatory requirements — in this domain, a design decision that ignores a compliance rule isn't just a UX miss, it's a real risk.",
      },
      personas: {
        heading: "Personas",
        body: "Compliance and operations user profiles from this engagement are client-confidential and aren't included here.",
        placeholder: true,
      },
      journey: {
        heading: "Journey",
        body: "Restructured the information architecture behind the core reporting workflows, reducing the steps required to complete common navigation tasks by 35%.",
      },
      wireframes: {
        heading: "Wireframes",
        body: "Wireframe artifacts from this engagement to be added once cleared for public sharing.",
        placeholder: true,
      },
      process: {
        heading: "Design Process",
        body: "Structured stakeholder workshops translated regulatory requirements into interface requirements before any high-fidelity work began.",
      },
      uiDesign: {
        heading: "UI Design",
        body: "High-fidelity prototypes and interaction flows for the redesigned dashboards and reporting screens.",
      },
      decisions: {
        heading: "Design Decisions",
        body: "Treated regulatory requirements as a design input from day one rather than a late-stage compliance review — this avoided rework and kept the interface aligned with what compliance-heavy users actually needed to verify.",
      },
      challenges: {
        heading: "Challenges",
        body: "Balancing simplification (fewer navigation steps) against completeness (nothing regulatory can be hidden or skipped) in a domain with zero tolerance for ambiguity.",
      },
      takeaways: {
        heading: "Takeaways",
        body: "In regulated environments, the fastest path to a good interface runs through the compliance conversation, not around it.",
      },
    },
    screenshots: [
      {
        src: "/images/projects/euroclear-bank/dashboard-before.png",
        caption: "Before: legacy dashboard",
      },
      {
        src: "/images/projects/euroclear-bank/dashboard-after.png",
        caption: "After: modernized dashboard",
      },
      {
        src: "/images/projects/euroclear-bank/trading-before.png",
        caption: "Before: trading interface",
      },
      {
        src: "/images/projects/euroclear-bank/trading-after.png",
        caption: "After: streamlined trading",
      },
      { src: "/images/projects/euroclear-bank/design-system.png", caption: "Design system" },
      { src: "/images/projects/euroclear-bank/final-designs.png", caption: "Final designs" },
    ],
  },
  {
    slug: "virtual-personal-stylist",
    title: "Virtual Personal Stylist",
    company: "Independent Project",
    role: "UX Designer",
    type: "Mobile Application",
    year: "Personal Project",
    summary:
      "An AI-powered personal styling app — virtual wardrobe, outfit planning, and personalized fashion recommendations, designed end-to-end from research through final UI.",
    featured: false,
    visibility: "public",
    impact: [
      "Complete end-to-end UX process: user interviews through final visual design",
      "A working information architecture spanning onboarding, digital wardrobe, outfit planning, and settings",
    ],
    heroImage: {
      src: "/images/projects/virtual-personal-stylist/cover.png",
      alt: "Virtual Personal Stylist app splash screen on a phone",
    },
    screenshotStyle: "contain",
    sections: {
      overview: {
        heading: "Overview",
        body: "Create a Virtual Personal Stylist app that uses advanced algorithms and machine learning to provide personalized fashion advice and outfit recommendations to users. The app should consider the user's body type, fashion preferences, lifestyle, and existing wardrobe to provide tailored recommendations that are easy to implement. The project involved designing a Virtual Personal Stylist app that incorporates user profile creation, virtual wardrobe, machine learning algorithms, outfit planner, shopping recommendations, and fashion news and trends.",
      },
      problem: {
        heading: "Problem",
        body: "Many people struggle with finding the right clothes and putting together outfits that fit their personal style, body type, and lifestyle. This can lead to stress, wasted time, and poor self-confidence. Existing fashion apps and websites often provide generic advice that does not take into account individual preferences and needs.",
      },
      myRole: {
        heading: "My Role",
        body: "UX Designer — worked with internal stakeholders such as designers, developers, and data scientists, and external stakeholders such as fashion designers, fashion brands, and tailors, to create the app end-to-end: research, information architecture, wireframes, style guide, and visual design.",
      },
      research: {
        heading: "Research",
        body: "User interviews covered: What are your biggest challenges when it comes to fashion and dressing? How do you typically get fashion advice or inspiration? What features or functionalities would you like to see in a Virtual Personal Stylist app? What types of outfits are you typically looking for (e.g., workwear, casual, formal)?",
      },
      personas: {
        heading: "Personas",
        body: "The primary persona: Dhivya Srinivasan, 28, homemaker. Her goals: seeing outfit suggestions from her own wardrobe, getting fashion advice at the last minute before an event, and getting a good compliment on her dressing sense. Her pain points: being careful choosing an outfit for a close relative's marriage, always seeing dresses modeled on people who don't look like her, and forgetting what's already in her wardrobe until it's too late. Full empathy map and persona artifact below.",
      },
      journey: {
        heading: "Journey",
        body: 'Mapped from "What dress do we have for this occasion?" through logging into the app and uploading wardrobe photos, scanning or uploading a photo to create a 3D/illustrative figure, and using machine learning to get a suggested outfit — ending on matching accessories being suggested automatically. Full journey map below.',
      },
      wireframes: {
        heading: "Wireframes",
        body: "Low-fidelity wireframes focused on information architecture and user flow, covering onboarding, the digital wardrobe, outfit planning, and settings. Full wireframes and information architecture below.",
      },
      process: {
        heading: "Design Process",
        body: "User interviews, empathy mapping, user personas, journey mapping, low-fidelity wireframes, style guide, then visual design.",
      },
      uiDesign: {
        heading: "UI Design",
        body: "Style guide: Nunito typeface (Regular and Bold), a dark background (#1E232C) with white buttons (#FFFFFF), and a dedicated iconography set. Final visual design covered the flash screen, login/registration, home screen, digital wardrobe, outfit planning, and account settings.",
      },
      decisions: {
        heading: "Design Decisions",
        body: "Let users upload photos of clothes they already own rather than only recommending new purchases — the research showed the core frustration was forgetting or misjudging what was already in the wardrobe, not a lack of shopping options.",
      },
      challenges: {
        heading: "Challenges",
        body: 'From the persona\'s own words: "We always see dresses in online store on some random models but not on us" — and — "We use to forget about our costume collection and in the last min confusion we may choose wrong attire." Designing for that meant the app had to work from the user\'s actual wardrobe and body, not a generic model.',
      },
      takeaways: {
        heading: "Takeaways",
        body: "A personal project carried through the full UX process — interviews, empathy mapping, personas, journey mapping, wireframes, a style guide, and final visual design — rather than stopping at a single artifact.",
      },
    },
    screenshots: [
      {
        src: "/images/projects/virtual-personal-stylist/empathy-map.png",
        caption: "Empathy map",
      },
      { src: "/images/projects/virtual-personal-stylist/persona.png", caption: "User persona" },
      {
        src: "/images/projects/virtual-personal-stylist/journey-map.png",
        caption: "User journey map",
      },
      {
        src: "/images/projects/virtual-personal-stylist/information-architecture.svg",
        caption: "Information architecture",
      },
      {
        src: "/images/projects/virtual-personal-stylist/wireframes.svg",
        caption: "Mid-fidelity wireframes",
      },
      {
        src: "/images/projects/virtual-personal-stylist/style-guide-colors.png",
        caption: "Style guide — colors",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-1.png",
        caption: "Flash screen & login screen 1",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-2.png",
        caption: "Login screen 2 & login screen 3",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-3.png",
        caption: "Forgot password & OTP verification",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-4.png",
        caption: "Create new password & password changed",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-5.png",
        caption: "Home screen & digital wardrobe",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-6.png",
        caption: "Settings & user details",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-7.png",
        caption: "Upload photo & body measurements",
      },
      {
        src: "/images/projects/virtual-personal-stylist/visual-design-8.png",
        caption: "Privacy settings",
      },
    ],
  },
  {
    slug: "production-workflow-revamp",
    title: "Production Workflow Revamp",
    company: "McKinsey Global Services",
    role: "Lead UX/UI Designer",
    type: "Enterprise Internal Tool",
    year: "6 months",
    summary:
      "Redesigned McKinsey's legacy IBM-based production management platform into a modern workflow experience for the global presentation production team.",
    featured: true,
    visibility: "private",
    impact: [
      "Directional 42% faster request assignment",
      "Directional 35% fewer clicks to complete a task",
      "Directional 50% improved workflow visibility",
    ],
    sections: {
      overview: {
        heading: "Overview",
        body: "The Production Team receives PowerPoint production requests from consultants and analysts worldwide, and the application that manages that entire request lifecycle was built years ago on IBM technologies. My job was to evaluate the existing experience against UX principles, identify usability issues, and redesign the workflow and GUI while preserving the underlying business process.",
      },
      problem: {
        heading: "The Problem",
        body: "The legacy IBM platform suffered from a dense interface, poor visual hierarchy, multiple unnecessary clicks, confusing navigation, information overload, a difficult assignment workflow, outdated controls, no clear prioritization, poor visibility into request status, and a high learning curve for new users.",
      },
      myRole: {
        heading: "My Role",
        body: "Lead UX/UI Designer — heuristic evaluation, user research, workflow analysis, information architecture, user flows, wireframing, high-fidelity UI design, interaction design, design validation, and developer handoff.",
      },
      research: {
        heading: "Research",
        body: "See the Heuristic Evaluation section below for the structured usability findings that drove this redesign.",
        placeholder: true,
      },
      personas: {
        heading: "Personas",
        body: "This case study focuses on the workflow and interface redesign rather than persona artifacts — see the Heuristic Evaluation and Legacy vs. Modern sections below.",
        placeholder: true,
      },
      journey: {
        heading: "Journey",
        body: "See the End-to-End Request Flow diagram below for the full request lifecycle, from the analyst's email through delivery and closure.",
        placeholder: true,
      },
      wireframes: {
        heading: "Wireframes",
        body: "See the Legacy vs. Modern section below for the redesigned screens that followed the wireframing stage.",
        placeholder: true,
      },
      process: {
        heading: "Design Process",
        body: "See the Design Process step list below: Discover, Research, Heuristic Evaluation, Workflow Analysis, Information Architecture, Wireframes, High-Fidelity UI, Usability Improvements, Developer Handoff.",
        placeholder: true,
      },
      uiDesign: {
        heading: "UI Design",
        body: "See the Legacy vs. Modern and Design System sections below for the high-fidelity redesign of every core screen in the request lifecycle.",
        placeholder: true,
      },
      decisions: {
        heading: "Design Decisions",
        body: "Preserved the underlying business process exactly, changing only the interface and interaction model — the team's workflow logic didn't need to change, the experience of using it did.",
      },
      challenges: {
        heading: "Challenges",
        body: "Balancing a full modernization against a live, high-volume production team who couldn't afford downtime or a steep re-training curve during the transition.",
      },
      takeaways: {
        heading: "Takeaways",
        body: "See Key Learnings below.",
        placeholder: true,
      },
    },
    screenshots: [],
  },
  {
    slug: "mck-tools",
    title: "McK Tools",
    company: "McKinsey Global Services",
    role: "Lead UX/UI Designer",
    type: "Enterprise Productivity Plugin",
    year: "8 months",
    summary:
      "Designing an enterprise PowerPoint productivity suite that streamlined slide creation and automated repetitive consultant workflows.",
    featured: true,
    visibility: "private",
    impact: [
      "Reduced manual copy-paste effort building consultant-facing slides",
      "Faster consultant profile creation, without leaving PowerPoint",
      "A shared, searchable icon library replacing an ad hoc shared drive",
    ],
    sections: {
      overview: {
        heading: "Overview",
        body: "McK Tools was a custom Microsoft PowerPoint add-in (ribbon plugin) built to improve productivity for consultants and presentation teams. Instead of switching between multiple internal systems, users could access productivity tools directly inside PowerPoint through a dedicated ribbon tab. My job was to redesign the UX of the plugin, simplify its workflows, modernize the interface, and create a scalable design foundation for multiple productivity tools within the same add-in.",
      },
      problem: {
        heading: "The Problem",
        body: "Consultants spent valuable time on repetitive tasks while building presentations — searching for consultant profile information, copying biographies manually, hunting for approved icons, and switching between multiple internal systems just to keep a deck consistent.",
      },
      myRole: {
        heading: "My Role",
        body: "Lead UX/UI Designer — UX research, workflow analysis, information architecture, interaction design, plugin experience design, wireframing, high-fidelity UI design, usability improvements, design validation, and developer handoff.",
      },
      research: {
        heading: "Research",
        body: "See the Business Challenge and Design Process sections below.",
        placeholder: true,
      },
      personas: {
        heading: "Personas",
        body: "This case study focuses on the plugin's workflow and interface design rather than persona artifacts.",
        placeholder: true,
      },
      journey: {
        heading: "Journey",
        body: "See the User Flows section below for the Profile Extractor and McK Icons flows.",
        placeholder: true,
      },
      wireframes: {
        heading: "Wireframes",
        body: "See the Tool 1 and Tool 2 sections below for the high-fidelity screens that followed wireframing.",
        placeholder: true,
      },
      process: {
        heading: "Design Process",
        body: "See the Design Process step list below: Discover, User Research, Workflow Analysis, Task Mapping, Information Architecture, Wireframes, High-Fidelity Design, Usability Testing, Iteration, Developer Handoff.",
        placeholder: true,
      },
      uiDesign: {
        heading: "UI Design",
        body: "See the PowerPoint Ribbon, Profile Extractor, and McK Icons sections below for the full high-fidelity plugin design.",
        placeholder: true,
      },
      decisions: {
        heading: "Design Decisions",
        body: "Built the plugin on a modular architecture from day one — Profile Extractor and McK Icons as the first two tools, with room for future modules on the same ribbon tab rather than a new add-in per tool.",
      },
      challenges: {
        heading: "Challenges",
        body: "Designing within Microsoft Office's own UI constraints — a fixed-width task pane and the ribbon's rigid grouping model — meant every interaction had to work inside a shell we didn't control.",
      },
      takeaways: {
        heading: "Takeaways",
        body: "See Key Learnings below.",
        placeholder: true,
      },
    },
    screenshots: [],
  },
  {
    slug: "chi-band",
    title: "Continuous Health — Band",
    company: "Independent Project",
    role: "Independent Product & UX Designer",
    type: "Wearable Hardware Concept",
    year: "Personal Project",
    summary:
      "An independent concept for a display-less companion band that closes the Apple Watch's charging gap — every claim sourced, modelled, or labelled as unmeasured, with an explicit section on what it doesn't do.",
    featured: false,
    visibility: "public",
    impact: [
      "Full concept-to-launch execution across two versioned releases — a v1.0 strategy site and a v1.1 Apple-style product page that resolves the open question v1.0 deliberately left unanswered",
      "Every quantitative claim on the page is either cited to a published study, derived from a stated power budget, or explicitly marked as modelled/unmeasured — including a dedicated 'Limits' section",
      "A complete concept specification (dimensions, sensors, sampling behavior, battery, materials) for an unbuilt device",
    ],
    heroImage: {
      src: "/continuous-health/teaser/teaser-wide.jpg",
      alt: "Continuous Health Band — concept product render across four finishes",
    },
    externalUrl: "/continuous-health/band.html",
    externalUrlLabel: "View the live concept",
    screenshotStyle: "contain",
    screenshotsHeading: "Product Gallery",
    sections: {
      overview: {
        heading: "Overview",
        body: "Continuous Health is an independent concept for a passive, display-less wearable band designed to close the coverage gap left when a smartwatch is off the wrist charging. It's versioned across two releases: v1.0 laid out the concept, the research questions, and the product strategy; v1.1 returned to answer the one question v1.0 deliberately left open — how the companion device should be powered without reintroducing the exact gap it exists to close.",
      },
      problem: {
        heading: "Problem",
        body: "A smartwatch worn 18–24 hours between charges still leaves a recurring hole in a continuous health record: the 30–75 minutes it's off the wrist charging. v1.0 of this concept named that gap explicitly rather than glossing over it, and deferred the hardware answer rather than guessing at one prematurely.",
      },
      myRole: {
        heading: "My Role",
        body: "Independent concept designer, solo — positioning, technical specification, information architecture, and copy for both the v1.0 strategy site and the v1.1 product launch page, plus the power-budget reasoning that resolves the open question between them.",
      },
      research: {
        heading: "Research",
        body: "No primary user research has been conducted for this concept, and the site states that directly rather than implying otherwise. What stands in for it is a sourcing discipline: every quantitative claim is either cited to a published study — a 2025 SLEEP Advances validation of wrist-worn sleep tracking, a 2020 PLOS ONE study on resting-heart-rate variability — modelled from a stated power budget, or explicitly labelled as unmeasured.",
      },
      personas: {
        heading: "Personas",
        body: "No persona artifacts exist for this project — it's a solo concept exploration, not a client engagement with research participants. v1.0 was explicit that no primary user research had been conducted, and that's still true in v1.1; nothing on the page is presented as evidence that people want this.",
        placeholder: true,
      },
      journey: {
        heading: "Journey",
        body: "The core flow is a 24-hour handoff between two devices: the watch covers the day at high fidelity and comes off once for its own charge; the Band, worn continuously, is charged in the exact window the watch is covering instead. Neither device is designed to be off the wrist at the same time as the other — and if both ever are, the record shows a gap rather than interpolating one that didn't happen.",
      },
      wireframes: {
        heading: "Wireframes",
        body: "This is a hardware concept rather than a screen-based product, so there's no traditional wireframe stage. The structural equivalent is the specification sheet (form, sensors, sampling, power) and the two-device coverage model above.",
        placeholder: true,
      },
      process: {
        heading: "Design Process",
        body: "Two releases, not one draft. v1.0 established the concept, the founding research questions, and named an unresolved hardware question instead of guessing at an answer. v1.1 came back specifically to answer that question, and v1.0's own page was updated to point forward to it rather than being silently rewritten — amendments, not rewrites, as the versioning discipline for the whole project.",
      },
      uiDesign: {
        heading: "UI Design",
        body: "Built as a long-form, single-page product site following an Apple launch-page structure: a hero statement, a horizontally-scrolling highlights strip, feature sections built around the device's deliberate lack of a screen, a full specification sheet, and a numbered footnote system citing every external claim made on the page.",
      },
      decisions: {
        heading: "Design Decisions",
        body: 'No display was the central decision, argued explicitly rather than left implicit: a screen is the single largest power draw on a wrist device, and any display would force nightly charging — reopening the exact gap the Band exists to close. Charging in daylight while the watch is worn, not simply "longer battery life," is the mechanism that makes the two devices\' coverage additive instead of overlapping.',
      },
      challenges: {
        heading: "Challenges",
        body: "The concept states its own boundary directly, on the page itself, in a dedicated Limits section: it needs the watch as a calibration anchor and isn't a standalone replacement, makes no medical claims, has no primary research behind it, and leaves open exactly how Band-derived hours should be weighted against watch-derived hours in a single score.",
      },
      takeaways: {
        heading: "Takeaways",
        body: "The harder design problem wasn't the band itself — it was proving, in writing, that a second wearable doesn't quietly recreate the problem it's meant to solve. That meant stating a modelled (not measured) battery figure plainly, sourcing every claim, and giving the concept a \"what this doesn't do\" section most product pages skip entirely.",
      },
    },
    screenshots: [
      {
        src: "/continuous-health/img/band-midnight-1600.webp",
        caption: "Band — Midnight, the default finish",
      },
      { src: "/continuous-health/img/band-cobalt-1600.webp", caption: "Band — Cobalt" },
      { src: "/continuous-health/img/band-starlight-1600.webp", caption: "Band — Starlight" },
      { src: "/continuous-health/img/band-ember-1600.webp", caption: "Band — Ember" },
      {
        src: "/continuous-health/img/life-sleep-1600.webp",
        caption: "Worn overnight — the eight hours most records miss",
      },
      {
        src: "/continuous-health/img/life-swim-1600.webp",
        caption: "5 ATM, sealed as one piece — no reason to take it off",
      },
      {
        src: "/continuous-health/img/life-run-m-1600.webp",
        caption: "Worn through the ordinary hours, not just the workout",
      },
      {
        src: "/continuous-health/img/life-grid-1600.webp",
        caption: "One record, assembled from all of it",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

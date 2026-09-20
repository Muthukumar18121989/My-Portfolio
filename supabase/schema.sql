-- Design OS admin schema — pragmatic scope (see chat history / commit
-- message for the "pragmatic vs full Design OS spec" decision). Run this
-- once in the Supabase SQL Editor (Project → SQL Editor → New query →
-- paste → Run) after creating the project.
--
-- Model: every table is publicly readable (RLS "select" policy, no auth
-- required) — this matches the current site's behavior exactly, where
-- "private" projects are already fully present in the page HTML and only
-- hidden behind a client-side password UI (see RecruiterGate's own comment:
-- "a UI speed bump... not real access control"). Nothing here changes
-- that model, it just moves the same data from static files into Postgres.
--
-- Writes have NO client-side RLS policy at all (default deny) — every
-- write goes through a Next.js Server Action running with the Supabase
-- Secret key (service role), which bypasses RLS entirely and independently
-- verifies the caller is the signed-in admin before writing anything.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Singleton content: one row each, edited in place, never inserted/deleted
-- ---------------------------------------------------------------------

create table profile (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  role text not null,
  role_long text not null,
  location text not null,
  email text not null,
  years_experience int not null,
  hero_summary text not null,
  about_intro text not null,
  photo_url text,
  updated_at timestamptz not null default now()
);

create table education (
  id smallint primary key default 1 check (id = 1),
  degree text not null,
  school text not null,
  date_range text not null,
  detail text not null,
  updated_at timestamptz not null default now()
);

create table site_settings (
  id smallint primary key default 1 check (id = 1),
  resume_url text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Ordered lists: sort_order controls display order, editable in the admin
-- as reorderable lists (drag or up/down, admin's choice at build time)
-- ---------------------------------------------------------------------

create table philosophy_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  sort_order int not null default 0
);

create table stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sort_order int not null default 0
);

create table fun_facts (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  sort_order int not null default 0
);

create table skill_groups (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  items text[] not null default '{}',
  sort_order int not null default 0
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  sort_order int not null default 0
);

-- Unifies the two overlapping timeline shapes that existed as separate
-- static files (experience.ts + career.ts) into one source of truth — the
-- homepage's Career Journey section and the About page's Professional
-- Journey section will both read from this same table.
create table career_entries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  initials text not null,
  role text not null,
  date_range text not null,
  location text not null,
  is_current boolean not null default false,
  summary text not null,
  skills text[] not null default '{}',
  responsibilities text[] not null default '{}',
  achievements text[] not null default '{}',
  sort_order int not null default 0
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar_url text,
  published boolean not null default true,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------
-- Projects — the one table with real structure (case-study sections,
-- screenshots, the TwinX-style enterprise showcase) kept as JSONB rather
-- than fully normalized, since it's edited rarely and the shape already
-- matches the existing Project/CaseStudySection/EnterpriseShowcaseCard
-- TypeScript types 1:1 (see src/lib/content/types.ts).
-- ---------------------------------------------------------------------

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  company text not null,
  role text not null,
  type text not null,
  year text not null,
  summary text not null,
  featured boolean not null default false,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  impact text[] not null default '{}',
  hero_image_url text,
  hero_image_alt text,
  external_url text,
  external_url_label text,
  screenshot_style text check (screenshot_style in ('laptop', 'contain')),
  screenshots_heading text,
  -- Shape: { overview: {heading, body, placeholder?}, problem: {...}, myRole: {...}, ... }
  sections jsonb not null default '{}'::jsonb,
  -- Shape: [{ src, caption }, ...]
  screenshots jsonb not null default '[]'::jsonb,
  -- Shape: [{ tag, title, overview, contributions[], toolkit?[], businessImpact }, ...] or null
  enterprise_showcase jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Row Level Security — public read, no public write (see header comment)
-- ---------------------------------------------------------------------

alter table profile enable row level security;
alter table education enable row level security;
alter table site_settings enable row level security;
alter table philosophy_items enable row level security;
alter table stats enable row level security;
alter table fun_facts enable row level security;
alter table skill_groups enable row level security;
alter table certifications enable row level security;
alter table career_entries enable row level security;
alter table testimonials enable row level security;
alter table projects enable row level security;

create policy "public read" on profile for select using (true);
create policy "public read" on education for select using (true);
create policy "public read" on site_settings for select using (true);
create policy "public read" on philosophy_items for select using (true);
create policy "public read" on stats for select using (true);
create policy "public read" on fun_facts for select using (true);
create policy "public read" on skill_groups for select using (true);
create policy "public read" on certifications for select using (true);
create policy "public read" on career_entries for select using (true);
create policy "public read" on testimonials for select using (true);
create policy "public read" on projects for select using (true);

-- ---------------------------------------------------------------------
-- Storage — one public bucket for every uploaded asset (profile photo,
-- resume PDF, project hero images/screenshots, testimonial avatars).
-- Public read via storage policy; writes only via the Secret key from
-- Server Actions, same as the tables above.
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "public read assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

-- ---------------------------------------------------------------------
-- Seed data — the site's current real content, so the admin starts
-- populated instead of empty. Sourced directly from src/lib/content/*.ts
-- as of this migration; nothing invented.
-- ---------------------------------------------------------------------

insert into profile (id, name, role, role_long, location, email, years_experience, hero_summary, about_intro, photo_url)
values (
  1,
  'Muthukumar D',
  'UX UI Designer / Product Designer',
  'Senior UX Designer — Product Design for Enterprise & Consumer Experiences',
  'Chennai, India',
  'muthukumar_d@hotmail.com',
  10,
  'I design intuitive, scalable products across enterprise AI platforms, financial infrastructure, and global consulting — turning ambiguous, data-heavy problems into interfaces people can actually use.',
  'Senior UX Designer with 10+ years of experience crafting intuitive, scalable digital products across enterprise AI platforms, financial infrastructure, and global consulting environments. My focus is end-to-end UX — research, interaction design, Figma prototyping, and design systems — with a track record of reducing user friction, improving task efficiency, and influencing product strategy through data-driven decisions.',
  '/images/profile-dark.webp'
);

insert into education (id, degree, school, date_range, detail)
values (1, 'B.E. in Electrical & Electronics Engineering', 'Rajalakshmi Engineering College, Chennai', 'Jun 2007 – Aug 2011', 'First Class');

insert into site_settings (id, resume_url)
values (1, '/Muthukumar-D-Resume.pdf');

insert into philosophy_items (title, body, sort_order) values
('Start from the mental model, not the screen', 'The hardest part of designing for AI-driven, data-heavy platforms isn''t the UI — it''s figuring out how the people using it already think about the problem. I run research and journey mapping before wireframes, not after.', 0),
('Design systems are a product decision, not a chore', 'A shared, reusable Figma system across an enterprise platform''s 3 product modules cut design-to-dev handoff time by 40%. Consistency compounds — it''s usually the highest-leverage thing I can build early.', 1),
('Compliance and constraints are design inputs, not obstacles', 'Designing for a regulated financial platform means the interface has to satisfy compliance requirements, not route around them. Structured stakeholder workshops up front save far more time than late-stage rework.', 2);

insert into stats (value, label, sort_order) values
('10+', 'Years of experience', 0),
('30%', 'Task completion time cut through a usability-tested redesign', 1),
('40%', 'Faster design-to-dev handoff via a shared design system', 2),
('50%', 'Team efficiency gained from automation workflow redesign', 3);

insert into fun_facts (content, sort_order) values
('Started my career as an Electrical Engineer before moving into UX — I still think in systems.', 0),
('Mentored 5+ junior designers at McKinsey and helped establish design review practices adopted team-wide.', 1),
('Now pairing with AI coding agents to turn design systems into production-ready interfaces.', 2);

insert into skill_groups (label, items, sort_order) values
('Design', array['End-to-end UX Design', 'User Research & Usability Testing', 'Interaction Design', 'Wireframing', 'Prototyping', 'Design Systems', 'Journey Mapping', 'Information Architecture', 'Mobile-first & Responsive Design'], 0),
('Tools', array['Figma', 'FigJam', 'Adobe XD', 'Miro', 'Illustrator', 'Photoshop', 'Notion', 'JIRA'], 1),
('Methods', array['Design Thinking', 'Agile / Scrum', 'Stakeholder Facilitation', 'Design Sprints', 'Usability Testing'], 2),
('AI Tools', array['Google Gemini (AI Studio)', 'Prompt Engineering', 'GCP Vertex AI', 'MCP'], 3);

insert into certifications (content, sort_order) values
('Certified UX/UI Designer', 0),
('Silver Certification in Mentorship', 1);

insert into career_entries (company, initials, role, date_range, location, is_current, summary, skills, responsibilities, achievements, sort_order) values
('TATA Consultancy Services', 'TCS', 'Senior UX Designer (Assistant Associate)', 'Aug 2024 – Present', 'Chennai, India', true,
 'Leading end-to-end UX for enterprise AI and financial-infrastructure products, partnering with global business units to turn complex, data-heavy workflows into interfaces people can actually use.',
 array['Figma', 'Design Systems', 'Journey Mapping', 'Interaction Design', 'Usability Testing'],
 array['Led UX strategy for enterprise applications', 'Conducted research with stakeholders across multiple business units', 'Designed journeys, dashboards, and interaction models for AI-driven workflows', 'Built and maintained reusable design systems', 'Collaborated with cross-functional engineering and product teams'],
 array['Cut task completion time by 30% through usability-tested redesigns', 'Accelerated design-to-dev handoff by 40% with a shared design system', 'Reduced navigation steps by 35% in compliance-heavy reporting workflows'],
 0),
('McKinsey Global Services', 'MGS', 'Senior UX Designer & Automation Specialist', 'Aug 2015 – Aug 2024', 'Chennai, India', false,
 'Designed UX for enterprise tools and automation-focused workflow redesigns supporting global consulting teams over a 9-year engagement.',
 array['UX Design', 'Workflow Automation', 'Visual Design', 'Design Mentorship'],
 array['Designed UX for 10+ enterprise tools and workflow-driven dashboards', 'Delivered automation-focused workflow redesigns', 'Produced high-volume visual deliverables to a consistent quality standard', 'Mentored junior designers and established design review practices'],
 array['Improved team efficiency by 50% through automation workflow redesign', 'Reduced manual effort by 25% across key operational processes', 'Produced 100+ deliverables with zero major revision cycles', 'Mentored 5+ junior designers'],
 1),
('Scope E-Knowledge Center', 'SEK', 'Senior Web Analyst', 'Oct 2013 – Aug 2015', 'Chennai, India', false,
 'Conducted web analytics to identify usability gaps and shaped content strategy for improved discoverability and engagement.',
 array['Web Analytics', 'UX Research'],
 array['Conducted web analytics to identify usability gaps', 'Delivered redesign recommendations', 'Improved content discoverability and session engagement'],
 array[]::text[],
 2),
('Santhi Enterprises', 'SE', 'Electrical Engineer', 'Jun 2011 – Oct 2013', 'Chennai, India', false,
 'Where it started — an engineering foundation in systems thinking that still shapes how I approach product problems today.',
 array['Systems Thinking', 'Electrical Engineering'],
 array[]::text[],
 array[]::text[],
 3);

-- Projects: seeded with core fields only (title/company/role/type/year/
-- summary/featured/visibility/impact/hero image) — the full case-study
-- `sections` / `screenshots` / `enterprise_showcase` JSONB for each
-- project stays in src/lib/content/projects.ts as the source of truth
-- until the admin's project editor can round-trip that JSON directly, so
-- nothing is lost by seeding these top-level fields first.
insert into projects (slug, title, company, role, type, year, summary, featured, visibility, impact, hero_image_url, hero_image_alt, sort_order) values
('twinx-ai-platform', 'TwinX AI Platform', 'TATA Consultancy Services', 'Senior UX Designer (Lead)', 'Enterprise AI Product', '2024 – Present',
 'End-to-end UX for an enterprise AI platform used across 5+ business units — from research through a scalable design system.',
 true, 'private',
 array['30% reduction in task completion time, validated through usability testing', '40% faster design-to-dev handoff via a shared Figma design system', 'Design system adopted across all 3 shipped product modules'],
 '/images/projects/twinx-ai-platform/banner.png', 'TwinX AI Platform — enterprise digital twin dashboard with live simulation and an AI copilot panel', 0),
('euroclear-bank', 'Euroclear Bank Platform', 'TATA Consultancy Services (client: Euroclear Bank)', 'Senior UX Designer', 'Financial Market Infrastructure', '2024 – Present',
 'Redesigned dashboards and reporting workflows for a financial infrastructure platform, cutting navigation steps by 35% in a compliance-heavy environment.',
 true, 'private',
 array['35% fewer navigation steps across core reporting workflows', 'UX decisions formally aligned with regulatory requirements via structured stakeholder workshops'],
 '/images/projects/euroclear-bank/banner.png', 'Euroclear Bank Platform — general ledger and financial reporting dashboard with compliance checks', 1),
('virtual-personal-stylist', 'Virtual Personal Stylist', 'Independent Project', 'UX Designer', 'Mobile Application', 'Personal Project',
 'An AI-powered personal styling app — virtual wardrobe, outfit planning, and personalized fashion recommendations, designed end-to-end from research through final UI.',
 false, 'public',
 array['Complete end-to-end UX process: user interviews through final visual design', 'A working information architecture spanning onboarding, digital wardrobe, outfit planning, and settings'],
 '/images/projects/virtual-personal-stylist/banner.png', 'Virtual Personal Stylist app — wardrobe, outfit builder, and style recommendation screens', 2),
('production-workflow-revamp', 'Production Workflow Revamp', 'McKinsey Global Services', 'Lead UX/UI Designer', 'Enterprise Internal Tool', '6 months',
 'Redesigned McKinsey''s legacy IBM-based production management platform into a modern workflow experience for the global presentation production team.',
 true, 'private',
 array['Directional 42% faster request assignment', 'Directional 35% fewer clicks to complete a task', 'Directional 50% improved workflow visibility'],
 '/images/projects/production-workflow-revamp/banner.png', 'Production Workflow Revamp — legacy transaction-processing interface next to the modernized work board', 3),
('mck-tools', 'McK Tools', 'McKinsey Global Services', 'Lead UX/UI Designer', 'Enterprise Productivity Plugin', '8 months',
 'Designing an enterprise PowerPoint productivity suite that streamlined slide creation and automated repetitive consultant workflows.',
 true, 'private',
 array['Reduced manual copy-paste effort building consultant-facing slides', 'Faster consultant profile creation, without leaving PowerPoint', 'A shared, searchable icon library replacing an ad hoc shared drive'],
 '/images/projects/mck-tools/banner.png', 'McK Tools — PowerPoint add-in task pane with profile and icon library tabs docked beside a slide', 4),
('chi-band', 'Continuous Health — Band', 'Independent Project', 'Independent Product & UX Designer', 'Wearable Hardware Concept', 'Personal Project',
 'An independent concept for a display-less companion band that closes the Apple Watch''s charging gap — every claim sourced, modelled, or labelled as unmeasured, with an explicit section on what it doesn''t do.',
 false, 'public',
 array['Full concept-to-launch execution across two versioned releases — a v1.0 strategy site and a v1.1 Apple-style product page that resolves the open question v1.0 deliberately left unanswered', 'Every quantitative claim on the page is either cited to a published study, derived from a stated power budget, or explicitly marked as modelled/unmeasured — including a dedicated ''Limits'' section', 'A complete concept specification (dimensions, sensors, sampling behavior, battery, materials) for an unbuilt device'],
 '/continuous-health/teaser/teaser-wide.jpg', 'Continuous Health Band — concept product render across four finishes', 5);

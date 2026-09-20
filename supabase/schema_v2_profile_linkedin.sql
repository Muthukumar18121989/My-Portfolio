-- Follow-up migration — run after schema.sql. Adds two fields the first
-- pass missed while wiring the public site to read from these tables:
--
-- 1. profile.linkedin_url — footer + contact page both need a real
--    LinkedIn link; behance/dribbble stay out of scope, they were already
--    permanently null/unused in the static content.
-- 2. site_settings.career_tags — the 4 short taglines under the homepage's
--    Career Journey stats ("Enterprise UX & Product Design" etc.). Not
--    tied to any one career_entries row, so it lives with the other
--    site-wide settings.

alter table profile add column if not exists linkedin_url text;
alter table site_settings add column if not exists career_tags text[] not null default '{}';

update profile
set linkedin_url = 'https://www.linkedin.com/in/muthukumar1812'
where id = 1;

update site_settings
set career_tags = array[
  'Enterprise UX & Product Design',
  'Global Cross-functional Collaboration',
  'Enterprise SaaS & AI Products',
  'UX Strategy & Design Leadership'
]
where id = 1;

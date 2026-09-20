// Types only — real content now lives in Supabase (see supabase/schema.sql,
// src/lib/data.ts). This module used to also export the static content
// itself (profile.ts/experience.ts/projects.ts/career.ts); those files are
// gone, superseded by the admin-editable tables.
export * from "./types";

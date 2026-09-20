import type { NextConfig } from "next";

// Allows next/image to serve uploaded assets (photo, resume-adjacent
// images, project screenshots, testimonial avatars) straight from Supabase
// Storage — derived from the project's own URL rather than hardcoding the
// project ref, so this doesn't break if the Supabase project ever changes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;

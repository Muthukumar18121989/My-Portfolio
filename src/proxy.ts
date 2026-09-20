import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Only the admin surface needs session refresh — the public site reads
  // published content with no auth involved.
  matcher: ["/admin/:path*"],
};

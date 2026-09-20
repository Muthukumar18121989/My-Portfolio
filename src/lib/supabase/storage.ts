import "server-only";
import { createAdminClient } from "./admin";

const BUCKET = "portfolio-assets";

/** Uploads a file to the shared public bucket and returns its public URL.
    Every call site must have already checked requireAdminForAction(). */
export async function uploadAsset(file: File, pathPrefix: string): Promise<string> {
  const supabase = createAdminClient();
  const ext = file.name.split(".").pop() || "bin";
  const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(`uploadAsset: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}

import { createSupabaseServerClient } from "./server";

export type Profile = {
  id: string;
  role: string | null;
  full_name?: string | null;
};

export class AuthorizationError extends Error {
  status: 401 | 403;

  constructor(status: 401 | 403, message: string) {
    super(message);
    this.name = "AuthorizationError";
    this.status = status;
  }
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;
  return data.user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Profile;
}

export async function requireAuthenticatedUser() {
  const user = await getCurrentUser();
  if (!user) throw new AuthorizationError(401, "Authentication required");
  return user;
}

export async function requireAdmin() {
  const user = await requireAuthenticatedUser();
  const profile = await getCurrentProfile();

  if (!profile || profile.id !== user.id || profile.role !== "admin") {
    throw new AuthorizationError(403, "Administrator access required");
  }

  return { user, profile };
}

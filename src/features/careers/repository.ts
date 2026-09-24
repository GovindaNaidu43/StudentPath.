import { supabase } from "@/lib/supabase/client";

export async function getPublicCareers() {
  return supabase
    .from("careers")
    .select("*");
}

export async function getPublicCareerBySlug(slug: string) {
  return supabase
    .from("careers")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function getPublicCareerSections(slug: string) {
  const [whyExists, scenes, pathSteps, futureRoles] = await Promise.all([
    supabase
      .from("career_why_exists")
      .select("*")
      .eq("career_slug", slug)
      .order("display_order"),
    supabase
      .from("career_scenes")
      .select("*")
      .eq("career_slug", slug)
      .order("display_order"),
    supabase
      .from("career_path_steps")
      .select("*")
      .eq("career_slug", slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_future_roles")
      .select("*")
      .eq("career_slug", slug),
  ]);

  return {
    whyExists: whyExists.data,
    scenes: scenes.data,
    pathSteps: pathSteps.data,
    futureRoles: futureRoles.data,
  };
}

export async function getPublicCareerInsights(slug: string) {
  return supabase
    .from("career_insights")
    .select("*")
    .eq("career_slug", slug)
    .order("card_order", { ascending: true });
}

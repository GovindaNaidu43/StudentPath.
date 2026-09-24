import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminCareers(searchTerm?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("careers").select("*").order("id");

  if (searchTerm) {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  return query;
}

export async function getAdminCareerEditorData(id: string) {
  const supabase = await createSupabaseServerClient();
  const careerResult = await supabase
    .from("careers")
    .select("*")
    .eq("id", id)
    .single();

  if (careerResult.error || !careerResult.data) {
    return {
      careerResult,
      insights: null,
      whyExists: null,
      scenes: null,
      pathSteps: null,
      futureRoles: null,
    };
  }

  const [insights, whyExists, scenes, pathSteps, futureRoles] = await Promise.all([
    supabase
      .from("career_insights")
      .select("*")
      .eq("career_slug", careerResult.data.slug)
      .order("card_order", { ascending: true }),
    supabase
      .from("career_why_exists")
      .select("*")
      .eq("career_slug", careerResult.data.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_scenes")
      .select("*")
      .eq("career_slug", careerResult.data.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_path_steps")
      .select("*")
      .eq("career_slug", careerResult.data.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_future_roles")
      .select("*")
      .eq("career_slug", careerResult.data.slug),
  ]);

  return {
    careerResult,
    insights: insights.data,
    whyExists: whyExists.data,
    scenes: scenes.data,
    pathSteps: pathSteps.data,
    futureRoles: futureRoles.data,
  };
}

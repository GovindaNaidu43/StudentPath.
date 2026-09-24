import { supabase } from "@/lib/supabase/client";
import AdminCareerForm from "@/features/careers/admin/AdminCareerForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerPage({ params }: PageProps) {
  const { id } = await params;

  /* FETCH CAREER */
  const { data: career, error } = await supabase
    .from("careers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !career) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-white">
        Career not found.
      </div>
    );
  }

  /* FETCH ALL RELATED DATA IN PARALLEL */
  const [
    { data: insights },
    { data: whyExists },
    { data: scenes },
    { data: pathSteps },
    { data: futureRoles },
  ] = await Promise.all([
    supabase
      .from("career_insights")
      .select("*")
      .eq("career_slug", career.slug)
      .order("card_order", { ascending: true }),
    supabase
      .from("career_why_exists")
      .select("*")
      .eq("career_slug", career.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_scenes")
      .select("*")
      .eq("career_slug", career.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_path_steps")
      .select("*")
      .eq("career_slug", career.slug)
      .order("display_order", { ascending: true }),
    supabase
      .from("career_future_roles")
      .select("*")
      .eq("career_slug", career.slug),
  ]);

  /* MERGE DATA ΓÇö note: future_roles key must match what AdminCareerForm reads */
  const careerWithData = {
    ...career,
    career_insights: insights || [],
    career_why_exists: whyExists || [],
    career_scenes: scenes || [],
    career_path_steps: pathSteps || [],
    future_roles: futureRoles || [], // correct key
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AdminCareerForm career={careerWithData} />
    </div>
  );
}

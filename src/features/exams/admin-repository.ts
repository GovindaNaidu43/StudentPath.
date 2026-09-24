import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminExams(searchTerm?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("exams").select("*").order("id");

  if (searchTerm) {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  return query;
}

export async function getAdminExamById(id: string) {
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("exams")
    .select("*")
    .eq("id", id)
    .single();
}

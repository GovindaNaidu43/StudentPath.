import { supabase } from "@/lib/supabase/client";

export async function getPublicExams() {
  return supabase
    .from("exams")
    .select("*");
}

export async function getPublicExamBySlug(slug: string) {
  return supabase
    .from("exams")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function getPublicExamDetails(examId: string | number) {
  return supabase
    .from("exam_details")
    .select("*")
    .eq("exam_id", examId)
    .single();
}

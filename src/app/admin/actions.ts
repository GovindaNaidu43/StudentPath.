"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/authorization";
import { idValue, jsonArrayValue, textValue } from "@/lib/server-validation";
import {
  deleteCareer as deleteCareerWorkflow,
  updateCareer as updateCareerWorkflow,
  type CareerUpdateInput,
} from "@/features/careers/service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function ensureDatabaseOperation(operation: string, error: { message: string } | null) {
  if (error) {
    console.error(`Admin database operation failed: ${operation}`, error);
    throw new Error(`Unable to ${operation}`);
  }
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CAREERS
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export async function createCareer() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("careers")
    .insert({
      title: "New Career",
      slug: "new-career-" + Date.now(),
      category: "Future Careers",
      description: "New career description",
      salary: "â‚¹5L - â‚¹20L",
      demand: "Growing",
      difficulty: "Medium",
      future_scope: "Excellent",
      hero_image: "/images/default.jpg",
      hero_video: "/videos/default.mp4",
      primary_color: "#d946ef",
      secondary_color: "#9333ea",
      universe_nodes: [],
      paths: [],
    })
    .select()
    .single();

  if (error) {
    ensureDatabaseOperation("create career", error);
  }

  revalidatePath("/admin/careers");
  redirect(`/admin/careers/${data.id}`);
}

export async function updateCareer(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = idValue(formData.get("id"));
  const title = textValue(formData.get("title"), "title", 200);
  const slug = textValue(formData.get("slug"), "slug", 200);
  const category = textValue(formData.get("category"), "category", 100);
  const salary = textValue(formData.get("salary"), "salary", 200);
  const demand = textValue(formData.get("demand"), "demand", 100);
  const difficulty = textValue(formData.get("difficulty"), "difficulty", 100);
  const description = textValue(formData.get("description"), "description", 10000);
  const hero_image = textValue(formData.get("hero_image"), "hero_image", 2000);
  const hero_video = textValue(formData.get("hero_video"), "hero_video", 2000);
  const primary_color = textValue(formData.get("primary_color"), "primary_color", 20);
  const secondary_color = textValue(formData.get("secondary_color"), "secondary_color", 20);
  const input: CareerUpdateInput = {
    id,
    title,
    slug,
    category,
    salary,
    demand,
    difficulty,
    description,
    hero_image,
    hero_video,
    primary_color,
    secondary_color,
    insights: jsonArrayValue(formData.get("insights"), "insights") as CareerUpdateInput["insights"],
    whyExists: jsonArrayValue(formData.get("whyExists"), "whyExists") as CareerUpdateInput["whyExists"],
    scenes: jsonArrayValue(formData.get("scenes"), "scenes") as CareerUpdateInput["scenes"],
    pathSteps: jsonArrayValue(formData.get("pathSteps"), "pathSteps") as CareerUpdateInput["pathSteps"],
    futureRoles: jsonArrayValue(formData.get("future_roles"), "future_roles") as CareerUpdateInput["futureRoles"],
  };

  await updateCareerWorkflow(supabase, input);

  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath(`/career/${slug}`);
  revalidatePath("/admin/careers");
  revalidatePath(`/admin/careers/${id}`);
  // No redirect â€” stay on the editor so the save status indicator can show.
}

export async function deleteCareer(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error("Invalid career id");
  await deleteCareerWorkflow(supabase, id);

  revalidatePath("/admin/careers");
  revalidatePath("/");
  revalidatePath("/explore");

  redirect("/admin/careers");
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   EXAMS
   
   Required Supabase SQL (run if table doesn't exist):
   
   create table exams (
     id bigint generated always as identity primary key,
     title text not null default 'New Exam',
     slug text not null unique,
     category text default 'Competitive',
     description text default '',
     exam_date text default '',
     registration_link text default '',
     official_website text default '',
     eligibility text default '',
     difficulty text default 'Medium',
     created_at timestamptz default now()
   );
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export async function createExam() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .insert({
      title: "New Exam",
      slug: "new-exam-" + Date.now(),
      category: "Competitive",
      description: "Exam description",
      difficulty: "Medium",
    })
    .select()
    .single();

  if (error) {
    ensureDatabaseOperation("create exam", error);
  }

  revalidatePath("/admin/exams");
  redirect(`/admin/exams/${data.id}`);
}

export async function updateExam(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const id = idValue(formData.get("id"));
  const title = textValue(formData.get("title"), "title", 200);
  const slug = textValue(formData.get("slug"), "slug", 200);
  const category = textValue(formData.get("category"), "category", 100);
  const description = textValue(formData.get("description"), "description", 10000);
  const exam_date = textValue(formData.get("exam_date"), "exam_date", 100);
  const registration_link = textValue(formData.get("registration_link"), "registration_link", 2000);
  const official_website = textValue(formData.get("official_website"), "official_website", 2000);
  const eligibility = textValue(formData.get("eligibility"), "eligibility", 5000);
  const difficulty = textValue(formData.get("difficulty"), "difficulty", 100);

  const { error } = await supabase
    .from("exams")
    .update({
      title,
      slug,
      category,
      description,
      exam_date,
      registration_link,
      official_website,
      eligibility,
      difficulty,
    })
    .eq("id", id);

  if (error) {
    ensureDatabaseOperation("update exam", error);
  }

  revalidatePath("/admin/exams");
  redirect("/admin/exams");
}

export async function deleteExam(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error("Invalid exam id");
  const { error } = await supabase
    .from("exams")
    .delete()
    .eq("id", id);

  if (error) {
    ensureDatabaseOperation("delete exam", error);
  }

  revalidatePath("/admin/exams");
  redirect("/admin/exams");
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SITE SETTINGS
   
   Required Supabase SQL (run if table doesn't exist):
   
   create table site_settings (
     id bigint generated always as identity primary key,
     site_name text default 'StudentPath',
     admin_name text default 'Admin',
     contact_email text default '',
     tagline text default '',
     maintenance_mode boolean default false,
     updated_at timestamptz default now()
   );
   
   -- Insert default row:
   insert into site_settings (site_name) values ('StudentPath');
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const site_name = textValue(formData.get("site_name"), "site_name", 200);
  const admin_name = textValue(formData.get("admin_name"), "admin_name", 200);
  const contact_email = textValue(formData.get("contact_email"), "contact_email", 320);
  const tagline = textValue(formData.get("tagline"), "tagline", 500);

  /* Upsert â€” if no row exists, insert; otherwise update row 1 */
  const { error } = await supabase
    .from("site_settings")
    .upsert({
      id: 1,
      site_name,
      admin_name,
      contact_email,
      tagline,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    ensureDatabaseOperation("save settings", error);
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}
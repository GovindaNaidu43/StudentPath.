import type { SupabaseClient } from "@supabase/supabase-js";

type CareerRecord = Record<string, unknown>;

type CareerChildRecord = {
  small_heading?: string;
  title?: string;
  short_description?: string;
  deep_details?: string;
  heading?: string;
  content?: string;
  description?: string;
  image_url?: string;
  percentage?: string | number;
  role_name?: string;
};

export type CareerUpdateInput = {
  id: string;
  title: string;
  slug: string;
  category: string;
  salary: string;
  demand: string;
  difficulty: string;
  description: string;
  hero_image: string;
  hero_video: string;
  primary_color: string;
  secondary_color: string;
  insights: CareerChildRecord[];
  whyExists: CareerChildRecord[];
  scenes: CareerChildRecord[];
  pathSteps: CareerChildRecord[];
  futureRoles: CareerChildRecord[];
};

function ensureOperation(operation: string, error: { message: string } | null) {
  if (error) {
    console.error(`Admin career operation failed: ${operation}`, error);
    throw new Error(`Unable to ${operation}`);
  }
}

async function replaceChildRows(
  supabase: SupabaseClient,
  table: string,
  previousSlug: string,
  newSlug: string,
  rows: CareerRecord[]
) {
  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq("career_slug", previousSlug);
  ensureOperation(`remove ${table}`, deleteError);

  if (rows.length === 0) return;

  const { error: insertError } = await supabase
    .from(table)
    .insert(rows.map((row) => ({ ...row, career_slug: newSlug })));
  ensureOperation(`save ${table}`, insertError);
}

export async function updateCareer(
  supabase: SupabaseClient,
  input: CareerUpdateInput
) {
  const { data: existingCareer, error: lookupError } = await supabase
    .from("careers")
    .select("slug")
    .eq("id", input.id)
    .single();
  ensureOperation("load career before update", lookupError);

  if (!existingCareer) {
    throw new Error("Unable to load career before update");
  }

  const previousSlug = existingCareer.slug;
  const { error: updateError } = await supabase
    .from("careers")
    .update({
      title: input.title,
      slug: input.slug,
      category: input.category,
      salary: input.salary,
      demand: input.demand,
      difficulty: input.difficulty,
      description: input.description,
      hero_image: input.hero_image,
      hero_video: input.hero_video,
      primary_color: input.primary_color,
      secondary_color: input.secondary_color,
    })
    .eq("id", input.id);
  ensureOperation("update career", updateError);

  await replaceChildRows(
    supabase,
    "career_insights",
    previousSlug,
    input.slug,
    input.insights.map((insight, index) => ({
      small_heading: insight.small_heading,
      title: insight.title,
      short_description: insight.short_description,
      deep_details: insight.deep_details,
      card_order: index + 1,
    }))
  );
  await replaceChildRows(
    supabase,
    "career_why_exists",
    previousSlug,
    input.slug,
    input.whyExists.map((block, index) => ({
      heading: block.heading,
      content: block.content,
      display_order: index + 1,
    }))
  );
  await replaceChildRows(
    supabase,
    "career_scenes",
    previousSlug,
    input.slug,
    input.scenes.map((scene, index) => ({
      title: scene.title,
      description: scene.description,
      image_url: scene.image_url,
      display_order: index + 1,
    }))
  );
  await replaceChildRows(
    supabase,
    "career_path_steps",
    previousSlug,
    input.slug,
    input.pathSteps.map((step, index) => ({
      heading: step.heading,
      percentage: step.percentage,
      short_description: step.short_description,
      display_order: index + 1,
    }))
  );
  await replaceChildRows(
    supabase,
    "career_future_roles",
    previousSlug,
    input.slug,
    input.futureRoles.map((role) => ({
      role_name: role.role_name,
      short_description: role.short_description,
      image_url: role.image_url,
    }))
  );
}

export async function deleteCareer(
  supabase: SupabaseClient,
  id: string
) {
  const { data: career, error: lookupError } = await supabase
    .from("careers")
    .select("slug")
    .eq("id", id)
    .single();
  ensureOperation("load career before deletion", lookupError);

  if (!career) {
    throw new Error("Unable to load career before deletion");
  }

  const childTables = [
    "career_insights",
    "career_why_exists",
    "career_scenes",
    "career_path_steps",
    "career_future_roles",
  ];

  const relatedDeleteResults = await Promise.all(
    childTables.map((table) =>
      supabase.from(table).delete().eq("career_slug", career.slug)
    )
  );
  relatedDeleteResults.forEach(({ error }) => {
    ensureOperation("remove related career content", error);
  });

  const { error: deleteError } = await supabase
    .from("careers")
    .delete()
    .eq("id", id);
  ensureOperation("delete career", deleteError);
}

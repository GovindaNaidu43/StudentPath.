import { supabase } from "@/lib/supabase/client";

import CareerUniverse from "@/features/careers/components/WhyCareerExists";

import CareerHero from "@/features/careers/components/CareerHero";
// import CareerJourneyRoad from "@/features/careers/components/CareerJourneyRoad";
import CareerInsights from "@/features/careers/components/CareerInsights";

import CareerPaths from "@/features/careers/components/CareerPaths";

import CareerFuture from "@/features/careers/components/CareerFuture";

import CareerCTA from "@/features/careers/components/CareerCTA";

import CareerScenes from "@/features/careers/components/CareerScenes";
import WhyCareerExists from "@/features/careers/components/WhyCareerExists";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CareerDetailsPage({
  params,
}: PageProps) {

  const { slug } = await params;

  const { data: career, error } = await supabase
    .from("careers")
    .select("*")
    .eq("slug", slug)
    .single();

  const { data: whyExists } = await supabase
  .from("career_why_exists")
  .select("*")
  .eq("career_slug", slug)
  .order("display_order");

  const { data: scenes } = await supabase
  .from("career_scenes")
  .select("*")
  .eq("career_slug", slug)
  .order("display_order");

  const { data: pathSteps } =
  await supabase
    .from("career_path_steps")
    .select("*")
    .eq("career_slug", slug)
    .order("display_order", {
      ascending: true,
    });
const { data: futureRoles } =
await supabase
  .from("career_future_roles")
  .select("*")
  .eq("career_slug", slug);

  if (error || !career) {

    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
        text-2xl
        "
      >
        Career not found.
      </div>
    );

  }

  return (

    <main className="bg-black text-white overflow-hidden">

      {/* HERO */}

      <CareerHero
        title={career.title || "Future Career"}

        tagline={
          career.description ||
          "Explore futuristic opportunities and next-generation career pathways."
        }

        salary={
          career.salary || "Γé╣5L - Γé╣30L"
        }

        demand={
          career.demand || "Growing"
        }

        difficulty={
          career.difficulty || "Medium"
        }

        futureScope={
          career.future_scope || "Excellent"
        }

        video={
          career.hero_video || "/videos/default.mp4"
        }

        image={
          career.hero_image || "/images/default.jpg"
        }

        primaryColor={
          career.primary_color || "#d946ef"
        }

        secondaryColor={
          career.secondary_color || "#9333ea"
        }
      />

      <WhyCareerExists
      blocks={whyExists || []} />

      {/* SCENES */}

      <CareerScenes
      scenes={scenes || []} />

      


      {/* INSIGHTS */}

      <CareerInsights
        careerSlug={career.slug}
      />

      {/* PATHS */}

      {/* <CareerJourneyRoad
        steps={pathSteps || []}
      /> */}

      {/* FUTURE */}

      <CareerFuture 
      roles={futureRoles || []} />

      {/* CTA */}

      <CareerCTA />

    </main>

  );

}

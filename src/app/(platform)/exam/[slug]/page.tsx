import { supabase } from "@/lib/supabase/client";
import ExamHero from "@/features/exams/components/ExamHero";
import ExamOverview from "@/features/exams/components/ExamOverview";
import ExamEligibility from "@/features/exams/components/ExamEligibility";



type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExamDetailsPage({
  params,
}: PageProps) {

  const { slug } = await params;

  const { data: exam } = await supabase
    .from("exams")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!exam) {

    return (

      <div
        className="
        min-h-screen

        bg-black

        text-white

        flex
        items-center
        justify-center
        "
      >

        Exam not found

      </div>

    );

  }

  const { data: details } = await supabase
    .from("exam_details")
    .select("*")
    .eq("exam_id", exam.id)
    .single();

  return (

    <main
      className="
      min-h-screen

      bg-black

      text-white

      px-6
      md:px-12

      py-20
      "
    >

      {/* HERO */}
        <ExamHero title={exam.title} description={exam.description} />

      {/* OVERVIEW */}

     <ExamOverview
  overview={
    details?.overview ||
    "No overview available."
  }
/>

        {/* ELIGIBILITY */}
        <ExamEligibility
  qualification={details?.qualification}
  streamRequirement={details?.stream_requirement}
  attempts={details?.attempts}
  ageLimit={details?.age_limit}
/>


      {/* ROADMAP */}

      <section className="mb-12">

        <h2 className="text-3xl font-bold mb-4">
          Roadmap
        </h2>

        <p className="text-zinc-300">
          {details?.roadmap}
        </p>

      </section>

      {/* COMPETITION */}

      <section className="mb-12">

        <h2 className="text-3xl font-bold mb-4">
          Competition Reality
        </h2>

        <p className="text-zinc-300">
          {details?.competition_reality}
        </p>

      </section>

    </main>

  );

}

import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import ExploreFooter from "@/components/layout/ExploreFooter";
import TrendingHero from "@/features/careers/components/TrendingCareerCard";

import ExploreClient from "@/components/ExploreClient";
import { getPublicCareers } from "@/features/careers/repository";
import { getPublicExams } from "@/features/exams/repository";

export default async function ExplorePage() {

  const { data: careers, error } = await getPublicCareers();

  const { data: exams, error: examsError } = await getPublicExams();


  if (error || !careers || examsError || !exams) {

    return (

      <div
        className="
        min-h-screen

        bg-black

        text-red-500

        flex
        items-center
        justify-center

        text-2xl
        "
      >

        Failed to load careers

      </div>

    );

  }

  /* CATEGORY FILTERS */

  const technologyCareers =
    careers.filter(
      (career) =>
        career.category ===
        "Technology & AI"
    );

  const engineeringCareers =
    careers.filter(
      (career) =>
        career.category ===
        "Engineering & Robotics"
    );

  const designCareers =
    careers.filter(
      (career) =>
        career.category ===
        "Design & Creative"
    );

  const spaceCareers =
    careers.filter(
      (career) =>
        career.category ===
        "Space & Research"
    );

  const businessCareers =
    careers.filter(
      (career) =>
        career.category ===
        "Business & Management"
    );

  const biotechCareers =
    careers.filter(
      (career) =>
        career.category ===
        "Health & Biotech"
    );

  return (

    <>

      <main
        className="
        min-h-screen

        bg-black

        text-white

        overflow-x-hidden

        relative
        "
      >

        {/* GLOBAL GLOW */}

        <div
          className="
          fixed inset-0

          pointer-events-none

          bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.14),transparent_30%)]
          "
        />

        <div
          className="
          fixed

          top-[-250px]
          right-[-150px]

          w-[500px]
          h-[500px]

          rounded-full

          bg-fuchsia-500/10

          blur-[140px]
          "
        />

        <div
          className="
          fixed

          bottom-[-250px]
          left-[-180px]

          w-[500px]
          h-[500px]

          rounded-full

          bg-cyan-500/10

          blur-[160px]
          "
        />

        {/* STICKY NAVBAR */}

        <header
          className="
          fixed
          top-0
          left-0
          right-0

          z-[9999]

          backdrop-blur-2xl

          bg-black/75

          border-b border-white/5
          "
        >

          <DashboardNavbar
          careers={careers} 
          exams={exams}/>

        </header>

        {/* NAVBAR SPACER */}

        <div className="h-[70px] md:h-[0px]" />

        {/* TRENDING HERO */}

        <section
          className="
          relative
          z-10

          pt-0

          mb-10
          md:mb-0
          "
        >

          {/* MOBILE */}

          <div className="md:hidden px-4 pt-4">

            <TrendingHero
              careers={careers}
            />

          </div>

          {/* DESKTOP */}

<div className="hidden md:block pl-[60px]">

  <TrendingHero
    careers={careers}
  />

</div>


        </section>

        {/* EXPLORE CONTENT */}
        <div className="md:pl-[110px]" />

        <ExploreClient
          technologyCareers={technologyCareers}
          engineeringCareers={engineeringCareers}
          designCareers={designCareers}
          spaceCareers={spaceCareers}
          businessCareers={businessCareers}
          biotechCareers={biotechCareers}

          exams={exams}
        />
        
<ExploreFooter />
      </main>

      {/* MOBILE NAV */}

      <MobileBottomNav />

    </>

  );

}
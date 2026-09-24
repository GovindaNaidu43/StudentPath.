"use client";
import Link from "next/link";
import { useState , useEffect,useRef} from "react";
import QuickExplore from "@/components/ui/QuickExplore";
import {Search,} from "lucide-react";
import CareerSection from "@/features/careers/components/CareersSection";
import ExamsSection from "@/features/exams/components/ExamsSection";

export default function ExploreClient({

  technologyCareers,
  engineeringCareers,
  designCareers,
  spaceCareers,
  businessCareers,
  biotechCareers,

  exams,

}: any) {

  const searchRef = useRef(null);
  useEffect(() => {

  function handleClick(
    event: any
  ) {

    if (
      searchRef.current &&
      !(searchRef.current as any)
        .contains(event.target)
    ) {

      setOpenSearch(false);

    }

  }

  document.addEventListener(
    "mousedown",
    handleClick
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClick
    );

}, []);

const [
  activeSection,
  setActiveSection,
] = useState("careers");

const [search, setSearch] = useState("");
const [openSearch, setOpenSearch] =
  useState(false);

  const allItems = [

  ...technologyCareers.map((c: any) => ({
    type: "career",
    title: c.title,
    slug: c.slug,
  })),

  ...engineeringCareers.map((c: any) => ({
    type: "career",
    title: c.title,
    slug: c.slug,
  })),

  ...designCareers.map((c: any) => ({
    type: "career",
    title: c.title,
    slug: c.slug,
  })),

  ...spaceCareers.map((c: any) => ({
    type: "career",
    title: c.title,
    slug: c.slug,
  })),

  ...businessCareers.map((c: any) => ({
    type: "career",
    title: c.title,
    slug: c.slug,
  })),

  ...biotechCareers.map((c: any) => ({
    type: "career",
    title: c.title,
    slug: c.slug,
  })),

  ...exams.map((e: any) => ({
    type: "exam",
    title: e.title,
    slug: e.slug,
  })),
];

const filteredResults =
  search.length > 0
    ? allItems.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (

    <>
   
      {/* QUICK EXPLORE */}

      <QuickExplore
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* DYNAMIC CONTENT */}

      <div
        className="
        relative

        z-10
        md:ml-[60px]

        animate-in
        fade-in

        duration-500
        "
      >

        {/* CAREERS */}

        {
          activeSection === "careers" && (

            <CareerSection
              technologyCareers={technologyCareers}
              engineeringCareers={engineeringCareers}
              designCareers={designCareers}
              spaceCareers={spaceCareers}
              businessCareers={businessCareers}
              biotechCareers={biotechCareers}
            />

          )
        }

        {/* EXAMS */}

        {
          activeSection === "exams" && (

            <ExamsSection exams={exams} />

          )
        }

        {/* COLLEGES */}

        {
          activeSection === "colleges" && (

            <div
              className="
              px-6
              md:px-10

              py-20

              text-center
              "
            >

              <h1
                className="
                text-5xl
                md:text-7xl

                font-black

                tracking-[-0.07em]
                "
              >
                Colleges
              </h1>

              <p
                className="
                mt-4

                text-zinc-400

                text-lg
                "
              >
                College section coming soon.
              </p>

            </div>

          )
        }

        {/* SKILLS */}

        {
          activeSection === "skills" && (

            <div
              className="
              px-6
              md:px-10

              py-20

              text-center
              "
            >

              <h1
                className="
                text-5xl
                md:text-7xl

                font-black

                tracking-[-0.07em]
                "
              >
                Skills
              </h1>

              <p
                className="
                mt-4

                text-zinc-400

                text-lg
                "
              >
                Skills section coming soon.
              </p>

            </div>

          )
        }

      </div>

    </>

  );

}
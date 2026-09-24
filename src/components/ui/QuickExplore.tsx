"use client";
import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  School,
  Lightbulb,
} from "lucide-react";

export default function QuickExplore({
  activeSection,
  setActiveSection,
}: any) {

  const [open, setOpen] =
    useState(false);

  return (

    <>

      {/* MOBILE */}

      <div
        className="
        md:hidden

        px-4

        mt-4
        mb-10

        relative
        z-30
        "
      >

        <div
          className="
          flex
          items-start

          gap-5

          overflow-x-auto

          scrollbar-hide

          pb-2
          "
        >

          {/* CAREERS */}

          <button
            onClick={() =>
              setActiveSection("careers")
            }
            className="
            flex-shrink-0

            text-center

            group
            "
          >

            <div
              className={`
              relative

              w-20 h-20

              rounded-full

              p-[2px]

              transition-all
              duration-300

              ${
                activeSection === "careers"
                  ? `
                  bg-gradient-to-r
                  from-fuchsia-500
                  to-purple-500

                  shadow-[0_0_30px_rgba(217,70,239,0.45)]
                  `
                  : `
                  bg-white/10
                  `
              }
              `}
            >

              <div
                className="
                w-full h-full

                rounded-full

                bg-[#0b1020]

                flex items-center justify-center
                "
              >

                <Briefcase
                  size={30}
                  className="text-fuchsia-400"
                />

              </div>

            </div>

            <p
              className="
              mt-3

              text-sm

              font-medium
              "
            >
              Careers
            </p>

          </button>

          {/* EXAMS */}

          <button
            onClick={() =>
              setActiveSection("exams")
            }
            className="
            flex-shrink-0

            text-center

            group
            "
          >

            <div
              className={`
              relative

              w-20 h-20

              rounded-full

              p-[2px]

              transition-all
              duration-300

              ${
                activeSection === "exams"
                  ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500

                  shadow-[0_0_30px_rgba(34,211,238,0.45)]
                  `
                  : `
                  bg-white/10
                  `
              }
              `}
            >

              <div
                className="
                w-full h-full

                rounded-full

                bg-[#0b1020]

                flex items-center justify-center
                "
              >

                <GraduationCap
                  size={30}
                  className="text-cyan-400"
                />

              </div>

            </div>

            <p
              className="
              mt-3

              text-sm

              font-medium
              "
            >
              Exams
            </p>

          </button>

          {/* COLLEGES */}

          <button
            onClick={() =>
              setActiveSection("colleges")
            }
            className="
            flex-shrink-0

            text-center

            group
            "
          >

            <div
              className={`
              relative

              w-20 h-20

              rounded-full

              p-[2px]

              transition-all
              duration-300

              ${
                activeSection === "colleges"
                  ? `
                  bg-gradient-to-r
                  from-orange-500
                  to-pink-500

                  shadow-[0_0_30px_rgba(249,115,22,0.45)]
                  `
                  : `
                  bg-white/10
                  `
              }
              `}
            >

              <div
                className="
                w-full h-full

                rounded-full

                bg-[#0b1020]

                flex items-center justify-center

                text-3xl
                "
              >

                ðŸ«

              </div>

            </div>

            <p
              className="
              mt-3

              text-sm

              font-medium
              "
            >
              Colleges
            </p>

          </button>

          {/* SKILLS */}

          <button
            onClick={() =>
              setActiveSection("skills")
            }
            className="
            flex-shrink-0

            text-center

            group
            "
          >

            <div
              className={`
              relative

              w-20 h-20

              rounded-full

              p-[2px]

              transition-all
              duration-300

              ${
                activeSection === "skills"
                  ? `
                  bg-gradient-to-r
                  from-yellow-400
                  to-fuchsia-500

                  shadow-[0_0_30px_rgba(234,179,8,0.45)]
                  `
                  : `
                  bg-white/10
                  `
              }
              `}
            >

              <div
                className="
                w-full h-full

                rounded-full

                bg-[#0b1020]

                flex items-center justify-center

                text-3xl
                "
              >

                ðŸ’¡

              </div>

            </div>

            <p
              className="
              mt-3

              text-sm

              font-medium
              "
            >
              Skills
            </p>

          </button>

        </div>

      </div>

{/* DESKTOP */}

<div
  onMouseEnter={() =>
    setOpen(true)
  }
  onMouseLeave={() =>
    setOpen(false)
  }
  className="
hidden md:flex

fixed

left-0
top-0

h-screen

z-[999]
"
>

  <div
className={`
h-full

flex
flex-col

pt-28

justify-center

gap-8

pl-6

transition-all
duration-700
ease-out
overflow-hidden

${
  open
    ? `
    w-[280px]

    bg-gradient-to-r
    from-black/30
    via-black/50
    to-transparent
    `
    : `
    w-[90px]
    `
}
`}
  >

    {/* CAREERS */}

    <button
      onClick={() =>
        setActiveSection("careers")
      }
      className="
      flex
      items-center

      gap-5

      text-left
      "
    >

      <div
        className={`
        w-14
        h-14

        rounded-full

        flex
        items-center
        justify-center

        transition-all

        ${
          activeSection === "careers"
            ? `
            bg-gradient-to-r
            from-fuchsia-500
            to-purple-500

            shadow-[0_0_25px_rgba(217,70,239,0.45)]
            `
            : `
            bg-white/10
            `
        }
        `}
      >

        <Briefcase
          size={24}
          className="text-white"
        />

      </div>

      <span
  className={`
  text-lg
  font-semibold
  whitespace-nowrap

  transition-all
  duration-500
  delay-100

  ${
    open
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-4 pointer-events-none"
  }
  `}
>
  Careers
</span>

    </button>

    {/* EXAMS */}

    <button
      onClick={() =>
        setActiveSection("exams")
      }
      className="
      flex
      items-center

      gap-5

      text-left
      "
    >

      <div
        className={`
        w-14
        h-14

        rounded-full

        flex
        items-center
        justify-center

        transition-all

        ${
          activeSection === "exams"
            ? `
            bg-gradient-to-r
            from-cyan-500
            to-blue-500

            shadow-[0_0_25px_rgba(34,211,238,0.45)]
            `
            : `
            bg-white/10
            `
        }
        `}
      >

        <GraduationCap
          size={24}
          className="text-white"
        />

      </div>

      <span
  className={`
  text-lg
  font-semibold
  whitespace-nowrap

 transition-all
duration-500
delay-100

  ${
    open
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-4 pointer-events-none"
  }
  `}
>
  Exams
</span>

    </button>

    {/* COLLEGES */}
 <button
      onClick={() =>
        setActiveSection("colleges")
      }
      className="
      flex
      items-center

      gap-5

      text-left
      "
    >

      <div
        className={`
        w-14
        h-14

        rounded-full

        flex
        items-center
        justify-center

        transition-all

        ${
          activeSection === "colleges"
            ? `
            bg-gradient-to-r
            from-cyan-500
            to-blue-500

            shadow-[0_0_25px_rgba(34,211,238,0.45)]
            `
            : `
            bg-white/10
            `
        }
        `}
      >

        <School
          size={24}
          className="text-white"
        />

      </div>

      <span
  className={`
  text-lg
  font-semibold
  whitespace-nowrap

  transition-all
  duration-500
  delay-100

  ${
    open
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-4 pointer-events-none"
  }
  `}
>
  Colleges
</span>

    </button>

          {/* SKILLS */}

 <button
      onClick={() =>
        setActiveSection("skills")
      }
      className="
      flex
      items-center

      gap-5

      text-left
      "
    >

      <div
        className={`
        w-14
        h-14

        rounded-full

        flex
        items-center
        justify-center

        transition-all


        ${
          activeSection === "skills"
            ? `
            bg-gradient-to-r
            from-yellow-400
            to-fuchsia-500

            shadow-[0_0_25px_rgba(234,179,8,0.45)]
            `
            : `
            bg-white/10
            `
        }
        `}
      >

        <Lightbulb
          size={24}
          className="text-white"
        />

      </div>

      <span
  className={`
  text-lg
  font-semibold
  whitespace-nowrap

  transition-all
  duration-500
  delay-100

  ${
    open
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-4 pointer-events-none"
  }
  `}
>
 Skills
</span>

    </button>


        </div>

      </div>


    </>

  );

}
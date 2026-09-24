"use client";

import { motion } from "framer-motion";

type Path = {
  title?: string;
  description?: string;
  timeline?: string;
  bestFor?: string;
  difficulty?: string;
  reality?: string;
  tags?: string[];
  position?: string;
};

export default function CareerPaths({
  paths = [],
}: {
  paths?: Path[];
}) {

  const safePaths = paths || [];

  return (
    <section
      className="
      relative
      py-40
      px-6
      lg:px-12
      bg-black
      overflow-visible
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[900px]
        h-[900px]
        rounded-full
        bg-fuchsia-500/10
        blur-[220px]
        "
      />

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        "
      >

        {/* HEADING */}

        <div className="mb-24">

          <p
            className="
            uppercase
            tracking-[0.4em]
            text-fuchsia-400
            text-sm
            mb-6
            "
          >
            Multiple Pathways
          </p>

          <h2
            className="
            text-5xl
            md:text-7xl
            font-black
            leading-[0.95]
            "
          >
            There Isnâ€™t
            <br />
            Only One Way
          </h2>

        </div>

        {/* EMPTY STATE */}

        {safePaths.length === 0 && (

          <div
            className="
            rounded-[36px]
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            p-12
            text-center
            "
          >

            <h3 className="text-3xl font-black mb-4">
              Career Paths Coming Soon
            </h3>

            <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We are currently preparing detailed learning
              routes, timelines, roadmaps, and specialization
              pathways for this career.
            </p>

          </div>

        )}

        {/* GRID */}

        <div
          className="
          group/paths
          grid
          md:grid-cols-2
          gap-8
          overflow-visible
          "
        >

          {safePaths.map((path, index) => (

            <motion.div
              key={index}

              initial={{
                opacity: 0,
                y: 60,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.8,
                delay: index * 0.1,
              }}

              whileHover={{
                y: -10,
                scale: 1.02,
              }}

              className="
              group
              relative

              z-0
              hover:z-50

              overflow-visible

              rounded-[36px]

              border
              border-white/10

              bg-white/[0.04]

              backdrop-blur-2xl

              p-10
              min-h-[280px]

              transition-all
              duration-500

              group-hover/paths:opacity-40
              hover:!opacity-100
              "
            >

              {/* CARD GLOW */}

              <div
                className="
                absolute
                inset-0

                opacity-0
                group-hover:opacity-100

                transition-all
                duration-500

                rounded-[36px]

                bg-gradient-to-br
                from-fuchsia-500/10
                via-transparent
                to-cyan-500/10
                "
              />

              {/* NUMBER */}

              <div
                className="
                relative
                z-10

                text-7xl
                font-black

                text-white/10
                "
              >
                0{index + 1}
              </div>

              {/* TITLE */}

              <h3
                className="
                relative
                z-10

                text-3xl
                font-black

                mt-8
                "
              >
                {path.title || "Career Route"}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                relative
                z-10

                mt-6

                text-zinc-400
                text-lg
                leading-relaxed

                max-w-lg
                "
              >
                {path.description ||
                  "This pathway helps learners build strong industry-ready skills progressively."}
              </p>

              {/* POPUP */}

              <div
                className={`
                absolute

                opacity-0
                pointer-events-none

                group-hover:opacity-100
                group-hover:scale-100

                scale-95

                transition-all
                duration-500

                z-[999]

                ${
                  path.position === "right"
                    ? "left-0 top-1/2 -translate-y-1/2"
                    : "right-0 top-1/2 -translate-y-1/2"
                }
                `}
              >

                <div
                  className="
                  relative

                  w-[620px]
                  h-[420px]

                  rounded-[32px]

                  border
                  border-white/15

                  bg-black/85
                  backdrop-blur-[40px]

                  shadow-[0_0_80px_rgba(217,70,239,0.35)]

                  before:absolute
                  before:inset-0
                  before:rounded-[32px]
                  before:bg-gradient-to-br
                  before:from-white/5
                  before:to-transparent
                  before:pointer-events-none

                  p-8

                  overflow-hidden

                  flex
                  flex-col
                  justify-between
                  "
                >

                  {/* BACKGROUND EFFECT */}

                  <div
                    className="
                    absolute
                    inset-0

                    bg-gradient-to-br
                    from-fuchsia-500/10
                    via-transparent
                    to-cyan-500/10
                    "
                  />

                  {/* TOP */}

                  <div className="relative z-10">

                    <p
                      className="
                      text-fuchsia-400

                      uppercase
                      tracking-[0.35em]

                      text-xs
                      mb-4
                      "
                    >
                      Career Path Insight
                    </p>

                    <h4
                      className="
                      text-4xl
                      font-black

                      mb-5
                      "
                    >
                      {path.title || "Career Journey"}
                    </h4>

                    <p
                      className="
                      text-zinc-300
                      leading-relaxed
                      text-lg
                      "
                    >
                      {path.reality ||
                        "Every career path requires consistency, adaptability, and long-term learning to succeed in competitive industries."}
                    </p>

                  </div>

                  {/* STATS */}

                  <div
                    className="
                    relative
                    z-10

                    grid
                    grid-cols-3

                    gap-5
                    "
                  >

                    <div>

                      <p
                        className="
                        text-zinc-500
                        text-xs
                        uppercase
                        mb-2
                        "
                      >
                        Timeline
                      </p>

                      <p className="font-semibold">
                        {path.timeline || "6-12 Months"}
                      </p>

                    </div>

                    <div>

                      <p
                        className="
                        text-zinc-500
                        text-xs
                        uppercase
                        mb-2
                        "
                      >
                        Best For
                      </p>

                      <p className="font-semibold">
                        {path.bestFor || "Dedicated Learners"}
                      </p>

                    </div>

                    <div>

                      <p
                        className="
                        text-zinc-500
                        text-xs
                        uppercase
                        mb-2
                        "
                      >
                        Difficulty
                      </p>

                      <p className="font-semibold">
                        {path.difficulty || "Medium"}
                      </p>

                    </div>

                  </div>

                  {/* TAGS */}

                  <div
                    className="
                    relative
                    z-10

                    flex
                    gap-3
                    flex-wrap
                    "
                  >

                    {(path.tags || [
                      "ðŸš€ Growth",
                      "ðŸ“š Learning",
                      "ðŸŒ Opportunities",
                    ]).map((tag, i) => (

                      <div
                        key={i}
                        className="
                        px-4
                        py-2

                        rounded-full

                        bg-white/10

                        border
                        border-white/10

                        text-sm
                        "
                      >
                        {tag}
                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
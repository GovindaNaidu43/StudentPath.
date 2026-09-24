"use client";

import Link from "next/link";

import {
  TrendingUp,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

export default function TrendingCareerCard({
  careers,
}: any) {

  const [
    current,
    setCurrent,
  ] = useState(0);

  const trendingCareers =
    careers?.slice(0, 5) || [];

  /* AUTO SLIDER */

  useEffect(() => {

    if (
      trendingCareers.length === 0
    ) return;

    const interval =
      setInterval(() => {

        setCurrent((prev) =>
          prev ===
          trendingCareers.length - 1
            ? 0
            : prev + 1
        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [trendingCareers.length]);

  if (
    trendingCareers.length === 0
  ) {

    return null;

  }

  const career =
    trendingCareers[current];

  return (

    <section className="w-full">

      {/* MOBILE VERSION */}

      <div className="md:hidden">

        <Link
          href={`/career/${career.id}`}
          className="
          block

          relative

          overflow-hidden

          rounded-[24px]

          border border-white/10

          bg-[#070b16]

          h-[240px]

          shadow-[0_0_60px_rgba(168,85,247,0.08)]
          "
        >

          {/* IMAGE */}

          <img
            src={
              career.hero_image ||
              "/images/trending-ai.jpg"
            }
            alt={
              career.title ||
              "Career"
            }
            className="
            w-full
            h-full
            object-cover
            "
          />

          {/* OVERLAY */}

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black
            via-black/30
            to-transparent
            "
          />

          {/* CONTENT */}

          <div
            className="
            absolute

            bottom-0
            left-0

            w-full

            p-5
            "
          >

            <h3
              className="
              text-[2rem]

              font-black

              tracking-[-0.06em]

              leading-none
              "
            >

              {career.title ||
                career.name}

            </h3>

            <p
              className="
              mt-2

              text-zinc-300

              text-sm
              leading-relaxed
              "
            >

              {career.description ||
                career.short_description}

            </p>

            <div
              className="
              mt-4

              flex
              items-center

              gap-2

              text-fuchsia-400
              "
            >

              <TrendingUp
                size={18}
              />

              <span className="text-sm">

                {career.students ||
                  "24.5K students interested"}

              </span>

            </div>

            {/* DOTS */}

            <div
              className="
              flex
              items-center

              gap-2

              mt-5
              "
            >

              {trendingCareers.map(
                (
                  _: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className={`
                    rounded-full

                    transition-all
                    duration-500

                    ${
                      current === index
                        ? "w-8 h-2 bg-fuchsia-500"
                        : "w-2 h-2 bg-white/30"
                    }
                    `}
                  />

                )

              )}

            </div>

          </div>

        </Link>

      </div>

      {/* DESKTOP VERSION */}

<div className="hidden md:block">

  <div className="relative h-[120vh]">

  <div
    className="
    sticky
    top-0

    w-full
    h-screen

    overflow-hidden

    bg-black
    "
  >

    {/* BACKGROUND IMAGE */}

    <img
      src={
        career.hero_image ||
        "/images/trending-ai.jpg"
      }
      alt={
        career.title ||
        "Career"
      }
      className="
      absolute
      inset-0

      w-full
      h-full

      object-cover

      scale-[1.03]

      transition-all
      duration-700
      "
    />

    {/* DARK OVERLAY */}

    <div
      className="
      absolute
      inset-0

      bg-gradient-to-r
      from-black
      via-black/55
      to-black/10
      "
    />

    {/* EXTRA DEPTH */}

    <div
      className="
      absolute
      inset-0

      bg-gradient-to-t
      from-[#030014]
      via-transparent
      to-black/20
      "
    />

    {/* CONTENT */}

    <motion.div
  key={career.id}
  initial={{
    opacity: 0,
    y: 40,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.7,
    ease: "easeOut",
  }}
  className="
  absolute

  left-20
  top-[20%]

  // -translate-y-1/2

  z-20

  max-w-[620px]
  "
>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="
    text-fuchsia-400
    text-lg
    font-semibold
    mb-4
    "
  >
    Trending Career
  </motion.p>

  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="
    text-[5.5rem]

    leading-[0.9]

    font-black

    tracking-[-0.08em]

    text-white
    "
  >

    {career.title ||
      career.name}

  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="
    mt-7

    text-zinc-300

    text-[1.2rem]

    leading-relaxed
    "
  >

    {career.description ||
      career.short_description ||
      "Explore futuristic opportunities."}

  </motion.p>

  {/* TAGS */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="flex gap-4 flex-wrap mt-8"
  >

    {[
      "Future Ready",
      "High Demand",
      "Remote Friendly",
    ].map((tag) => (

      <div
        key={tag}
        className="
        px-5 py-3

        rounded-full

        bg-white/10

        border border-white/10

        backdrop-blur-xl

        text-white

        text-sm
        "
      >

        {tag}

      </div>

    ))}

  </motion.div>

  {/* TRENDING */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="
    mt-8

    flex
    items-center

    gap-3

    text-fuchsia-400
    "
  >

    <TrendingUp size={24} />

    <span className="text-lg">

      {career.students ||
        "24.5K students interested"}

    </span>

  </motion.div>

  {/* BUTTONS */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="
    flex
    items-center

    gap-5

    mt-10
    "
  >

    <Link
      href={`/career/${career.id}`}
      className="
      px-10
      py-4

      rounded-2xl

      bg-gradient-to-r
      from-fuchsia-500
      to-purple-600

      text-white

      font-bold

      text-lg

      hover:scale-105

      transition-all
      duration-300
      "
    >

      Explore Career â†’

    </Link>

    <button
      className="
      w-16
      h-16

      rounded-2xl

      bg-white/10

      backdrop-blur-xl

      border border-white/10

      text-2xl

      hover:bg-white/20
      hover:scale-105

      transition-all
      duration-300
      "
    >

      â™¡

    </button>

  </motion.div>

</motion.div>

    {/* PREVIEW STRIP */}

    <div
      className="
      absolute

      right-14
      bottom-24

      flex
      items-center

      gap-4

      z-30
      "
    >

      {trendingCareers.map(
        (
          item: any,
          index: number
        ) => (

          <div
            key={index}
            onClick={() =>
              setCurrent(index)
            }
            className={`
            relative

            overflow-hidden

            cursor-pointer

            rounded-2xl

            transition-all
            duration-500

            ${
              current === index
                ? "w-[150px] h-[85px] scale-110 border-2 border-white shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                : "w-[115px] h-[68px] opacity-60 hover:opacity-100"
            }
            `}
          >

            <img
              src={
                item.hero_image ||
                "/images/default.jpg"
              }
              alt={
                item.title
              }
              className="
              w-full
              h-full

              object-cover
              "
            />

            <div
              className="
              absolute
              inset-0

              bg-black/30
              "
            />

            <p
              className="
              absolute

              bottom-2
              left-2

              text-xs

              font-semibold

              text-white
              "
            >

              {item.title}

            </p>

          </div>

        )

      )}

    </div>

  </div>
</div>
</div>

    </section>

  );

}
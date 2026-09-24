"use client";

import Link from "next/link";

type Props = {
  title: string;
  demand: string;
  salary?: string;
  tagline?: string;
  slug: string;

  image?: string;

  primaryColor?: string;
  secondaryColor?: string;

  category?: string;
};

export default function CareerCard({
  title,
  demand,
  salary,
  tagline,
  slug,

  image,

  primaryColor = "#d946ef",
  secondaryColor = "#9333ea",

  category = "Future Career",
}: Props) {

  return (
    <Link
      href={`/career/${slug}`}
      className="
      group
      relative
      overflow-hidden

      rounded-[42px]

      min-h-[400px]

      border border-white/10

      bg-black

      flex
      flex-col
      justify-between

      transition-all
      duration-700

      hover:scale-[1.02]
      hover:border-white/20

      shadow-[0_20px_90px_rgba(0,0,0,0.55)]
      "
    >

      {/* CINEMATIC IMAGE */}

      <img
        src={image || "/images/default.jpg"}
        alt={title}
        className="
        absolute
        inset-0

        w-full
        h-full

        object-cover

        scale-100

        group-hover:scale-110

        transition-transform
        duration-[1800ms]
        ease-out
        "
      />

      {/* ATMOSPHERIC OVERLAY */}

      <div
        className="
        absolute
        inset-0

        bg-gradient-to-t
        from-black/85
        via-black/10
        to-transparent
        "
      />

      {/* CINEMATIC HOVER GLOW */}

      <div
        className="
        absolute
        inset-0

        opacity-0
        group-hover:opacity-100

        transition
        duration-700
        "
        style={{
          background: `
          radial-gradient(
            circle at center,
            ${primaryColor}20,
            transparent 65%
          )
          `,
        }}
      />

      {/* CONTENT */}

      <div
        className="
        relative
        z-10

        h-full

        flex
        flex-col
        justify-between

        p-8
        "
      >

        {/* TOP SECTION */}

        <div>

          {/* CATEGORY */}

          <p
            className="
            uppercase

            tracking-[0.4em]

            text-[11px]

            text-fuchsia-300/90

            mb-6
            "
          >
            {category}
          </p>

          {/* TITLE */}

          <h2
            className="
            text-4xl

            font-black

            leading-[0.88]

            tracking-[-0.07em]

            max-w-[280px]

            text-white

            drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]
            "
          >
            {title}
          </h2>

          {/* EMOTIONAL ONE LINER */}

          <p
            className="
            mt-6

            text-zinc-200

            text-[17px]

            leading-relaxed

            max-w-[320px]

            drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]
            "
          >
            {tagline ||
              "Build the intelligent systems shaping the future of humanity."}
          </p>

          {/* FUTURE TAGS */}

          <div className="flex flex-wrap gap-2 mt-7">

            <div
              className="
              px-3 py-1.5

              rounded-full

              bg-white/10

              backdrop-blur-md

              border border-white/10

              text-xs
              text-white/85
              "
            >
              Future Ready
            </div>

            <div
              className="
              px-3 py-1.5

              rounded-full

              bg-white/10

              backdrop-blur-md

              border border-white/10

              text-xs
              text-white/85
              "
            >
              High Demand
            </div>

            <div
              className="
              px-3 py-1.5

              rounded-full

              bg-white/10

              backdrop-blur-md

              border border-white/10

              text-xs
              text-white/85
              "
            >
              Remote Friendly
            </div>

          </div>

        </div>

        {/* HOVER REVEAL PANEL */}

        <div
          className="
          translate-y-16
          opacity-0

          group-hover:translate-y-0
          group-hover:opacity-100

          transition-all
          duration-700
          ease-out
          "
        >

          <div
            className="
            rounded-[30px]

            border border-white/10

            bg-black/10

            backdrop-blur-md

            p-4
            "
          >

            {/* STATS */}

            <div className="space-y-3 mb-6">

              <div>

                <p className="text-zinc-500 text-sm mb-1">
                  Future Salary
                </p>

                <h3 className="text-2xl font-black text-white">
                  {salary || "â‚¹10L - â‚¹45L"}
                </h3>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">
                    Industry Demand
                  </p>

                  <p className="text-green-400 font-semibold mt-1">
                    {demand}
                  </p>

                </div>

                <div>

                  <p className="text-zinc-500 text-sm">
                    Difficulty
                  </p>

                  <p className="text-white font-semibold mt-1">
                    Advanced
                  </p>

                </div>

              </div>

            </div>

            {/* CTA */}

            <div
              className="
              w-full

              py-4

              rounded-full

              text-center

              text-white
              font-semibold

              transition-all
              duration-300

              group-hover:scale-[1.02]

              shadow-[0_10px_40px_rgba(0,0,0,0.45)]
              "
              style={{
                background: `
                linear-gradient(
                  135deg,
                  ${primaryColor},
                  ${secondaryColor}
                )
                `,
              }}
            >
              Enter Future
            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}
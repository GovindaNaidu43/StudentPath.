"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Career {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  salary: string;
  demand: string;
  hero_image?: string;
  primary_color?: string;
  secondary_color?: string;
}

interface Props {
  category: string;
  items: any[];
  type?: "career" | "exam";
}

export default function ContentRow({
  category,
  items,
  type = "career",
}: Props) {

  return (

    <section className="mt-12 md:mt-20">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-0 md:mb-0">

        <div>

          <h2
            className="
            text-xl
            md:text-4xl

            font-black

            tracking-[-0.04em]
            "
          >
            {category}
          </h2>

          <p
            className="
            text-zinc-500

            text-xs
            md:text-sm

            mt-1
            "
          >
            Explore futuristic opportunities
          </p>

        </div>

        <button
          className="
          text-fuchsia-400

          hover:text-fuchsia-300

          transition

          text-xs
          md:text-sm

          font-medium
          "
        >
          View All
        </button>

      </div>

      {/* ROW */}

      <div
        className="
        flex

        gap-3
        md:gap-6

        overflow-x-auto
        overflow-y-hidden

        pt-5
        md:pt-7

        pb-7
        md:pb-12

        snap-x snap-mandatory

        scrollbar-hide
        "
      >

        {items.map((item, index) => (

          <Link
            key={index}
            href={type === "career" ? `/career/${item.slug}` : `/exam/${item.slug}`}
            className="block snap-center"
          >

            {/* MOBILE CARD */}

            <div
              className="
              md:hidden

              relative

              min-w-[150px]
              h-[250px]

              rounded-[7px]

              overflow-hidden

              border border-white/10

              bg-black
              "
            >

              {/* IMAGE */}

              <img
                src={
                  item.hero_image ||
                  "/images/default.jpg"
                }
                alt={item.title}
                className="
                absolute inset-0

                w-full h-full

                object-cover
                "
              />

              {/* OVERLAY */}

              <div
                className="
                absolute inset-0

                bg-gradient-to-t
                from-black/90
                via-black/20
                to-transparent
                "
              />

              {/* HEART */}

              <div
                className="
                absolute

                top-3
                right-3

                w-8 h-8

                rounded-full

                bg-black/40

                backdrop-blur-md

                border border-white/10

                flex items-center justify-center

                text-white
                text-sm

                z-20
                "
              >
                â™¡
              </div>

              {/* CONTENT */}

              <div
                className="
                relative z-10

                h-full

                flex flex-col justify-end

                p-4
                "
              >

                <h3
                  className="
                  text-2xl

                  font-black

                  leading-[0.95]

                  tracking-[-0.05em]

                  text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                  text-fuchsia-400

                  text-sm

                  mt-2
                  "
                >
                  {item.demand}
                </p>

              </div>

            </div>

            {/* DESKTOP CARD */}

<motion.div

  whileHover={{
    scale: 1.12,
  }}

  transition={{
    duration: 0.28,
    ease: "easeOut",
  }}

  style={{
    transformOrigin: "center center",
  }}

  className="
  hidden md:block

  relative

  w-[260px]
  h-[360px]

  rounded-[30px]

  overflow-visible

  bg-transparent

  group

  z-10
  hover:z-50

  transition-all
  duration-300
  ease-out
  "
>

  {/* CARD */}

  <div
    className="
    relative

    w-full
    h-full

    rounded-[7px]

    overflow-hidden

    border border-white/5
    group-hover:border-white/10

    bg-[#070b16]

    group-hover:border-white/80

    group-hover:shadow-[0_0_8px_rgba(255,255,255,0.75),0_0_18px_rgba(255,255,255,0.18)]

transition-all
duration-300
    "
  >

    {/* IMAGE */}

    <img
      src={
        item.hero_image ||
        "/images/default.jpg"
      }
      alt={item.title}
      className="
      absolute inset-0

      w-full h-full

      object-cover

      group-hover:scale-105

      transition-transform
      duration-500
      "
    />

    {/* OVERLAY */}

    <div
      className="
      absolute inset-0

      bg-gradient-to-t
      from-black
      via-black/50
      to-transparent
      "
    />

    {/* DEFAULT CONTENT */}

    <div
      className="
      absolute

      bottom-0
      left-0
      right-0

      p-5

      group-hover:opacity-0

      transition-all
      duration-200
      "
    >

      <h3
        className="
        text-[2rem]

        font-black

        leading-[0.9]

        tracking-[-0.06em]

        text-white
        "
      >
        {item.title}
      </h3>

    </div>

    {/* HOVER CONTENT */}

    <div
      className="
      absolute inset-0

      opacity-0

      group-hover:opacity-100

      transition-all
      duration-300

      p-5

      flex
      flex-col

      justify-end
      "
    >

      {/* IMAGE AREA */}

      <div
        className="
        absolute

        top-0
        left-0
        right-0

        h-[58%]
        "
      />

      {/* BOTTOM CONTENT */}

      <div className="relative z-20">

        {/* TITLE */}

        <h3
          className="
          text-[1.8rem]

          font-black

          leading-[0.92]

          tracking-[-0.06em]

          text-white
          "
        >
          {item.title}
        </h3>

        {/* META */}

        <div
          className="
          flex
          items-center
          flex-wrap

          gap-2

          mt-3

          text-zinc-300
          text-sm
          font-medium
          "
        >

          <span>2026</span>
          <span>â€¢</span>

          <span>
            {item.category}
          </span>

          <span>â€¢</span>

          <span>
            {item.demand}
          </span>

        </div>

        {/* DESCRIPTION */}

        <p
          className="
          mt-4

          text-zinc-200

          text-[12px]

          leading-relaxed

          line-clamp-3

          max-w-[95%]
          "
        >

          {item.description}

        </p>

        {/* BUTTONS */}

        <div
          className="
          flex
          items-center

          gap-3

          mt-6
          "
        >

          {/* EXPLORE */}

          <button
            className="
            flex-1

            h-[38px]

            rounded-lg

            bg-white

            text-black

            font-bold

            text-lg

            hover:scale-[1.02]

            transition-all
            duration-200
            "
          >

            Explore Career â†’

          </button>

          {/* SAVE */}

          <button
            className="
            w-[38px]
            h-[38px]

            rounded-lg

            bg-zinc-900/95

            border border-white/10

            backdrop-blur-xl

            flex
            items-center
            justify-center

            text-white

            text-3xl

            hover:bg-zinc-800

            transition-all
            duration-200
            "
          >

            â™¡

          </button>

        </div>

      </div>

    </div>

  </div>

</motion.div>

          </Link>

        ))}

      </div>

    </section>

  );

}
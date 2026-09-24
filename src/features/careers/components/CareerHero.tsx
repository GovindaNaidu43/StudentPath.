"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  tagline: string;
  salary: string;
  demand: string;

  video?: string;
  image?: string;

  primaryColor?: string;
  secondaryColor?: string;

  difficulty?: string;
  futureScope?: string;
};

export default function CareerHero({
  title,
  tagline,
  salary,
  demand,

  video = "/videos/default.mp4",
  image = "/images/default.jpg",

  primaryColor = "#d946ef",
  secondaryColor = "#9333ea",

  difficulty,
  futureScope,
}: Props) {
  console.log("New Hero Loaded!");

  return (
    <section
      className="
      relative
      min-h-[115vh]
      overflow-hidden
      bg-black
      flex items-end
      "
    >
      {/* BACKGROUND IMAGE */}

      <img
        src={image}
        alt={title}
        className="
        absolute inset-0
        w-full h-full
        object-cover
        scale-105
        "
      />

      {/* VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
        absolute inset-0
        w-full h-full
        object-cover
        scale-110
        brightness-[1.15]
        contrast-[1.05]
        saturate-[1.15]
        "
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}

      <div
        className="
        absolute inset-0
        bg-black/35
        "
      />

      {/* DEPTH OVERLAY */}

      <div
        className="
        absolute inset-0
        bg-gradient-to-b
        from-black/10
        via-black/30
        to-black/80
        "
      />

      {/* SIDE SHADOW */}

      <div
        className="
        absolute inset-0
        bg-gradient-to-r
        from-black/70
        via-black/20
        to-transparent
        "
      />

      {/* GLOW */}

      <div
        className="
        absolute
        top-[-250px]
        left-1/2
        -translate-x-1/2
        w-[1000px]
        h-[1000px]
        rounded-full
        blur-[220px]
        "
        style={{
          background: `radial-gradient(circle, ${primaryColor}88 0%, transparent 70%)`,
        }}
      />

      {/* PARTICLES */}

      <div
        className="
        absolute
        inset-0
        opacity-30
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_1px,transparent_1px)]
        bg-[size:32px_32px]
        "
      />

      {/* CONTENT */}

      <div
        className="
        relative z-20
        w-full
        px-6 lg:px-20
        pb-24
        pt-32 lg:pt-40
        "
      >
        <div className="max-w-7xl mx-auto">
          {/* LABEL */}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
            uppercase
            tracking-[0.45em]
            text-fuchsia-400
            text-xs
            mb-6
            "
          >
            Future Career Path
          </motion.p>

          {/* TITLE */}

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.1,
            }}
            className="
            text-5xl
            md:text-7xl
            lg:text-[110px]
            font-black
            leading-[0.9]
            tracking-[-0.06em]
            max-w-4xl
            "
          >
            {title}
          </motion.h1>

          {/* TAGLINE */}

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            className="
            mt-8
            text-zinc-300
            text-lg
            md:text-2xl
            leading-relaxed
            max-w-2xl
            "
          >
            {tagline}
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            className="
            flex flex-wrap gap-5 mt-10
            "
          >
            <button
              className="
              px-8 py-4
              rounded-full
              transition
              font-semibold
              shadow-[0_0_40px_rgba(217,70,239,0.45)]
              "
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              Start Journey
            </button>

            <button
              className="
              px-8 py-4
              rounded-full
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              hover:bg-white/10
              transition
              "
            >
              Explore Paths
            </button>
          </motion.div>

          {/* STATS */}

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
            }}
            className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-5
            mt-16
            "
          >
            {/* SALARY */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
              <p className="text-zinc-400 text-sm">
                Average Salary
              </p>

              <h3 className="text-3xl font-black mt-3">
                {salary}
              </h3>

              <p className="text-zinc-500 text-sm mt-2">
                Entry to senior level
              </p>
            </div>

            {/* DEMAND */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
              <p className="text-zinc-400 text-sm">
                Job Demand
              </p>

              <h3 className="text-3xl font-black mt-3 text-green-400">
                {demand}
              </h3>

              <p className="text-zinc-500 text-sm mt-2">
                Growing globally
              </p>
            </div>

            {/* DIFFICULTY */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
              <p className="text-zinc-400 text-sm">
                Difficulty
              </p>

              <h3 className="text-3xl font-black mt-3 text-cyan-400">
                {difficulty || "Medium"}
              </h3>

              <p className="text-zinc-500 text-sm mt-2">
                Requires consistency
              </p>
            </div>

            {/* FUTURE */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
              <p className="text-zinc-400 text-sm">
                Future Scope
              </p>

              <h3 className="text-3xl font-black mt-3 text-purple-400">
                {futureScope || "Excellent"}
              </h3>

              <p className="text-zinc-500 text-sm mt-2">
                Expanding opportunities
              </p>
            </div>
          </motion.div>

          {/* SCROLL INDICATOR */}

          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="
            mt-20
            flex
            justify-center
            "
          >
            <div
              className="
              w-8 h-14
              rounded-full
              border border-white/20
              flex justify-center
              p-2
              "
            >
              <div
                className="
                w-2 h-2
                rounded-full
                bg-white
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
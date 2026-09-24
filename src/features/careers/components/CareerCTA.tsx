"use client";

import { motion } from "framer-motion";

export default function CareerCTA() {
  return (
    <section className="relative py-40 px-6 overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}

      <div
        className="
        absolute
        inset-0
        "
      >
        <img
          src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2"
          alt="future"
          className="
          w-full
          h-full
          object-cover
          opacity-60
          "
        />
      </div>

      {/* DARK OVERLAY */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-black
        via-black/40
        to-black
        "
      />

      {/* GLOW */}

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

      {/* CONTENT */}

      <div
        className="
        relative
        z-10
        max-w-5xl
        mx-auto
        text-center
        "
      >

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          uppercase
          tracking-[0.4em]
          text-fuchsia-400
          text-sm
          mb-8
          "
        >
          Your Journey Begins
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="
          text-5xl
          md:text-7xl
          font-black
          leading-tight
          "
        >
          Every Expert
          <br />
          Was Once
          <span
            className="
            bg-gradient-to-r
            from-fuchsia-400
            via-purple-400
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >
            {" "}A Beginner
          </span>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="
          mt-10
          text-zinc-300
          text-xl
          leading-relaxed
          max-w-3xl
          mx-auto
          "
        >
          The future belongs to those who start before they feel ready.
          Your career journey begins with a single step.
        </motion.p>

        {/* BUTTONS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          className="
          flex
          flex-wrap
          justify-center
          gap-6
          mt-14
          "
        >

          <button
            className="
            px-10
            py-5
            rounded-full
            bg-gradient-to-r
            from-fuchsia-500
            to-purple-500
            text-white
            font-semibold
            text-lg
            shadow-[0_0_40px_rgba(217,70,239,0.5)]
            hover:scale-105
            transition
            "
          >
            Start Your Journey
          </button>

          <button
            className="
            px-10
            py-5
            rounded-full
            border
            border-white/20
            bg-white/5
            backdrop-blur-xl
            text-white
            font-semibold
            text-lg
            hover:bg-white/10
            transition
            "
          >
            Explore More Careers
          </button>

        </motion.div>

      </div>

    </section>
  );
}
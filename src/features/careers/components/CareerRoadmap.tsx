"use client";

import { motion } from "framer-motion";

type Props = {
  roadmap: string[];
};

export default function CareerRoadmap({
  roadmap,
}: Props) {

  return (

    <section className="
    relative
    py-40
    px-6 lg:px-20
    bg-black
    overflow-hidden
    ">

      {/* Background Glow */}
      <div className="
      absolute
      top-1/2 left-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[900px]
      h-[900px]
      rounded-full
      bg-fuchsia-500/10
      blur-[220px]
      " />

      <div className="
      relative z-10
      max-w-5xl
      mx-auto
      ">

        {/* Heading */}
        <div className="text-center mb-28">

          <p className="
          uppercase
          tracking-[0.4em]
          text-fuchsia-400
          text-sm
          mb-6
          ">
            Career Roadmap
          </p>

          <h2 className="
          text-5xl lg:text-7xl
          font-black
          ">
            Your Future Path
          </h2>

        </div>

        {/* Roadmap */}
        <div className="
        relative
        flex
        flex-col
        gap-24
        ">

          {/* Vertical Line */}
          <div className="
          absolute
          left-1/2
          top-0
          -translate-x-1/2
          w-[4px]
          h-full
          bg-white/10
          rounded-full
          overflow-hidden
          ">

            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{
                duration: 2,
              }}
              className="
              w-full
              bg-gradient-to-b
              from-fuchsia-500
              to-purple-500
              "
            />

          </div>

          {/* Steps */}
          {roadmap.map((step, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
              }}
              className={`
              relative
              flex
              ${
                index % 2 === 0
                ? "justify-start"
                : "justify-end"
              }
              `}
            >

              {/* Node */}
              <div className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-8 h-8
              rounded-full
              bg-fuchsia-500
              shadow-[0_0_30px_rgba(217,70,239,0.8)]
              z-20
              " />

              {/* Card */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -6,
                }}
                className="
                w-[42%]
                rounded-[32px]
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-8
                shadow-[0_0_50px_rgba(255,255,255,0.03)]
                "
              >

                <p className="
                text-zinc-500
                uppercase
                tracking-[0.3em]
                text-xs
                mb-4
                ">
                  Step {index + 1}
                </p>

                <h3 className="
                text-3xl
                font-black
                leading-snug
                ">
                  {step}
                </h3>

              </motion.div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
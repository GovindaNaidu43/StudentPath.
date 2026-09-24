"use client";

import { motion } from "framer-motion";

type Props = {
  salary: string;
  demand: string;
  difficulty: string;
  competition: string;
  futureScope: string;
  skills: string[];
};

export default function CareerDashboard({
  salary,
  demand,
  difficulty,
  competition,
  futureScope,
  skills,
}: Props) {

  return (

    <section className="
    relative
    py-40
    px-8 lg:px-20
    overflow-hidden
    bg-black
    ">

      {/* Glow */}
      <div className="
      absolute
      top-0 left-1/2
      -translate-x-1/2
      w-[700px]
      h-[700px]
      bg-fuchsia-500/10
      blur-[180px]
      rounded-full
      " />

      <div className="
      relative z-10
      max-w-7xl
      mx-auto
      ">

        {/* Heading */}
        <div className="text-center mb-24">

          <p className="
          uppercase
          tracking-[0.4em]
          text-fuchsia-400
          text-sm
          mb-6
          ">
            Career Intelligence
          </p>

          <h2 className="
          text-5xl lg:text-7xl
          font-black
          ">
            AI Career Analysis
          </h2>

        </div>

        {/* GRID */}
        <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        ">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* Salary */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
              rounded-[36px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-8
              "
            >

              <p className="
              text-zinc-400
              uppercase
              tracking-[0.2em]
              text-sm
              ">
                Salary Potential
              </p>

              <h3 className="
              text-6xl
              font-black
              mt-5
              ">
                {salary}
              </h3>

              <div className="
              mt-8
              h-4
              rounded-full
              bg-white/10
              overflow-hidden
              ">

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  transition={{ duration: 1.4 }}
                  className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-fuchsia-500
                  to-purple-500
                  "
                />

              </div>

            </motion.div>

            {/* Difficulty */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
              rounded-[36px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-8
              "
            >

              <p className="
              text-zinc-400
              uppercase
              tracking-[0.2em]
              text-sm
              ">
                Difficulty Level
              </p>

              <h3 className="
              text-5xl
              font-black
              mt-5
              ">
                {difficulty}
              </h3>

              <div className="
              mt-8
              flex gap-3
              ">

                {[1,2,3,4,5].map((item) => (

                  <div
                    key={item}
                    className={`
                    h-4 flex-1 rounded-full
                    ${
                      item <= 4
                      ? "bg-fuchsia-500"
                      : "bg-white/10"
                    }
                    `}
                  />

                ))}

              </div>

            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* Demand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
              rounded-[36px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-8
              "
            >

              <p className="
              text-zinc-400
              uppercase
              tracking-[0.2em]
              text-sm
              ">
                Industry Demand
              </p>

              <h3 className="
              text-6xl
              font-black
              mt-5
              text-fuchsia-400
              ">
                {demand}
              </h3>

              <p className="
              text-zinc-400
              mt-5
              text-lg
              ">
                Global demand for AI Engineers is growing rapidly.
              </p>

            </motion.div>

            {/* Competition */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
              rounded-[36px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-8
              "
            >

              <p className="
              text-zinc-400
              uppercase
              tracking-[0.2em]
              text-sm
              ">
                Competition
              </p>

              <h3 className="
              text-5xl
              font-black
              mt-5
              ">
                {competition}
              </h3>

              <div className="
              mt-8
              flex gap-2
              ">

                {[1,2,3,4,5].map((item) => (

                  <div
                    key={item}
                    className={`
                    h-5 flex-1 rounded-full
                    ${
                      item <= 5
                      ? "bg-red-500"
                      : "bg-white/10"
                    }
                    `}
                  />

                ))}

              </div>

            </motion.div>

          </div>

        </div>

        {/* FUTURE SCOPE */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
          mt-10
          rounded-[40px]
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-10
          "
        >

          <p className="
          uppercase
          tracking-[0.3em]
          text-fuchsia-400
          text-sm
          mb-6
          ">
            Future Scope
          </p>

          <p className="
          text-2xl
          leading-relaxed
          text-zinc-300
          ">
            {futureScope}
          </p>

        </motion.div>

        {/* SKILLS */}
        <div className="mt-20">

          <h3 className="
          text-4xl
          font-black
          mb-10
          text-center
          ">
            Core Skills
          </h3>

          <div className="
          flex flex-wrap
          justify-center
          gap-5
          ">

            {skills.map((skill, index) => (

              <motion.div
                key={index}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                }}
                className="
                px-8 py-4
                rounded-full
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                text-lg
                shadow-[0_0_40px_rgba(255,255,255,0.03)]
                "
              >
                {skill}
              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
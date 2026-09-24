"use client";

import { motion } from "framer-motion";


export default function CareerScenes({
  scenes
}: {
  scenes: any[];
}) {
  return (
    <section className="
    relative
    py-40
    bg-black
    overflow-hidden
    ">

      {/* Glow */}
      <div className="
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[800px]
      h-[800px]
      rounded-full
      bg-fuchsia-500/10
      blur-[180px]
      " />

      <div className="
      relative
      z-10
      max-w-7xl
      mx-auto
      px-6
      ">

        {/* Heading */}
        <div className="mb-20">

          <p className="
          uppercase
          tracking-[0.4em]
          text-fuchsia-400
          text-sm
          mb-6
          ">
            Daily Experience
          </p>

          <h2 className="
          text-5xl
          lg:text-7xl
          font-black
          leading-tight
          ">
            What This Career
            <br />
            Feels Like
          </h2>

        </div>

        {/* Cards */}
        <div
  className="
  flex
  gap-6

  overflow-x-auto
  [scrollbar-width:none]
[-ms-overflow-style:none]
  snap-x
  snap-mandatory

  pb-4

  md:grid
  md:grid-cols-2

  xl:grid-cols-4
  "
>

          {scenes.map((scene, index) => (

            <motion.div
              key={scene.title}
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
              }}
              className="
group
relative

w-[85vw]
flex-shrink-0

md:w-auto

h-[500px]

rounded-[32px]

overflow-hidden

border
border-white/10

snap-center
"
            >

              {/* Background Image */}
              <motion.img
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.6,
                }}
                src={scene.image_url || "/images/default-scene.jpg"}
                alt={scene.title}
                className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                "
              />

              {/* Overlay */}
              <div className="
              absolute
              inset-0
              bg-gradient-to-b
              from-black/10
              via-black/30
              to-black
              " />

              {/* Content */}
              <div className="
              absolute
              bottom-0
              p-8
              z-10
              ">

                <p className="
                uppercase
                tracking-[0.3em]
                text-fuchsia-400
                text-xs
                mb-4
                ">
                  Scene {index + 1}
                </p>

                <h3 className="
                text-3xl
                font-black
                mb-4
                ">
                  {scene.title}
                </h3>

                <p className="
                text-zinc-300
                leading-relaxed
                ">
                  {scene.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}
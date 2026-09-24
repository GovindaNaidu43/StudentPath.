"use client";

import { motion } from "framer-motion";

type Props = {
  roles: any[];
};

export default function CareerFuture({
  roles,
}: Props) {

  if (!roles?.length) return null;

  return (

    <section className="relative py-32 px-6 lg:px-20 bg-black overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        bottom-[-300px]
        left-1/2
        -translate-x-1/2
        w-[1000px]
        h-[1000px]
        rounded-full
        bg-purple-500/10
        blur-[200px]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="mb-20">

          <p
            className="
            uppercase
            tracking-[0.4em]
            text-fuchsia-400
            text-sm
            mb-6
            "
          >
            Future Opportunities
          </p>

          <h2
            className="
            text-5xl
            md:text-7xl
            font-black
            leading-none
            "
          >
            Where This Career
            <br />
            Can Take You
          </h2>

        </div>

        {/* FUTURE CARDS */}

        <div
          className="
          flex
          gap-8
          overflow-x-auto
          pb-6
          scrollbar-hide
          "
        >

          {roles.map(
            (
              role,
              index
            ) => (

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
                relative
                min-w-[340px]
                h-[440px]
                rounded-[36px]
                overflow-hidden
                border
                border-white/10
                group
                "
              >

                {/* IMAGE */}

                <img
                  src={
                    role.image_url ||
                    "/images/default.jpg"
                  }
                  alt={role.role_name}
                  className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-700
                  "
                />

                {/* OVERLAY */}

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/40
                  to-transparent
                  "
                />

                {/* CONTENT */}

                <div
                  className="
                  relative
                  z-10
                  h-full
                  flex
                  flex-col
                  justify-end
                  p-8
                  "
                >

                  <p
                    className="
                    uppercase
                    tracking-[0.3em]
                    text-fuchsia-400
                    text-xs
                    mb-4
                    "
                  >
                    Future Role
                  </p>

                  <h3
                    className="
                    text-4xl
                    font-black
                    leading-tight
                    "
                  >
                    {role.role_name}
                  </h3>

                  <p
                    className="
                    mt-5
                    text-zinc-300
                    leading-relaxed
                    "
                  >
                    {role.short_description}
                  </p>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>

  );

}
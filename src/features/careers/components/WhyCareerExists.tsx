type Props = {
  blocks: any[];
};

export default function WhyCareerExists({
  blocks,
}: Props) {

  if (!blocks?.length) return null;

  return (

    <section className="py-32">

      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION LABEL */}

        <p
          className="
          uppercase
          tracking-[0.4em]
          text-fuchsia-400
          text-sm
          mb-6
          "
        >
          FOUNDATION
        </p>

        {/* TITLE */}

        <h2
          className="
          text-6xl
          md:text-7xl

          font-black

          leading-[0.9]

          tracking-[-0.05em]

          mb-20
          "
        >
          Why This Career
          <br />
          Exists
        </h2>

        {/* CARDS */}

        <div className="grid gap-10">

          {blocks.map((block, index) => (

            <div
              key={index}
              className="
              relative
              p-[1px]

              rounded-[32px]

              overflow-hidden

              group
              "
            >

              {/* ANIMATED RAINBOW BORDER */}

              <div
                className="
                absolute

                inset-[-150%]

                animate-[spin_10s_linear_infinite]

                bg-[conic-gradient(from_0deg,transparent,rgba(0,255,255,0.9),rgba(255,0,255,0.9),rgba(255,170,0,0.9),rgba(0,255,255,0.9),transparent)]
                "
              />

              {/* GLOW EFFECTS */}

              <div
                className="
                absolute
                inset-0

                opacity-0

                group-hover:opacity-100

                transition-opacity
                duration-700
                "
              >

                <div
                  className="
                  absolute

                  -top-24
                  right-0

                  w-72
                  h-72

                  bg-fuchsia-500/20

                  blur-[120px]
                  "
                />

                

                <div
                  className="
                  absolute

                  -bottom-24
                  left-0

                  w-72
                  h-72

                  bg-cyan-500/20

                  blur-[120px]
                  "
                />

              </div>

              {/* INNER CARD */}

              <div
                className="
                relative

                rounded-[31px]

                bg-[#050505]/95

                backdrop-blur-2xl

                p-12 md:p-14
                pl-28 md:pl-40
min-h-[260px]

                transition-all
                duration-500

                group-hover:scale-[1.01]
                "
              >

                <div
  className="
  absolute
  top-0
  right-0

  w-80
  h-80

  bg-fuchsia-500/10

  blur-[140px]

  pointer-events-none
  "
/>

{/* HUGE OUTLINE NUMBER */}

<div
  className="
  absolute

  -left-5
  top-1/2

  -translate-y-1/2

  text-[220px]
  md:text-[280px]

  font-black

  leading-none

  text-transparent

  [-webkit-text-stroke:2px_rgba(255,255,255,0.18)]

  select-none

  pointer-events-none

  z-0
  "
>
  {index + 1}
</div>
               
                {/* HEADING */}

                <h3
                  className="
                  text-3xl
                  md:text-4xl

                  font-bold

                  text-white

                  mb-6
                  "
                >
                  {block.heading}
                </h3>

                {/* CONTENT */}

                <p
                  className="
                  text-zinc-400

                  text-lg

                  leading-relaxed
                  "
                >
                  {block.content}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}
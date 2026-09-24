import MobileBottomNav from "@/components/navigation/MobileBottomNav";

export default function CollegesPage() {

  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      overflow-x-hidden
      relative
      "
    >

      {/* BACKGROUND */}

      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_35%)]

        pointer-events-none
        "
      />

      <section
        className="
        relative z-10

        px-5
        pt-8
        pb-32
        "
      >

        {/* TITLE */}

        <div className="mb-10">

          <p
            className="
            text-fuchsia-400
            text-sm
            tracking-[0.3em]
            uppercase
            mb-3
            "
          >
            Future Universities
          </p>

          <h1
            className="
            text-5xl
            font-black
            tracking-[-0.06em]
            "
          >
            Colleges
          </h1>

        </div>

        {/* COLLEGE CARDS */}

        <div className="space-y-5">

          {[
            "MIT",
            "Stanford",
            "Harvard",
            "Oxford",
            "IIT Bombay",
          ].map((college) => (

            <div
              key={college}
              className="
              rounded-[30px]

              border border-white/10

              bg-white/[0.05]

              backdrop-blur-2xl

              p-6

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:border-fuchsia-500/30
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                "
              >
                {college}
              </h2>

              <p
                className="
                mt-2
                text-zinc-400
                "
              >
                Explore futuristic learning pathways and career systems.
              </p>

            </div>

          ))}

        </div>

      </section>

      <MobileBottomNav />

    </main>

  );

}
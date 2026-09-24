type Props = {

  data: {

    title: string;

    category: string;

    description: string;

    salary: string;

    demand: string;

    difficulty: string;

    primary_color: string;

    secondary_color: string;

    hero_image: string;

  };

};

export default function LivePreviewPanel({
  data,
}: Props) {

  return (

    <div
      className="
      sticky
      top-28
      "
    >

      <div
        className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-black
        min-h-[850px]
        "
      >

        {/* IMAGE */}

        <div
          className="
          absolute
          inset-0
          "
        >

          <img
            src={
              data.hero_image ||
              "/images/default.jpg"
            }
            alt={data.title}
            className="
            w-full
            h-full
            object-cover
            scale-105
            "
          />

          {/* OVERLAYS */}

          <div
            className="
            absolute
            inset-0
            bg-black/50
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/20
            via-black/40
            to-black
            "
          />

        </div>

        {/* GLOW */}

        <div
          className="
          absolute
          top-[-200px]
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          rounded-full
          blur-[160px]
          opacity-60
          "
          style={{
            background: `radial-gradient(circle, ${data.primary_color} 0%, transparent 70%)`,
          }}
        />

        {/* CONTENT */}

        <div
          className="
          relative
          z-10
          p-10
          flex
          flex-col
          justify-end
          min-h-[850px]
          "
        >

          {/* LABEL */}

          <div
            className="
            uppercase
            tracking-[0.4em]
            text-fuchsia-400
            text-xs
            mb-6
            "
          >
            Live Preview
          </div>

          {/* TITLE */}

          <h1
            className="
            text-5xl
            xl:text-6xl
            font-black
            leading-[0.9]
            tracking-[-0.05em]
            mb-6
            "
          >
            {data.title || "Career Title"}
          </h1>

          {/* CATEGORY */}

          <div
            className="
            inline-flex
            w-fit
            px-5
            py-3
            rounded-full
            border
            border-white/10
            bg-white/10
            backdrop-blur-xl
            mb-8
            "
          >
            {data.category || "Future Career"}
          </div>

          {/* DESCRIPTION */}

          <p
            className="
            text-zinc-300
            text-lg
            leading-relaxed
            max-w-2xl
            mb-12
            "
          >
            {data.description ||
              "Career description preview will appear here."}
          </p>

          {/* STATS */}

          <div
            className="
            grid
            grid-cols-2
            gap-5
            "
          >

            <div
              className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.06]
              backdrop-blur-2xl
              p-6
              "
            >

              <p className="text-zinc-400 text-sm">
                Salary
              </p>

              <h3
                className="
                text-3xl
                font-black
                mt-3
                "
              >
                {data.salary || "N/A"}
              </h3>

            </div>

            <div
              className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.06]
              backdrop-blur-2xl
              p-6
              "
            >

              <p className="text-zinc-400 text-sm">
                Demand
              </p>

              <h3
                className="
                text-3xl
                font-black
                text-green-400
                mt-3
                "
              >
                {data.demand || "High"}
              </h3>

            </div>

            <div
              className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.06]
              backdrop-blur-2xl
              p-6
              "
            >

              <p className="text-zinc-400 text-sm">
                Difficulty
              </p>

              <h3
                className="
                text-3xl
                font-black
                text-cyan-400
                mt-3
                "
              >
                {data.difficulty || "Medium"}
              </h3>

            </div>

            <div
              className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.06]
              backdrop-blur-2xl
              p-6
              "
            >

              <p className="text-zinc-400 text-sm">
                System
              </p>

              <h3
                className="
                text-3xl
                font-black
                mt-3
                "
              >
                Active
              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
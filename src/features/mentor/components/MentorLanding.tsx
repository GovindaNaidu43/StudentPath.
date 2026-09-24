"use client";

type Props = {
onPromptClick: (
prompt: string
) => void;
};

export default function MentorLanding({
onPromptClick,
}: Props) {

const prompts = [
"AI Engineer",
"Doctor",
"UPSC",
"Data Scientist",
];

return (

<div
  className="
  relative

  min-h-screen

  overflow-hidden

  flex
  flex-col

  items-center
  justify-center

  px-6

  text-white
  "
>

  {/* SPECTRAL BACKGROUND */}

  <div
    className="
    absolute

    inset-0

    -z-10

    overflow-hidden
    "
  >

    {/* Pink Aurora */}

    <div
      className="
      absolute

      top-[-300px]
      left-[-250px]

      w-[900px]
      h-[900px]

      rounded-full

      bg-fuchsia-500/25

      blur-[220px]

      animate-pulse
      "
    />

    {/* Blue Aurora */}

    <div
      className="
      absolute

      bottom-[-300px]
      right-[-250px]

      w-[900px]
      h-[900px]

      rounded-full

      bg-cyan-500/20

      blur-[250px]

      animate-pulse
      "
    />

    {/* Purple Glow */}

    <div
      className="
      absolute

      top-[35%]
      left-[35%]

      w-[500px]
      h-[500px]

      rounded-full

      bg-violet-500/20

      blur-[180px]
      "
    />

    {/* Orange Accent */}

    <div
      className="
      absolute

      top-[15%]
      right-[20%]

      w-[350px]
      h-[350px]

      rounded-full

      bg-orange-400/15

      blur-[150px]
      "
    />

  </div>

  {/* PREMIUM GRAIN */}

  <div
    className="
    absolute

    inset-0

    opacity-[0.025]

    bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)]

    bg-[size:28px_28px]

    -z-10
    "
  />

  {/* HEADING */}

  <h1
    className="
    text-center

    text-5xl
    md:text-7xl

    font-black

    leading-[0.95]

    tracking-tight

    max-w-4xl
    "
  >

    What career
    <br />
    are you looking
    <br />
    for today?

  </h1>

  {/* CHIPS */}

  <div
    className="
    mt-12

    flex
    flex-wrap

    justify-center

    gap-3
    "
  >

    {prompts.map(
      (item) => (

        <button
          key={item}

          onClick={() =>
            onPromptClick(
              `Tell me about ${item}`
            )
          }

          className="
          px-5
          py-3

          rounded-full

          bg-white/[0.04]

          border
          border-white/10

          backdrop-blur-xl

          hover:border-fuchsia-500/40

          hover:bg-white/[0.06]

          transition-all
          "
        >

          {item}

        </button>

      )
    )}

  </div>

</div>

);

}
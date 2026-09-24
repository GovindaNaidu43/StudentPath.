type Props = {
  title: string;
  description: string;
};

export default function ExamHero({
  title,
  description,
}: Props) {

  return (

    <section
      className="
      relative

      min-h-[70vh]

      flex
      items-center

      px-6
      md:px-12
      "
    >

      <div
        className="
        absolute

        inset-0

        bg-gradient-to-b
        from-cyan-500/10
        via-transparent
        to-transparent
        "
      />

      <div
        className="
        relative

        z-10

        max-w-4xl
        "
      >

        <p
          className="
          text-cyan-400

          uppercase

          tracking-[0.3em]

          text-sm

          mb-6
          "
        >
          Competitive Examination
        </p>

        <h1
          className="
          text-6xl
          md:text-8xl

          font-black

          tracking-[-0.08em]

          leading-none
          "
        >
          {title}
        </h1>

        <p
          className="
          mt-8

          text-zinc-300

          text-lg
          md:text-xl

          max-w-3xl
          "
        >
          {description}
        </p>

      </div>

    </section>

  );

}
type Props = {
  overview: string;
};

export default function ExamOverview({
  overview,
}: Props) {

  return (

    <section
      className="
      max-w-5xl

      mx-auto

      px-6
      md:px-0

      py-16
      "
    >

      <p
        className="
        text-cyan-400

        uppercase

        tracking-[0.25em]

        text-sm

        mb-4
        "
      >
        Why This Exam Exists
      </p>

      <h2
        className="
        text-4xl
        md:text-6xl

        font-black

        tracking-[-0.06em]

        mb-8
        "
      >
        Purpose
      </h2>

      <p
        className="
        text-zinc-300

        text-lg
        md:text-xl

        leading-relaxed
        "
      >
        {overview}
      </p>

    </section>

  );

}
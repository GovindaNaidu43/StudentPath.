type Props = {
  qualification?: string;
  streamRequirement?: string;
  attempts?: string;
  ageLimit?: string;
};

export default function ExamEligibility({
  qualification,
  streamRequirement,
  attempts,
  ageLimit,
}: Props) {

  const cards = [
    {
      title: "Qualification",
      value: qualification,
    },
    {
      title: "Required Stream",
      value: streamRequirement,
    },
    {
      title: "Attempts",
      value: attempts,
    },
    {
      title: "Age Limit",
      value: ageLimit,
    },
  ];

  return (

    <section
      className="
      py-16
      md:py-24

      px-6
      md:px-12
      "
    >

      <div className="max-w-6xl mx-auto">

        <p
          className="
          text-cyan-400

          uppercase

          tracking-[0.25em]

          text-sm

          mb-4
          "
        >
          Eligibility
        </p>

        <h2
          className="
          text-4xl
          md:text-6xl

          font-black

          tracking-[-0.06em]

          mb-10
          "
        >
          Can You Apply?
        </h2>

        <div
          className="
          grid

          grid-cols-1
          sm:grid-cols-2

          gap-4
          md:gap-6
          "
        >

          {cards.map((card, index) => (

            <div
              key={index}
              className="
              rounded-3xl

              border border-white/10

              bg-white/[0.03]

              backdrop-blur-sm

              p-6

              transition-all
              duration-300

              hover:border-cyan-400/40
              "
            >

              <p
                className="
                text-zinc-500

                text-sm

                mb-3
                "
              >
                {card.title}
              </p>

              <h3
                className="
                text-xl
                md:text-2xl

                font-bold
                "
              >
                {card.value || "Not Available"}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}
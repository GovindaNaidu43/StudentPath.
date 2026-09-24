"use client";

type Props = {
messages: any[];
loading: boolean;
};

export default function MentorChat({
messages,
loading,
}: Props) {

return (

<div
  className="
  w-full
  max-w-5xl
  mx-auto

  flex
  flex-col

  gap-6
  "
>

  {messages.map(
    (msg, index) => (

      <div
        key={index}
        className={`
        flex
        gap-3

        ${
          msg.role === "user"
            ? "justify-end"
            : "justify-start"
        }
        `}
      >

        {msg.role ===
          "assistant" && (

          <div
            className="
            w-10
            h-10

            rounded-full

            bg-gradient-to-r
            from-fuchsia-500
            to-cyan-500

            shrink-0

            mt-2
            "
          />

        )}

        <div
          className={`
          max-w-[92%]
          md:max-w-[75%]

          rounded-3xl

          px-6
          py-5

          whitespace-pre-wrap

          ${
            msg.role === "user"

              ? `
              bg-gradient-to-r
              from-fuchsia-600
              via-purple-600
              to-pink-600

              text-white

              shadow-[0_0_30px_rgba(217,70,239,0.35)]
              `

              : `
              bg-gradient-to-b
              from-white/[0.08]
              to-white/[0.03]

              border
              border-white/10

              backdrop-blur-xl

              shadow-[0_0_30px_rgba(255,255,255,0.03)]
              `
          }
          `}
        >

          {msg.role ===
            "assistant" && (

            <div
              className="
              text-xs

              text-fuchsia-400

              mb-3

              uppercase

              tracking-widest
              "
            >
              StudentPath AI
            </div>

          )}

          <div
            className="
            leading-relaxed

            text-[15px]
            "
          >
            {msg.content}
          </div>

        </div>

        {msg.role ===
          "user" && (

          <div
            className="
            w-10
            h-10

            rounded-full

            bg-zinc-700

            shrink-0

            mt-2
            "
          />

        )}

      </div>

    )
  )}

  {loading && (

    <div
      className="
      flex
      gap-3

      items-center
      "
    >

      <div
        className="
        w-10
        h-10

        rounded-full

        bg-gradient-to-r
        from-fuchsia-500
        to-cyan-500
        "
      />

      <div
        className="
        bg-white/[0.04]

        border
        border-white/10

        rounded-3xl

        px-6
        py-5

        backdrop-blur-xl
        "
      >

        <div
          className="
          flex
          gap-2
          "
        >

          <div
            className="
            w-2
            h-2

            rounded-full

            bg-fuchsia-500

            animate-bounce
            "
          />

          <div
            className="
            w-2
            h-2

            rounded-full

            bg-fuchsia-500

            animate-bounce

            [animation-delay:150ms]
            "
          />

          <div
            className="
            w-2
            h-2

            rounded-full

            bg-fuchsia-500

            animate-bounce

            [animation-delay:300ms]
            "
          />

        </div>

      </div>

    </div>

  )}

</div>

);

}
"use client";

import { ArrowUp } from "lucide-react";

type Props = {
message: string;
setMessage: (
value: string
) => void;
askMentor: () => void;
loading: boolean;
};

export default function MentorInput({
message,
setMessage,
askMentor,
loading,
}: Props) {

return (

<div
  className="
  fixed

  bottom-6

  left-1/2

  -translate-x-1/2

  w-[92%]

  max-w-[760px]

  z-50
  "
>

  {/* Gradient Border */}

  <div
    className="
    p-[2px]

    rounded-[32px]

    bg-gradient-to-r
    from-cyan-400
    via-fuchsia-500
    to-orange-400
    "
  >

    {/* Inner Card */}

    <div
      className="
      flex

      items-center

      gap-4

      h-[74px]

      px-5

      rounded-[30px]

      bg-[#07111f]/90

      backdrop-blur-2xl
      "
    >

      {/* Input */}

      <input
        value={message}

        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }

        onKeyDown={(e) => {

          if (
            e.key === "Enter"
          ) {

            e.preventDefault();

            askMentor();

          }

        }}

        placeholder="Ask about careers, exams, colleges..."

        className="
        flex-1

        bg-transparent

        outline-none

        text-white

        text-base
        md:text-lg

        placeholder:text-zinc-400
        "
      />

      {/* Send Button */}

      <button
        onClick={askMentor}

        disabled={loading}

        className="
        w-12
        h-12

        rounded-full

        flex

        items-center
        justify-center

        bg-gradient-to-r
        from-fuchsia-500
        to-pink-500

        shadow-[0_0_25px_rgba(217,70,239,0.5)]

        hover:scale-105

        transition-all

        disabled:opacity-50
        "
      >

        <ArrowUp
          size={18}
        />

      </button>

    </div>

  </div>

</div>

);

}
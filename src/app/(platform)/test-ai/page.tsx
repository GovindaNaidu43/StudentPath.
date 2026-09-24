"use client";

import { useState } from "react";

export default function TestAI() {
  const [input, setInput] =
    useState("");

  const [reply, setReply] =
    useState("");

  async function askAI() {
    const res = await fetch(
      "/api/mentor",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      }
    );

    const data =
      await res.json();

    setReply(data.reply);
  }

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl mb-6">
        AI Test
      </h1>

      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        className="border p-3 text-black w-full"
        placeholder="Ask something..."
      />

      <button
        onClick={askAI}
        className="mt-4 px-6 py-3 bg-fuchsia-600 rounded"
      >
        Ask AI
      </button>

      <div className="mt-8 whitespace-pre-wrap">
        {reply}
      </div>
    </div>
  );
}
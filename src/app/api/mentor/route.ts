import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
process.env.GEMINI_API_KEY!
);

export async function POST(
req: Request
) {

try {

const body: unknown = await req.json();
if (!body || typeof body !== "object" || !("messages" in body)) {
  return Response.json({ error: "Invalid request body" }, { status: 400 });
}

const messages = (body as { messages?: unknown }).messages;
if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
  return Response.json({ error: "messages must contain 1 to 20 items" }, { status: 400 });
}

for (const message of messages) {
  if (!message || typeof message !== "object") {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }
  const candidate = message as { role?: unknown; content?: unknown };
  if (
    (candidate.role !== "user" && candidate.role !== "assistant") ||
    typeof candidate.content !== "string" ||
    !candidate.content.trim() ||
    candidate.content.length > 4000
  ) {
    return Response.json({ error: "Invalid message format" }, { status: 400 });
  }
}

const recentMessages =
  messages.slice(-6);

const prompt = `

You are StudentPath AI Mentor.

Your responsibilities:

- Help students choose careers
- Explain exams
- Create realistic roadmaps
- Suggest skills
- Recommend future pathways
- Give practical advice

Rules:

- Keep answers clear
- Use bullet points when useful
- Focus on students
- Be encouraging but realistic

Conversation:

${recentMessages
.map(
(m: { role: string; content: string }) =>
`${m.role}: ${m.content}`
)
.join("\n")}
`;

if (
  prompt.length > 12000
) {

  return Response.json({
    reply:
      "This conversation is becoming too long. Please start a new chat.",
  });

}

const model =
  genAI.getGenerativeModel({
    model:
      "gemini-2.5-flash",
  });

const result =
  await model.generateContent(
    prompt
  );

const reply =
  result.response.text();

return Response.json({
  reply,
});

} catch (error) {

console.error(
  "Mentor Error:",
  error
);

return Response.json(
  { error: "AI is temporarily unavailable. Please try again in a few moments." },
  {
    status: 500,
  }
);

}

}
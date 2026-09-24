import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuthorizationError, requireAdmin } from "@/lib/auth/authorization";
import { requestString } from "@/lib/server-validation";

/* 
  Admin AI Test Route
  POST /api/admin/ai-test
  Body: { prompt: string }
  Returns: { text: string } | { error: string }
*/

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || !("prompt" in body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const prompt = requestString((body as { prompt?: unknown }).prompt, "prompt", 12000);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not set in .env.local. Add it to enable AI features.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err) {
    if (err instanceof AuthorizationError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("AI test route error:", err);
    return NextResponse.json(
      { error: "Unable to complete the AI request" },
      { status: 500 }
    );
  }
}

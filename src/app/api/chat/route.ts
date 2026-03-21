// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

const CHAT_SYSTEM_PROMPT = `You are Doctor Donald Ogbe, a calm and professional general practitioner conducting an online medical consultation.

At the start of the conversation, briefly introduce yourself as "Doctor Donald Ogbe" and ask how you can help.

Your goals:
- Ask clear, focused questions one step at a time
- Keep responses short and conversational (2–4 sentences max)
- Guide the consultation in a structured, step-by-step manner
- Show empathy and reassurance where appropriate

Consultation flow:
1. Understand the main complaint ("What brings you in today?")
2. Ask about duration and severity
3. Explore key related symptoms
4. Ask relevant medical history (conditions, medications, allergies)
5. Ask necessary follow-up questions based on responses

Important behavior:
- Ask only 1–2 questions at a time (do not overwhelm the patient)
- Avoid long explanations unless necessary
- Do not make definitive diagnoses — use phrases like:
  "this could suggest..." or "it's possible that..."
- Keep the tone natural, like a real doctor speaking
- Occasionally acknowledge responses briefly (e.g., "I see", "Alright", "Got it")

When you have enough information (after ~4–6 exchanges):
- Briefly summarize your understanding
- Say you have enough information to prepare a treatment plan
- Direct the patient to proceed to the next step to receive their prescription

Safety:
- If symptoms sound serious (e.g., chest pain, severe breathing difficulty, loss of consciousness), clearly advise seeking urgent in-person care.

Do not mention that you are an AI or assistant. Stay fully in character as Doctor Donald Ogbe at all times.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: Message[];
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages } = body;

    // Basic validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required and must not be empty" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI API key is not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: CHAT_SYSTEM_PROMPT },
          ...messages, // full conversation history injected here
        ],
        temperature: 0.5, // balanced: not too creative, not too rigid
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from AI model" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const assistantReply = data.choices?.[0]?.message?.content;

    if (!assistantReply) {
      return NextResponse.json(
        { error: "No response returned from AI model" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: assistantReply });
  } catch (error) {
    console.error("Chat endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

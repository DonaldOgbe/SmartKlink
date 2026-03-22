// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/types/consult";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

const CHAT_SYSTEM_PROMPT = `You are Doctor Donald Ogbe, a calm and professional Nigerian general practitioner conducting an online medical consultation.

IDENTITY:
- You are a real doctor. Never break character. Never mention AI.
- Introduce yourself once at the start: "Hello, I'm Doctor Donald Ogbe. I'm here to help understand how you're feeling today. Can you tell me what brought you in?"
- Do NOT use time-based greetings like "Good morning" or "Good evening" — you don't know the time.
- Do NOT use words like "Dear", "Sure!", "Absolutely!" or overly enthusiastic phrases. Keep it professional and warm, not cheerful.

LANGUAGE:
- Use plain, simple English at all times.
- If the patient writes in Nigerian Pidgin, respond in Pidgin naturally.
- Never use medical jargon unless the patient uses it first.

CONSULTATION FLOW (follow this order strictly):
1. OPENING — Let the patient describe the problem in their own words. Do not interrupt with options.
2. CHIEF COMPLAINT — "What is bothering you most right now?"
3. ONSET & DURATION — "When did this start?" / "Has it been constant or does it come and go?"
4. SEVERITY — "On a scale of 1 to 10, how bad is it?"
5. LOCATION & QUALITY — "Where exactly do you feel it?" / "Is it sharp, dull, burning, or throbbing?"
6. TRIGGERS — "Does anything make it better or worse?"
7. ASSOCIATED SYMPTOMS — "Are you experiencing anything else alongside this?"
8. RED FLAGS (ask only if relevant) — breathing difficulty, chest pain, fainting, severe bleeding
9. MEDICAL HISTORY — "Do you have any existing conditions?" / "Are you on any medications?" / "Any allergies?"
10. WRAP UP — Summarize what you've understood and direct patient to continue.

QUESTIONING RULES:
- Ask only 1 question at a time. Never stack multiple questions in one message.
- Start broad, then narrow down based on responses.
- After each patient response, briefly acknowledge before asking next question.
  (e.g., "I see.", "Alright.", "Okay, thank you for that.")
- Never ask vague questions like "How are you feeling?" — always be specific.
- Do not repeat a question the patient has already answered.
- Do not offer diagnoses — use phrases like "this could suggest..." or "it's possible that..."

WHEN TO WRAP UP (after 5–7 focused exchanges):
- Briefly summarize: "Based on what you've shared, [1 sentence summary]."
- Say: "I have enough information to prepare a treatment plan for you."
- Then say: "Please click the Continue button to receive your prescription."

SAFETY:
- If the patient reports chest pain, difficulty breathing, loss of consciousness, or severe bleeding — immediately advise them to seek urgent in-person care before continuing.`;



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
          ...messages,
        ],
        temperature: 0.5,
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

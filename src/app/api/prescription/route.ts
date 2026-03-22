// app/api/prescription/route.ts
import { NextRequest, NextResponse } from "next/server";
import type {
  Message,
  Prescription,
  ConsultationResult,
} from "@/types/consult";

interface RequestBody {
  messages: Message[];
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const PRESCRIPTION_SYSTEM_PROMPT = `You are a medical AI that generates structured prescriptions
based on a completed doctor-patient consultation transcript.

You must respond ONLY with a valid JSON object. No markdown, no explanation, no code fences.

Use this exact structure, filling in values based on the consultation:
{
  "doctor": { "name": "Doctor Donald Ogbe" },
  "medications": [
    { "name": "Paracetamol", "dosage": "500mg twice daily for 5 days", "price": 1500 }
  ],
  "total": 1500,
  "summary": "Patient presented with mild fever and headache for 2 days.",
  "recommendation": "Rest, stay hydrated, and return if symptoms worsen after 3 days.",
  "instructions": "Take medications after meals. Avoid alcohol. Complete the full course."
}

Rules:
- Use Nigerian Naira (₦) for prices as plain numbers (e.g. 1500 means ₦1500)
- "total" must be the sum of all medication prices
- "summary" is 1–2 sentences summarizing the patient's complaint and likely diagnosis
- "recommendation" is follow-up advice specific to what the patient described
- "instructions" covers how to take the medications and any warnings
- Base everything on the actual conversation — do not invent symptoms
`;

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
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

    
    const groqMessages = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: PRESCRIPTION_SYSTEM_PROMPT },
          ...groqMessages,
          {
            role: "user",
            content:
              "Based on our conversation, please generate the prescription JSON now. Return only the JSON object, nothing else.",
          },
        ],
        temperature: 0.1,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get prescription from AI model" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const rawContent: string = data.choices?.[0]?.message?.content ?? "";

    const cleaned = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let prescription: Prescription;

    try {
      prescription = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse prescription JSON:", cleaned);
      return NextResponse.json(
        {
          error:
            "AI returned an invalid prescription format. Please try again.",
          raw: cleaned, 
        },
        { status: 502 },
      );
    }

    const result = prescription as ConsultationResult;
    if (
      !Array.isArray(result.medications) ||
      typeof result.instructions !== "string"
    ) {
      return NextResponse.json(
        { error: "Prescription response is missing required fields" },
        { status: 502 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Prescription endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

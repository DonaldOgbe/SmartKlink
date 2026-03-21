// app/api/prescription/route.ts
import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const PRESCRIPTION_SYSTEM_PROMPT = `You are a medical AI that generates structured prescriptions 
based on a completed doctor-patient consultation transcript.

You must respond ONLY with a valid JSON object. No markdown, no explanation, no code fences.
Return ONLY this JSON, no extra text:
{
  "doctor": { "name": "Doctor Donald Ogbe" },
  "medications": [
    { "name": string, "dosage": string, "price": number }
  ],
  "total": number,
  "summary": string,
  "recommendation": string,
  "instructions": string
}
- "total" is the sum of all medication prices
- "summary" is 1–2 sentences summarizing the diagnosis
- "recommendation" is follow-up advice for the patient
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Drug {
  name: string;
  dosage: string;
  price: number;
}

interface Prescription {
  drugs: Drug[];
  instructions: string;
}

interface RequestBody {
  messages: Message[];
}

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

    // We append a final user turn instructing the model to generate the prescription.
    // This keeps the system prompt clean and makes the trigger explicit.
    const prescriptionTrigger: Message = {
      role: "user",
      content:
        "Based on our conversation, please generate the prescription JSON now. Return only the JSON object, nothing else.",
    };

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
          ...messages,
          prescriptionTrigger,
        ],
        temperature: 0.1, // low temperature = more deterministic, safer for structured output
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

    // Strip markdown code fences if the model ignores instructions and wraps in ```json
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
          raw: cleaned, // expose in dev; remove or gate behind NODE_ENV in production
        },
        { status: 502 },
      );
    }

    // Lightweight schema validation before returning to client
    if (
      !Array.isArray(prescription.drugs) ||
      typeof prescription.instructions !== "string"
    ) {
      return NextResponse.json(
        { error: "Prescription response is missing required fields" },
        { status: 502 },
      );
    }

    return NextResponse.json(prescription);
  } catch (error) {
    console.error("Prescription endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

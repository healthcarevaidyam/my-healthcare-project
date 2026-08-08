import { doctorPrompt } from "../../data/ai/doctorPrompt";
import type { DoctorMessage, Patient } from "../../types/ai/doctor";

interface OpenRouterRequest {
  messages: DoctorMessage[];
  patient: Patient;
}

const OPENROUTER_ENDPOINT =
  "https://openrouter.ai/api/v1/chat/completions";

const FALLBACK_RESPONSE =
  "धन्यवाद। आपकी जानकारी साझा करने के लिए धन्यवाद। मैंने आपकी जानकारी की समीक्षा कर ली है और सामान्य स्वास्थ्य मार्गदर्शन प्रदान करूंगा।";

const sanitizeResponse = (text: string): string => {
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\|/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/[ \t\u00A0]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const analyzePatient = async ({
  messages,
  patient,
}: OpenRouterRequest): Promise<string> => {
  const apiKey = "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";

  if (!apiKey) {
    console.error("Missing OpenRouter API key");
    return FALLBACK_RESPONSE;
  }

  try {
    const prompt = `${doctorPrompt}

Conversation:
${messages
  .map((m) => `${m.role}: ${m.content}`)
  .join("\n")}

Patient:
${JSON.stringify(patient, null, 2)}
`;

    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return FALLBACK_RESPONSE;
    }

    const rawText = data?.choices?.[0]?.message?.content?.trim();
    if (!rawText) {
      return FALLBACK_RESPONSE;
    }

    return sanitizeResponse(rawText);
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    return FALLBACK_RESPONSE;
  }
};
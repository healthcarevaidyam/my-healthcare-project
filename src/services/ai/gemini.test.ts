import { beforeEach, describe, expect, it, vi } from "vitest";
import { analyzePatient } from "./gemini";

describe("analyzePatient", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it("returns the Gemini response text when the API returns content", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: { content: "This is the Gemini response" },
          },
        ],
      }),
    });

    vi.stubGlobal("fetch", fetchMock);
    import.meta.env.VITE_OPENROUTER_API_KEY = "test-key";

    const result = await analyzePatient({
      messages: [{ id: "1", role: "user", content: "I have a headache", step: "intro", timestamp: 1 }],
      patient: {
        name: "Test",
        age: "31",
        gender: "Female",
        height: "160",
        weight: "55",
        bmi: "21",
        occupation: "Designer",
        diet: "Vegetarian",
        exercise: "Daily",
        waterIntake: "2L",
        sleep: "7h",
        smoking: "No",
        alcohol: "No",
        stress: "Moderate",
        existingDiseases: "None",
        currentMedicines: "None",
        allergies: "None",
        symptoms: "Headache",
        duration: "2 days",
        painLevel: "5",
        additionalNotes: "",
      },
    });

    expect(result).toBe("This is the Gemini response");
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("https://openrouter.ai/api/v1/chat/completions"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });
});

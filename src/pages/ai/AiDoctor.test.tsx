import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AiDoctor from "./AiDoctor";

describe("AiDoctor page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("speechSynthesis", {
      speak: vi.fn(),
      cancel: vi.fn(),
    });
    vi.stubGlobal("webkitSpeechRecognition", class {
      start = vi.fn();
      stop = vi.fn();
      abort = vi.fn();
      onresult = null;
      onerror = null;
      onend = null;
      continuous = false;
      interimResults = false;
      lang = "en-US";
    });
  });

  it("renders the doctor experience shell", () => {
    render(<AiDoctor />);

    expect(screen.getByText(/AI Doctor/i)).toBeInTheDocument();
    expect(screen.getByText(/Start consultation/i)).toBeInTheDocument();
  });
});

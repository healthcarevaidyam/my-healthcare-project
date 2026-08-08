import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { AiDoctorModal } from "./AiDoctorModal";

describe("AiDoctorModal", () => {
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

  it("renders welcome screen when modal is open", () => {
    render(<AiDoctorModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Welcome to AI Doctor/i)).toBeInTheDocument();
    expect(screen.getByText(/Start consultation/i)).toBeInTheDocument();
  });

  it("does not render when modal is closed", () => {
    const { container } = render(<AiDoctorModal isOpen={false} onClose={vi.fn()} />);
    expect(container.querySelector("[role='button']")).not.toBeInTheDocument();
  });
});

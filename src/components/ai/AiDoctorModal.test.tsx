import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { AiDoctorModal } from "./AiDoctorModal";

describe("AiDoctorModal", () => {
  const cancelSpeech = vi.fn();
  const abortRecognition = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("speechSynthesis", {
      speak: vi.fn(),
      cancel: cancelSpeech,
      getVoices: vi.fn(() => []),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal("webkitSpeechRecognition", class {
      start = vi.fn();
      stop = vi.fn();
      abort = abortRecognition;
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

  it("terminates active browser resources when closed", () => {
    const onClose = vi.fn();
    render(<AiDoctorModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Close AI Doctor" }));

    expect(abortRecognition).toHaveBeenCalled();
    expect(cancelSpeech).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledOnce();
  });
});

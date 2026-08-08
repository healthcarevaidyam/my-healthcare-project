import type { DoctorState } from "../../types/ai/doctor";

export const speakText = (text: string, onStart?: () => void, onEnd?: () => void): void => {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  if (!synth) {
    onEnd?.();
    return;
  }

  // Cancel any existing speech
  synth.cancel();

  const createUtterance = (voice?: SpeechSynthesisVoice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || "hi-IN";
    } else {
      utterance.lang = "hi-IN";
    }
    return utterance;
  };

  const selectVoice = (voices: SpeechSynthesisVoice[]) => {
    const hindiVoices = voices.filter((voice) =>
      /(^hi|hindi)/i.test(voice.lang) || /Hindi|हिंदी|हिन्दी/i.test(voice.name)
    );
    if (hindiVoices.length > 0) {
      return hindiVoices[0];
    }
    return voices[0];
  };

  const voices = synth.getVoices();
  const speakWithVoice = (voice?: SpeechSynthesisVoice) => {
    const utterance = createUtterance(voice);
    let hasStarted = false;

    utterance.onstart = () => {
      hasStarted = true;
      onStart?.();
    };

    utterance.onend = () => {
      if (hasStarted) {
        onEnd?.();
      }
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      onEnd?.();
    };

    try {
      synth.speak(utterance);
    } catch (error) {
      console.error("Failed to speak:", error);
      onEnd?.();
    }
  };

  const handleVoices = () => {
    const voice = selectVoice(synth.getVoices());
    speakWithVoice(voice);
  };

  if (voices.length === 0) {
    const onVoicesChanged = () => {
      handleVoices();
      synth.removeEventListener("voiceschanged", onVoicesChanged);
    };
    synth.addEventListener("voiceschanged", onVoicesChanged);
    return;
  }

  const selectedVoice = selectVoice(voices);
  speakWithVoice(selectedVoice);

  let hasStarted = false;

  utterance.onstart = () => {
    hasStarted = true;
    onStart?.();
  };

  utterance.onend = () => {
    if (hasStarted) {
      onEnd?.();
    }
  };

  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event.error);
    onEnd?.();
  };

  try {
    synth.speak(utterance);
  } catch (error) {
    console.error("Failed to speak:", error);
    onEnd?.();
  }
};

export const getDoctorVoiceState = (state: DoctorState): string => {
  switch (state) {
    case "listening":
      return "Listening...";
    case "thinking":
      return "Thinking...";
    case "speaking":
      return "Speaking...";
    case "completed":
      return "Completed";
    default:
      return "Ready";
  }
};

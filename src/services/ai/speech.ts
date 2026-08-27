import type { DoctorState } from "../../types/ai/doctor";

let pendingVoicesHandler: (() => void) | null = null;

export const stopSpeaking = (): void => {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  if (pendingVoicesHandler) {
    synth.removeEventListener("voiceschanged", pendingVoicesHandler);
    pendingVoicesHandler = null;
  }
  synth.cancel();
};

export const speakText = (text: string, onStart?: () => void, onEnd?: () => void): void => {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) {
    onEnd?.();
    return;
  }

  stopSpeaking();

  const selectVoice = (voices: SpeechSynthesisVoice[]) =>
    voices.find((voice) => /(^hi|hindi)/i.test(voice.lang) || /Hindi/i.test(voice.name)) ?? voices[0];

  const speak = (voice?: SpeechSynthesisVoice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    utterance.lang = voice?.lang || "hi-IN";
    if (voice) utterance.voice = voice;
    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();
    synth.speak(utterance);
  };

  const voices = synth.getVoices();
  if (voices.length > 0) {
    speak(selectVoice(voices));
    return;
  }

  pendingVoicesHandler = () => {
    if (!pendingVoicesHandler) return;
    synth.removeEventListener("voiceschanged", pendingVoicesHandler);
    pendingVoicesHandler = null;
    speak(selectVoice(synth.getVoices()));
  };
  synth.addEventListener("voiceschanged", pendingVoicesHandler);
};

export const getDoctorVoiceState = (state: DoctorState): string => {
  switch (state) {
    case "listening": return "Listening...";
    case "thinking": return "Thinking...";
    case "speaking": return "Speaking...";
    case "completed": return "Completed";
    default: return "Ready";
  }
};

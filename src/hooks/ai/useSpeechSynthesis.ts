import { useCallback } from "react";

export const useSpeechSynthesis = () => {
  const speak = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    synth.speak(utterance);
  }, []);

  return { speak };
};

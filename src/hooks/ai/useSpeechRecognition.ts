import { useEffect, useMemo, useState } from "react";
import type { SpeechRecognitionLike } from "../../types/ai/doctor";

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

export const useSpeechRecognition = (onTranscript: (value: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognition = useMemo<SpeechRecognitionLike | null>(() => {
    if (typeof window === "undefined") return null;
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return null;

    const recognitionInstance = new SpeechRecognitionCtor() as SpeechRecognitionLike;
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = "hi-IN";
    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ");
      if (transcript) {
        onTranscript(transcript);
      }
    };
    recognitionInstance.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };
    recognitionInstance.onend = () => {
      setIsListening(false);
    };
    return recognitionInstance;
  }, [onTranscript]);

  useEffect(() => {
    return () => {
      recognition?.abort();
    };
  }, [recognition]);

  const startListening = () => {
    if (!recognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    setError(null);
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognition?.stop();
    setIsListening(false);
  };

  const abortListening = () => {
    recognition?.abort();
    setIsListening(false);
  };

  return { isListening, error, startListening, stopListening, abortListening };
};

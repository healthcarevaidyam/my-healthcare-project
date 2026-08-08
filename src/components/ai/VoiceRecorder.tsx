import { Mic, MicOff } from "lucide-react";

interface VoiceRecorderProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  error?: string | null;
}

export const VoiceRecorder = ({ isListening, onStart, onStop, error }: VoiceRecorderProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={isListening ? onStop : onStart}
        className={`rounded-full p-3 ${isListening ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"}`}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
      <span className="text-sm text-slate-600">{isListening ? "Listening..." : "Tap to speak"}</span>
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </div>
  );
};

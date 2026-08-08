import type { DoctorMessage } from "../../types/ai/doctor";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";

interface DoctorChatProps {
  messages: DoctorMessage[];
  isThinking: boolean;
}

export const DoctorChat = ({ messages, isThinking }: DoctorChatProps) => {
  return (
    <div className="flex min-h-[260px] flex-col gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Your consultation will appear here.
        </div>
      ) : (
        messages.map((message) => <ChatBubble key={message.id} message={message} />)
      )}
      {isThinking && <TypingIndicator />}
    </div>
  );
};

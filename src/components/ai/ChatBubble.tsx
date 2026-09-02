import { motion } from "framer-motion";
import type { DoctorMessage } from "../../types/ai/doctor";

interface ChatBubbleProps {
  message: DoctorMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: message.role === "assistant" ? -8 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${message.role === "assistant" ? "self-start bg-emerald-50 text-emerald-900" : "self-end bg-slate-900 text-white"}`}
    >
      <p>{message.content}</p>
    </motion.div>
  );
};

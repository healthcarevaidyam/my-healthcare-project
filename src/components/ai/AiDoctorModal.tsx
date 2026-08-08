import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff, Send } from "lucide-react";
import { DoctorAvatar } from "./DoctorAvatar";
import { VoiceRecorder } from "./VoiceRecorder";
import { TypingIndicator } from "./TypingIndicator";
import { useConsultation } from "../../hooks/ai/useConsultation";
import { usePatient } from "../../hooks/ai/usePatient";
import { useSpeechRecognition } from "../../hooks/ai/useSpeechRecognition";
import { getDoctorVoiceState, speakText } from "../../services/ai/speech";
import { consultationSteps } from "../../data/ai/consultationSteps";
import { consultationQuestions } from "../../data/ai/questions";

interface AiDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiDoctorModal = ({ isOpen, onClose }: AiDoctorModalProps) => {
  const { patient, updatePatient, isLoaded, resetPatient } = usePatient();
  const { consultation, currentQuestion, doctorState, progress, isProcessing, nextQuestion, answerCurrentQuestion, resetConsultation, setDoctorState } = useConsultation(patient);
  const [draftAnswer, setDraftAnswer] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    setDraftAnswer(patient[currentQuestion.field] ?? "");
  }, [currentQuestion.field, patient, isLoaded, consultation.currentQuestionId]);

  const handleStartConsultation = () => {
    setShowWelcome(false);
    setDoctorState("speaking");
    speakText(
      "नमस्ते। मैं वैद्यं एआई डॉक्टर हूँ। आपकी सेहत बेहतर तरीके से समझने के लिए मैं आपसे कुछ सवाल पूछूंगा।",
      () => {
        setDoctorState("speaking");
      },
      () => {
        setDoctorState("idle");
      }
    );
  };

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const previousOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow || "";
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);

  const handleClose = () => {
    resetConsultation();
    resetPatient();
    setShowWelcome(true);
    setDoctorState("idle");
    onClose();
  };

  const handleSubmitAnswer = async () => {
    if (!draftAnswer.trim()) return;
    updatePatient(currentQuestion.field, draftAnswer.trim());
    setDoctorState("listening");
    setTimeout(() => {
      setDoctorState("thinking");
    }, 800);
    await answerCurrentQuestion(draftAnswer.trim());
    setDraftAnswer("");
  };

  const { isListening, error, startListening, stopListening } = useSpeechRecognition((transcript: string) => {
    setDraftAnswer(transcript);
    updatePatient(currentQuestion.field, transcript);
  });

  const isCompleted = consultation.completed && doctorState === "completed";
  const currentQuestionIndex = consultationQuestions.findIndex((q) => q.id === consultation.currentQuestionId);
  const hasMoreQuestions = currentQuestionIndex < consultationQuestions.length - 1;
  const shouldShowForm = !isCompleted && (hasMoreQuestions || currentQuestionIndex !== -1);

  const assistantSummary =
    consultation.messages
      .filter((message) => message.role === "assistant")
      .map((message) => message.content)
      .join("\n\n") ||
    "Thank you for sharing your health information. Please book an appointment with our team for a detailed consultation.";

  // Get status text based on doctor state
  const getStatusText = () => {
    if (isProcessing) return "THINKING...";
    switch (doctorState) {
      case "speaking":
        return "SPEAKING";
      case "listening":
        return "LISTENING";
      case "thinking":
        return "THINKING";
      default:
        return "READY";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button - Sticky */}
            <div className="sticky top-0 z-10 bg-white rounded-t-3xl">
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 pt-2">
              {showWelcome ? (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="flex flex-col items-center gap-6 text-center py-8"
                >
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700 tracking-wider">READY</span>
                  </div>

                  {/* Doctor Avatar */}
                  <DoctorAvatar state="idle" size="lg" />

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Welcome to AI Doctor</h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      I'm here to understand your health concerns and guide you with Ayurvedic wisdom.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartConsultation}
                    className="w-full max-w-xs rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Start Consultation
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="flex flex-col gap-6"
                >
                  {/* Status Badge */}
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${
                      doctorState === "speaking" ? "bg-blue-50 border-blue-200" :
                      doctorState === "listening" ? "bg-purple-50 border-purple-200" :
                      doctorState === "thinking" ? "bg-amber-50 border-amber-200" :
                      "bg-emerald-50 border-emerald-200"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        doctorState === "speaking" ? "bg-blue-500 animate-pulse" :
                        doctorState === "listening" ? "bg-purple-500 animate-pulse" :
                        doctorState === "thinking" ? "bg-amber-500 animate-pulse" :
                        "bg-emerald-500"
                      }`} />
                      <span className="text-xs font-semibold text-gray-700 tracking-wider">{getStatusText()}</span>
                    </div>
                  </div>

                  {/* Doctor Avatar */}
                  <div className="flex justify-center">
                    <DoctorAvatar state={doctorState} size="lg" />
                  </div>

                  {shouldShowForm ? (
                    <div className="space-y-4">
                      {/* Question */}
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">{currentQuestion.question}</p>
                      </div>

                      {/* Input */}
                      <div className="relative">
                        {currentQuestion.inputType === "textarea" ? (
                          <textarea
                            value={draftAnswer}
                            onChange={(e) => setDraftAnswer(e.target.value)}
                            placeholder={currentQuestion.placeholder}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all resize-none h-24"
                          />
                        ) : currentQuestion.inputType === "select" ? (
                          <select
                            value={draftAnswer}
                            onChange={(e) => setDraftAnswer(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all appearance-none"
                          >
                            <option value="" disabled>
                              {currentQuestion.placeholder}
                            </option>
                            {currentQuestion.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={currentQuestion.inputType}
                            value={draftAnswer}
                            onChange={(e) => setDraftAnswer(e.target.value)}
                            placeholder={currentQuestion.placeholder}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                          />
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={isListening ? stopListening : startListening}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-xl border ${
                            isListening 
                              ? "border-red-200 bg-red-50 text-red-600" 
                              : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                          } px-4 py-2.5 text-sm font-medium transition-all`}
                        >
                          {isListening ? (
                            <>
                              <MicOff size={18} />
                              Stop
                            </>
                          ) : (
                            <>
                              <Mic size={18} />
                              Voice
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmitAnswer}
                          disabled={!draftAnswer.trim() || isProcessing}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                          <Send size={18} />
                          {isProcessing ? "Processing..." : "Submit"}
                        </button>
                      </div>

                      {error && (
                        <p className="text-xs text-red-500 text-center">{error}</p>
                      )}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                    >
                      <h3 className="text-lg font-semibold text-emerald-900 text-center pb-3">
                        Consultation Complete
                      </h3>
                      <div className="whitespace-pre-line text-sm text-emerald-700 leading-relaxed">
                        {assistantSummary}
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={handleClose} 
                        className="mt-4 w-full rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}

                  {isProcessing && (
                    <div className="flex justify-center">
                      <TypingIndicator />
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
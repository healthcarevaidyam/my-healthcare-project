import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DoctorAvatar } from "../../components/ai/DoctorAvatar";
import { DoctorChat } from "../../components/ai/DoctorChat";
import { QuestionCard } from "../../components/ai/QuestionCard";
import { ProgressBar } from "../../components/ai/ProgressBar";
import { VoiceRecorder } from "../../components/ai/VoiceRecorder";
import { ConsultationSummary } from "../../components/ai/ConsultationSummary";
import { LoadingOverlay } from "../../components/ai/LoadingOverlay";
import { useConsultation } from "../../hooks/ai/useConsultation";
import { usePatient } from "../../hooks/ai/usePatient";
import { useSpeechRecognition } from "../../hooks/ai/useSpeechRecognition";
import { getDoctorVoiceState } from "../../services/ai/speech";
import { consultationSteps } from "../../data/ai/consultationSteps";

const AiDoctor = () => {
  const { patient, updatePatient, isLoaded } = usePatient();
  const { consultation, currentQuestion, doctorState, progress, isProcessing, nextQuestion, previousQuestion, answerCurrentQuestion, completeConsultation, setDoctorState } = useConsultation(patient);
  const [draftAnswer, setDraftAnswer] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    setDraftAnswer(patient[currentQuestion.field] ?? "");
  }, [currentQuestion.field, patient, isLoaded]);

  const handleSubmit = async () => {
    if (!draftAnswer.trim()) return;
    updatePatient(currentQuestion.field, draftAnswer.trim());
    await answerCurrentQuestion(draftAnswer.trim());
    setDraftAnswer("");
  };

  const { isListening, error, startListening, stopListening } = useSpeechRecognition((transcript: string) => {
    setDraftAnswer(transcript);
    updatePatient(currentQuestion.field, transcript);
    setDoctorState("listening");
  });

  const isCompleted = consultation.completed || doctorState === "completed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-emerald-100 bg-white/90 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">AI Doctor</p>
              <h1 className="text-3xl font-bold sm:text-4xl">Your personal digital consultation experience</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">A guided Ayurvedic-style consultation that asks one thoughtful question at a time and stores your progress locally.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDoctorState("idle");
                nextQuestion();
              }}
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Start consultation
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <LoadingOverlay isVisible={isProcessing} />
            <div className="flex flex-col items-center gap-4">
              <DoctorAvatar state={doctorState} />
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Doctor status</p>
                <h2 className="text-2xl font-semibold">{getDoctorVoiceState(doctorState)}</h2>
              </div>
              <ProgressBar progress={progress} />
              <div className="w-full max-w-xl">
                <DoctorChat messages={consultation.messages} isThinking={isProcessing} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Current step</p>
                  <h3 className="text-xl font-semibold">{consultationSteps.find((step) => step.id === consultation.currentStep)?.label ?? "Welcome"}</h3>
                </div>
                <VoiceRecorder isListening={isListening} onStart={startListening} onStop={stopListening} error={error} />
              </div>
              {!isCompleted ? (
                <QuestionCard question={currentQuestion} answer={draftAnswer} onAnswerChange={setDraftAnswer} onSubmit={handleSubmit} />
              ) : (
                <ConsultationSummary patient={patient} />
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={previousQuestion} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Previous
              </button>
              <button type="button" onClick={nextQuestion} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Next
              </button>
              <button type="button" onClick={() => void completeConsultation()} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Complete consultation
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDoctor;

import { useCallback, useEffect, useMemo, useState } from "react";
import { consultationQuestions, getQuestionById } from "../../data/ai/questions";
import { consultationSteps } from "../../data/ai/consultationSteps";
import type { Consultation, DoctorMessage, DoctorState, Patient, Question } from "../../types/ai/doctor";
import { saveConsultation, loadConsultation } from "../../services/ai/storage";
import { analyzePatient } from "../../services/ai/gemini";
import { speakText } from "../../services/ai/speech";

const initialConsultation = (questionId: string): Consultation => ({
  started: false,
  completed: false,
  currentQuestionId: questionId,
  currentStep: consultationSteps[0].id,
  messages: [],
  startedAt: Date.now(),
});

export const useConsultation = (patient: Patient) => {
  const [consultation, setConsultation] = useState<Consultation>(() => {
    const stored = loadConsultation();
    if (stored) {
      return stored;
    }
    return initialConsultation(consultationQuestions[0].id);
  });
  const [doctorState, setDoctorState] = useState<DoctorState>("idle");
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => getQuestionById(consultation.currentQuestionId) ?? consultationQuestions[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    saveConsultation(consultation);
  }, [consultation]);

  const progress = useMemo(() => {
    const currentIndex = consultationQuestions.findIndex((question) => question.id === consultation.currentQuestionId);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    return Math.round(((safeIndex + 1) / consultationQuestions.length) * 100);
  }, [consultation.currentQuestionId]);

  const goToQuestion = useCallback((questionId: string) => {
    const nextQuestion = getQuestionById(questionId);
    if (!nextQuestion) return;
    setCurrentQuestion(nextQuestion);
    setConsultation((prev) => ({
      ...prev,
      currentQuestionId: nextQuestion.id,
      currentStep: nextQuestion.step,
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    const currentIndex = consultationQuestions.findIndex((question) => question.id === consultation.currentQuestionId);
    const next = consultationQuestions[currentIndex + 1];
    if (next) {
      goToQuestion(next.id);
    } else {
      setConsultation((prev) => ({ ...prev, completed: true, currentStep: "booking" }));
      setDoctorState("completed");
    }
  }, [consultation.currentQuestionId, goToQuestion]);

  const previousQuestion = useCallback(() => {
    const currentIndex = consultationQuestions.findIndex((question) => question.id === consultation.currentQuestionId);
    const previous = consultationQuestions[currentIndex - 1];
    if (previous) {
      goToQuestion(previous.id);
    }
  }, [consultation.currentQuestionId, goToQuestion]);

  const resetConsultation = useCallback(() => {
    const firstQuestion = consultationQuestions[0];
    setConsultation(initialConsultation(firstQuestion.id));
    setCurrentQuestion(firstQuestion);
    setDoctorState("idle");
    setIsProcessing(false);
  }, []);

  const completeConsultation = useCallback(async (finalMessages?: DoctorMessage[], finalPatient?: Patient) => {
    const messagesToSend = finalMessages ?? consultation.messages;
    const patientToSend = finalPatient ?? patient;

    setDoctorState("thinking");
    setIsProcessing(true);

    const response = await analyzePatient({ messages: messagesToSend, patient: patientToSend });
    const assistantMessage: DoctorMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      step: "summary",
      timestamp: Date.now(),
    };

    setConsultation((prev) => ({
      ...prev,
      messages: [...messagesToSend, assistantMessage],
      completed: true,
      currentStep: "booking",
    }));

    setDoctorState("speaking");
    speakText(
      response,
      () => {
        setDoctorState("speaking");
      },
      () => {
        setDoctorState("completed");
        setIsProcessing(false);
      }
    );
  }, [consultation.messages, patient]);

  const answerCurrentQuestion = useCallback(async (value: string) => {
    if (!value.trim()) return;
    const current = currentQuestion;
    const currentIndex = consultationQuestions.findIndex((question) => question.id === consultation.currentQuestionId);
    const isLastQuestion = currentIndex === consultationQuestions.length - 1;
    const finalPatient = { ...patient, [current.field]: value };
    const userMessage: DoctorMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: `${current.field}: ${value}`,
      step: current.step,
      timestamp: Date.now(),
    };

    const nextMessages = [...consultation.messages, userMessage];

    setConsultation((prev) => ({
      ...prev,
      started: true,
      messages: nextMessages,
    }));

    if (isLastQuestion) {
      await completeConsultation(nextMessages, finalPatient);
    } else {
      setDoctorState("idle");
      setIsProcessing(false);
      nextQuestion();
    }
  }, [consultation.currentQuestionId, consultation.messages, currentQuestion, nextQuestion, patient, completeConsultation]);

  return {
    consultation,
    currentQuestion,
    doctorState,
    progress,
    isProcessing,
    nextQuestion,
    previousQuestion,
    answerCurrentQuestion,
    completeConsultation,
    resetConsultation,
    setDoctorState,
  };
};

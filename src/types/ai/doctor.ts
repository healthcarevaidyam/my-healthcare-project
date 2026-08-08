export type DoctorState = "idle" | "listening" | "thinking" | "speaking" | "completed";

export type QuestionInputType = "text" | "number" | "textarea" | "select";

export interface Patient {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  bmi: string;
  occupation: string;
  diet: string;
  exercise: string;
  waterIntake: string;
  sleep: string;
  smoking: string;
  alcohol: string;
  stress: string;
  existingDiseases: string;
  currentMedicines: string;
  allergies: string;
  symptoms: string;
  duration: string;
  painLevel: string;
  additionalNotes: string;
}

export interface DoctorMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  step: string;
  timestamp: number;
}

export interface Question {
  id: string;
  step: string;
  field: keyof Patient;
  question: string;
  placeholder: string;
  required: boolean;
  inputType: QuestionInputType;
  options?: string[];
  validation?: string;
}

export interface Consultation {
  started: boolean;
  completed: boolean;
  currentQuestionId: string;
  currentStep: string;
  messages: DoctorMessage[];
  startedAt: number;
}

export interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

export interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

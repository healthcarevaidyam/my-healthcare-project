import type { Consultation, Patient } from "../../types/ai/doctor";

const storageKeys = {
  patient: "ai-doctor-patient",
  consultation: "ai-doctor-consultation",
} as const;

export const savePatient = (patient: Patient): void => {
  localStorage.setItem(storageKeys.patient, JSON.stringify(patient));
};

export const loadPatient = (): Patient | null => {
  const stored = localStorage.getItem(storageKeys.patient);
  return stored ? (JSON.parse(stored) as Patient) : null;
};

export const saveConsultation = (consultation: Consultation): void => {
  localStorage.setItem(storageKeys.consultation, JSON.stringify(consultation));
};

export const loadConsultation = (): Consultation | null => {
  const stored = localStorage.getItem(storageKeys.consultation);
  return stored ? (JSON.parse(stored) as Consultation) : null;
};

export const clearAiDoctorStorage = (): void => {
  localStorage.removeItem(storageKeys.patient);
  localStorage.removeItem(storageKeys.consultation);
};

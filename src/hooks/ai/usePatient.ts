import { useCallback, useEffect, useState } from "react";
import type { Patient } from "../../types/ai/doctor";
import { loadPatient, savePatient } from "../../services/ai/storage";

const emptyPatient: Patient = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  bmi: "",
  occupation: "",
  diet: "",
  exercise: "",
  waterIntake: "",
  sleep: "",
  smoking: "",
  alcohol: "",
  stress: "",
  existingDiseases: "",
  currentMedicines: "",
  allergies: "",
  symptoms: "",
  duration: "",
  painLevel: "",
  additionalNotes: "",
};

export const usePatient = () => {
  const [patient, setPatient] = useState<Patient>(() => loadPatient() ?? emptyPatient);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const stored = loadPatient();
    if (stored) {
      setPatient(stored);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    savePatient(patient);
  }, [isLoaded, patient]);

  const updatePatient = (field: keyof Patient, value: string) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const resetPatient = useCallback(() => {
    setPatient(emptyPatient);
  }, []);

  return { patient, updatePatient, isLoaded, resetPatient };
};

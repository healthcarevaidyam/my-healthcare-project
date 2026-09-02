import type { DoctorState } from "../../types/ai/doctor";

const fallbackVideoPath = "/src/assets/ai/speaking.mp4";
const stateToFile: Record<DoctorState, string> = {
  idle: "listening",
  listening: "listening",
  thinking: "listening",
  speaking: "speaking",
  completed: "speaking",
};

export const getAvatarVideoPath = (state: DoctorState): string => {
  const fileName = stateToFile[state] ?? stateToFile.idle;
  return `/src/assets/ai/${fileName}.mp4`;
};

export const shouldLoopVideo = (state: DoctorState): boolean => {
  return state === "idle" || state === "listening" || state === "thinking";
};

export const getAvatarVideoFallbackPath = (): string => fallbackVideoPath;

import { motion } from "framer-motion";
import { getAvatarVideoFallbackPath, getAvatarVideoPath, shouldLoopVideo } from "../../services/ai/avatar";
import type { DoctorState } from "../../types/ai/doctor";

interface DoctorAvatarProps {
  state: DoctorState;
  size?: "sm" | "md" | "lg";
}

export const DoctorAvatar = ({ state, size = "md" }: DoctorAvatarProps) => {
  const videoPath = getAvatarVideoPath(state);
  const shouldLoop = shouldLoopVideo(state);
  const sizeClass =
    size === "sm"
      ? "h-12 w-12 sm:h-16 sm:w-16"
      : size === "md"
      ? "h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64"
      : "h-64 w-64";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex ${sizeClass} items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 shadow-lg overflow-hidden`}>
      <video
        key={videoPath}
        src={videoPath}
        autoPlay
        loop={shouldLoop}
        muted
        playsInline
        className="h-full w-full object-cover"
        onError={(event) => {
          const target = event.currentTarget;
          target.src = getAvatarVideoFallbackPath();
          target.load();
        }}
      />
    </motion.div>
  );
};

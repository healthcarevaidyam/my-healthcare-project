
import { motion } from "framer-motion";
import type { DoctorState } from "../../types/ai/doctor";
import { useEffect, useState } from "react";

interface DoctorAvatarProps {
  state: DoctorState;
  size?: "sm" | "md" | "lg";
}

// Automatically import ALL JPG files from the ai folder
const imageModules = import.meta.glob(
  "../../assets/ai/ezgif-frame-*.jpg",
  {
    eager: true,
    import: "default",
    query: "?url",
  }
) as Record<string, string>;

// Sort images by filename so they play in the correct order
const frames = Object.entries(imageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, imagePath]) => imagePath);

export const DoctorAvatar = ({
  state,
  size = "md",
}: DoctorAvatarProps) => {
  const [frame, setFrame] = useState(0);

  const sizeClass =
    size === "sm"
      ? "h-12 w-12 sm:h-16 sm:w-16"
      : size === "md"
      ? "h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64"
      : "h-64 w-64";

  // Animation speed
  // 80ms = about 12.5 frames per second
  const frameSpeed = 1200;

  useEffect(() => {
    // Don't start animation if no images were found
    if (frames.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setFrame((previousFrame) => {
        return (previousFrame + 1) % frames.length;
      });
    }, frameSpeed);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Safety check
  if (frames.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${sizeClass} items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 shadow-lg overflow-hidden`}
      >
        <span className="text-xs text-gray-500">
          Avatar images not found
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${sizeClass} items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 shadow-lg overflow-hidden`}
    >
      <img
        src={frames[frame]}
        alt="AI Doctor"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
};


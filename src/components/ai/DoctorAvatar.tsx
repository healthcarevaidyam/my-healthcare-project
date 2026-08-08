
import { motion } from "framer-motion";
import type { DoctorState } from "../../types/ai/doctor";
import { useEffect, useState } from "react";

import frame001 from "../../assets/ai/ezgif-frame-001.jpg";
import frame002 from "../../assets/ai/ezgif-frame-002.jpg";
import frame003 from "../../assets/ai/ezgif-frame-003.jpg";
import frame004 from "../../assets/ai/ezgif-frame-004.jpg";
import frame005 from "../../assets/ai/ezgif-frame-005.jpg";
import frame006 from "../../assets/ai/ezgif-frame-006.jpg";
import frame007 from "../../assets/ai/ezgif-frame-007.jpg";
import frame008 from "../../assets/ai/ezgif-frame-008.jpg";
import frame009 from "../../assets/ai/ezgif-frame-009.jpg";
import frame010 from "../../assets/ai/ezgif-frame-010.jpg";
import frame011 from "../../assets/ai/ezgif-frame-011.jpg";
import frame012 from "../../assets/ai/ezgif-frame-012.jpg";
import frame013 from "../../assets/ai/ezgif-frame-013.jpg";
import frame014 from "../../assets/ai/ezgif-frame-014.jpg";
import frame015 from "../../assets/ai/ezgif-frame-015.jpg";
import frame016 from "../../assets/ai/ezgif-frame-016.jpg";

interface DoctorAvatarProps {
  state: DoctorState;
  size?: "sm" | "md" | "lg";
}

const frames = [
  frame001,
  frame002,
  frame003,
  frame004,
  frame005,
  frame006,
  frame007,
  frame008,
  frame009,
  frame010,
  frame011,
  frame012,
  frame013,
  frame014,
  frame015,
  frame016,
];

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

  // Slow animation
  const frameSpeed = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((currentFrame) => {
        if (currentFrame === frames.length - 1) {
          return 0;
        }

        return currentFrame + 1;
      });
    }, frameSpeed);

    return () => {
      clearInterval(interval);
    };
  }, []);

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


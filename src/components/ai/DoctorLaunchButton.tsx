import aiButton from "@/assets/ai/aiButton.png";

interface DoctorLaunchButtonProps {
  onClick: () => void;
}

export const DoctorLaunchButton = ({ onClick }: DoctorLaunchButtonProps) => {
  return (
    <button
  type="button"
  onClick={onClick}
  aria-label="Open AI Doctor"
  className="group fixed bottom-20 right-6 z-50 h-14 w-14 rounded-full bg-white p-0.5 shadow-xl border border-slate-200 transition-transform hover:scale-110 active:scale-95 overflow-visible flex items-center justify-center"
>
  {/* Tooltip Label */}
  <span className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-md whitespace-nowrap">
    Ask AI Doctor
  </span>

  {/* Button Icon */}
  <img 
    src={aiButton} 
    alt="AI Doctor" 
    className="h-full w-full rounded-full object-cover" 
  />
</button>
  );
};

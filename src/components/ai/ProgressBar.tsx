interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>Consultation progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

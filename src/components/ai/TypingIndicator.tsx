export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 self-start rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600 [animation-delay:120ms]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600 [animation-delay:240ms]" />
      <span>Doctor is thinking...</span>
    </div>
  );
};

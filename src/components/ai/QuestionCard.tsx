import type { Question } from "../../types/ai/doctor";

interface QuestionCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
}

export const QuestionCard = ({ question, answer, onAnswerChange, onSubmit }: QuestionCardProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-emerald-700">{question.question}</p>
      {question.inputType === "textarea" ? (
        <textarea
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          placeholder={question.placeholder}
          className="mt-3 min-h-24 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none"
        />
      ) : question.inputType === "number" ? (
        <input
          type="number"
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          placeholder={question.placeholder}
          className="mt-3 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none"
        />
      ) : (
        <input
          type="text"
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          placeholder={question.placeholder}
          className="mt-3 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none"
        />
      )}
      <button
        type="button"
        onClick={onSubmit}
        className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Save answer
      </button>
    </div>
  );
};

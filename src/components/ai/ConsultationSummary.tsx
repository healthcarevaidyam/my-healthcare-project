import type { Patient } from "../../types/ai/doctor";

interface ConsultationSummaryProps {
  patient: Patient;
}

export const ConsultationSummary = ({ patient }: ConsultationSummaryProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Consultation summary</h3>
      <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <p><span className="font-semibold">Name:</span> {patient.name || "Not provided"}</p>
        <p><span className="font-semibold">Age:</span> {patient.age || "Not provided"}</p>
        <p><span className="font-semibold">Symptoms:</span> {patient.symptoms || "Not provided"}</p>
        <p><span className="font-semibold">Pain level:</span> {patient.painLevel || "Not provided"}</p>
      </div>
    </div>
  );
};

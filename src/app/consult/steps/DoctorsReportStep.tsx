"use client";
import { ConsultationResult } from "@/types/consult";

type Props = {
  consultationResult: ConsultationResult | null;
};

export default function DoctorReportStep({ consultationResult }: Props) {
  if (!consultationResult) return <p>Loading report...</p>;

  const { summary, recommendation, medications, total, doctor } =
    consultationResult;

  return (
    <div className="space-y-6">
      {/* SUMMARY */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs text-blue-400 font-medium uppercase tracking-wide mb-1">
          {"Doctor's Finding"}
        </p>
        <p className="text-gray-800 font-medium">{summary}</p>
        <p className="text-sm text-gray-500 mt-1">{recommendation}</p>
        <p className="text-xs text-gray-400 mt-2">
          Dr. {doctor?.name || "Assigned Doctor"}
        </p>
      </div>

      {/* LOCKED PRESCRIPTION PREVIEW */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">Prescription Preview</h3>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
            🔒 Locked
          </span>
        </div>

        {medications.map((med, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-gray-700">
            <span>
              {med.name}{" "}
              <span className="text-gray-300 blur-[4px] select-none">
                {med.dosage}
              </span>
            </span>
            <span className="text-gray-300 blur-[4px] select-none">
              ₦{med.price}
            </span>
          </div>
        ))}

        <hr />
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Estimated Total</span>
          <span>₦{total}</span>
        </div>

        <p className="text-xs text-gray-400 text-center pt-2">
          Complete payment to unlock full prescription details
        </p>
      </div>
    </div>
  );
}

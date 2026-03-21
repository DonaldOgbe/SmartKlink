// components/consult/steps/PrescriptionStep.tsx
"use client";

import { FormData, Prescription, Medication } from "@/types/consult";

type Props = {
  formData: FormData;
  prescription: Prescription | null;
};

export default function PrescriptionStep({ formData, prescription }: Props) {
  if (!prescription) {
    return <p>Loading prescription...</p>;
  }

  const { doctor, medications, instructions, total } = prescription;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold">
          {formData.firstName} {formData.lastName}
        </h2>
        <p className="text-sm text-gray-500">Age: {formData.age}</p>
        <p className="text-sm text-gray-500">
          Doctor: {doctor?.name || "Assigned Doctor"}
        </p>
      </div>

      <hr />

      {/* MEDICATION LIST */}
      <div className="space-y-3">
        {medications?.map((med: Medication, index: number) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {med.name} — {med.dosage}
            </span>
            <span className="font-medium">₦{med.price}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₦{total}</span>
      </div>

      <hr />

      {/* INSTRUCTIONS */}
      <div>
        <h3 className="font-medium mb-2">Instructions</h3>
        <p className="text-sm text-gray-600">{instructions}</p>
      </div>
    </div>
  );
}

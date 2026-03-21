// components/consult/steps/UserInfoStep.tsx
"use client";

import { FormData } from "@/types/consult";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const INSURANCE_OPTIONS = [
  {
    provider: "NHIA",
    coverage: 0.9, 
  },
];

export default function UserInfoStep({ formData, setFormData }: Props) {
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* NAME */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="w-1/2 p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="w-1/2 p-3 border rounded-lg"
        />
      </div>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      {/* PHONE */}
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      {/* AGE + GENDER */}
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          className="w-1/2 p-3 border rounded-lg"
        />

        <select
          value={formData.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-1/2 p-3 border rounded-lg">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* INSURANCE TOGGLE */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Do you have insurance?</span>
        <input
          type="checkbox"
          checked={formData.hasInsurance}
          onChange={(e) => handleChange("hasInsurance", e.target.checked)}
        />
      </div>

      {/* INSURANCE DETAILS */}
      {formData.hasInsurance && (
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl">
          {/* Provider (select instead of free text) */}
          <select
            value={formData.insuranceProvider}
            onChange={(e) => handleChange("insuranceProvider", e.target.value)}
            className="w-full p-3 border rounded-lg">
            <option value="">Select Insurance</option>
            {INSURANCE_OPTIONS.map((ins) => (
              <option key={ins.provider} value={ins.provider}>
                {ins.provider}
              </option>
            ))}
          </select>

          {/* ID */}
          <input
            type="text"
            placeholder="Insurance ID"
            value={formData.insuranceId}
            onChange={(e) => handleChange("insuranceId", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

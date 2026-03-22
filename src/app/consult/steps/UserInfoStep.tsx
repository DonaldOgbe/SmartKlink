"use client";

import { FormData } from "@/types/consult";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const INSURANCE_OPTIONS = [{ provider: "NHIA", coverage: 0.9 }];

const inputClass =
  "w-full p-3 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0059cd] focus:border-transparent transition";

export default function UserInfoStep({ formData, setFormData }: Props) {
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* PERSONAL INFO CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Personal Information
        </p>

        {/* Name row */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={inputClass + " flex-1"}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={inputClass + " flex-1"}
          />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClass}
        />

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={inputClass}
        />

        {/* Age + Gender */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className={inputClass + " flex-1"}
          />
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className={inputClass + " flex-1"}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* INSURANCE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Insurance
        </p>

        {/* Toggle row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Do you have insurance?
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Eligible plans receive up to 90% coverage
            </p>
          </div>

          {/* Custom toggle */}
          <button
            type="button"
            onClick={() => handleChange("hasInsurance", !formData.hasInsurance)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
              formData.hasInsurance ? "bg-[#0059cd]" : "bg-gray-200"
            }`}>
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                formData.hasInsurance ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Insurance fields */}
        {formData.hasInsurance && (
          <div className="space-y-3 pt-1">
            <select
              value={formData.insuranceProvider}
              onChange={(e) =>
                handleChange("insuranceProvider", e.target.value)
              }
              className={inputClass}>
              <option value="">Select Insurance Provider</option>
              {INSURANCE_OPTIONS.map((ins) => (
                <option key={ins.provider} value={ins.provider}>
                  {ins.provider} — {ins.coverage * 100}% coverage
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Insurance ID"
              value={formData.insuranceId}
              onChange={(e) => handleChange("insuranceId", e.target.value)}
              className={inputClass}
            />

            {formData.insuranceProvider === "NHIA" && (
              <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-[#0059cd] flex-shrink-0" />
                <p className="text-xs text-[#0059cd] font-medium">
                  NHIA plan detected — 90% discount will be applied at payment
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

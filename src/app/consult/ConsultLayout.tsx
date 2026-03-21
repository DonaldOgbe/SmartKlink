// components/consult/ConsultLayout.tsx
"use client";

import React from "react";
import Link from "next/link";

type ConsultLayoutProps = {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  loadingPrescription: boolean;
};

export default function ConsultLayout({
  children,
  title,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  loadingPrescription,
}: ConsultLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex">
      {/* LEFT COLUMN (Image) */}
      <div className="hidden md:block md:w-[40%] lg:w-[40%] relative">
        <img
          src="/smartklinik_consult_image.png"
          alt="Consult"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full md:w-[65%] lg:w-[70%] bg-white flex flex-col px-6 sm:px-12 py-8">
        {/* LOGO */}
        <Link href="/">
          <div className="flex items-center gap-2 mb-6 cursor-pointer bg-white">
            <img src="/smartklinik_logo.png" alt="logo" className="w-8 h-8" />
            <span className="font-bold text-[#1368FE]">SmartKlinik</span>
          </div>
        </Link>

        {/* PROGRESS BAR */}
        <div className="w-full h-[3px] bg-gray-200 mb-6">
          <div
            className="h-full bg-[#1368FE] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8">{title}</h1>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="max-w-xl w-full">{children}</div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Back
          </button>

          <button
            onClick={onNext}
            disabled={loadingPrescription}
            className="px-6 py-3 rounded-lg bg-[#1368FE] text-white font-semibold hover:bg-[#0f57d1] transition">
            {loadingPrescription ? "Generating..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

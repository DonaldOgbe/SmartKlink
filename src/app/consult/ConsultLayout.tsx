"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;

  return (
    <div className="min-h-screen flex">
      {/* LEFT COLUMN */}
      <div className="hidden md:block md:w-[40%] relative overflow-hidden">
        <Image
          src="/smartklinik_consult_image.png"
          alt="SmartKlinik Consultation"
          fill
          className="object-cover"
          priority
        />
        {/* subtle dark overlay so left side doesn't compete with right */}
        <div className="absolute inset-0 bg-[#0059cd]/10" />
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full md:w-[60%] bg-gray-50 flex flex-col min-h-screen">
        {/* TOP BAR */}
        <div className="px-6 sm:px-10 pt-8 pb-6 bg-white border-b border-gray-100">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white">
              <Image
                src="/smartklinik_logo.png"
                alt="SmartKlinik logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="font-bold text-[#0059cd] text-base">
              SmartKlinik
            </span>
          </Link>

          {/* Step label + progress */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Step {currentStep} of {totalSteps}
            </p>
            <p className="text-xs text-gray-400">
              {Math.round(progress)}% complete
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0059cd] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-5">
            {title}
          </h1>
        </div>

        {/* CONTENT */}
        <div className="flex-1 px-6 sm:px-10 py-8 flex flex-col justify-center">
          <div className="max-w-xl w-full mx-auto">{children}</div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="px-6 sm:px-10 py-6 bg-white border-t border-gray-100">
          <div className="max-w-xl w-full mx-auto flex items-center justify-between gap-4">
            {/* Back */}
            <button
              onClick={onBack}
              disabled={isFirst}
              className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
              Back
            </button>

            {/* Continue */}
            <button
              onClick={onNext}
              disabled={loadingPrescription || isLast}
              className="flex-1 sm:flex-none sm:min-w-[160px] py-3 px-8 rounded-xl bg-[#0059cd] hover:bg-[#0048a8] active:scale-[0.98] transition-all duration-200 text-white font-semibold text-sm shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {loadingPrescription
                ? "Generating..."
                : isLast
                  ? "Finish"
                  : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

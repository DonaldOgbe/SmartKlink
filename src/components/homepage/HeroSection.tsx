// components/HeroSection.tsx
"use client"

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative"
      style={{
        backgroundImage: 'url("/smartklinik_hero_bg.jpg")',
        backgroundSize: "cover", // fills the section, may crop edges slightly
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="relative z-10 max-w-2xl">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-neutral-800 leading-tight">
          Connect with Doctors, Get Prescriptions, and Access Care, All in One
          Place.
        </h1>

        {/* Supporting paragraph */}
        <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
          Explain what SmartKlinik does in 2–3 sentences. Keep it clear and
          concise.
        </p>

        {/* Single CTA button */}
        <Link href="/consult">
          <button className="mt-8 px-8 py-4 bg-white text-[#1368FE] font-semibold rounded-xl shadow-lg hover:bg-blue-50 active:scale-95 transition-all duration-200">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}

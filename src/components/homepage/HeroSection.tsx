"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden"
      style={{
        backgroundImage: 'url("/smartklinik_hero_bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0059cd]/80 via-[#0041a8]/70 to-[#001f6b]/85 z-0" />

      {/* Decorative blurred orbs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-[#0059cd]/20 blur-3xl z-0 pointer-events-none" />

      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available 24 / 7
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Sora', sans-serif" }}>
          Healthcare that fits
          <br />
          <span className="text-[#7eb8ff]">your life.</span>
        </h1>

        {/* Subheading */}
        <p
          className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Connect with licensed doctors, receive digital prescriptions, and
          locate nearby pharmacies — all from one seamless platform.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/consult">
            <button className="px-8 py-4 bg-white text-[#0059cd] font-bold rounded-2xl shadow-xl hover:bg-blue-50 active:scale-95 transition-all duration-200 text-sm sm:text-base">
              {"Get Started — It's Free"}
            </button>
          </Link>
          <Link href="/consult">
            <button className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all duration-200 text-sm sm:text-base">
              See How It Works →
            </button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-white/50 text-xs font-medium tracking-wide">
          {["10,000+ Patients", "500+ Doctors", "NDPR Compliant"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/30" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

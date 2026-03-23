"use client";

import Image from "next/image";
import Link from "next/link";

const links = {
  Product: ["Consult a Doctor", "Prescriptions", "Find Pharmacy", "Pricing"],
  Company: ["About Us", "Careers", "Blog", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "NDPR Compliance", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#00173d] text-white overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0059cd]/60 to-transparent" />

      {/* Faint background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/">
              <div className="flex items-center gap-2.5 cursor-pointer group w-fit">
                <div className="w-9 h-9 rounded-xl bg-[#0059cd] flex items-center justify-center shadow-md shadow-[#0059cd]/40 group-hover:scale-105 transition-transform">
                  <Image
                    src="/smartklinik_logo.png"
                    width={20}
                    height={20}
                    alt="SmartKlinik Logo"
                    className="w-5 h-5 object-contain brightness-0 invert"
                  />
                </div>
                <span
                  className="text-[1.05rem] font-bold tracking-tight"
                  style={{ fontFamily: "'Sora', sans-serif" }}>
                  SmartKlinik
                </span>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-[240px]">
              Modern healthcare for every Nigerian. Consult, prescribe, and
              access care — all in one place.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {["twitter", "instagram", "linkedin"].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0059cd]/40 border border-white/8 flex items-center justify-center transition-all duration-200"
                  aria-label={platform}>
                  <span className="text-white/50 hover:text-white text-[0.65rem] font-bold uppercase transition-colors">
                    {platform[0].toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white/35 text-[0.65rem] font-bold uppercase tracking-widest mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white/55 hover:text-white text-sm transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>
            © {new Date().getFullYear()} SmartKlinik Technologies Ltd. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}

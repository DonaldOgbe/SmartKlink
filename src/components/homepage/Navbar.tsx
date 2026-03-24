"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6">
      <nav
        className={`flex items-center justify-between gap-8 bg-white rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "shadow-xl shadow-black/10" : "shadow-lg shadow-black/8"
        }`}>
        {/* Logo + Name */}
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[#0059cd] flex items-center justify-center shadow-sm shadow-[#0059cd]/30 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/smartklinik_logo.png"
                alt="SmartKlinik Logo"
                width={18}
                height={18}
                className="object-contain brightness-0 invert"
              />
            </div>
            <span
              className="text-[0.95rem] font-bold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              SmartKlinik
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {["About", "How it works", "Contact"].map((label) => (
            <Link
              key={label}
              href={`/`}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-[#0059cd] hover:bg-[#0059cd]/8 transition-all duration-200">
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/consult">
          <button className="px-5 py-2 bg-[#0059cd] text-white text-sm font-semibold rounded-full shadow-md shadow-[#0059cd]/25 hover:bg-[#0047aa] active:scale-95 transition-all duration-200">
            Consult Now
          </button>
        </Link>
      </nav>
    </div>
  );
}

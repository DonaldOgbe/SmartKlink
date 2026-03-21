// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="top-0 left-0 w-full z-30 bg-white px-6 sm:px-12 py-4 flex items-center justify-start shadow-sm">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer">
          {/* Replace '/logo.png' with your actual logo path */}
          <Image
            src="/smartklinik_logo.svg"
            alt="SmartKlinik Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-white">SmartKlinik</span>
        </div>
      </Link>
    </nav>
  );
}

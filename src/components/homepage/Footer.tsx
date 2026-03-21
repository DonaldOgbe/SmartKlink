// components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0041a8] text-white py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
        {/* Logo + Name */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/smartklinik_logo.svg"
              alt="SmartKlinik Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">SmartKlinik</span>
          </div>
        </Link>

        {/* Footer Links */}
        <ul className="flex flex-col sm:flex-row gap-6 text-white/90">
          <li>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/consult"
              className="hover:text-white transition-colors">
              Consult
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-white transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors">
              Privacy
            </Link>
          </li>
        </ul>
      </div>

      {/* Optional copyright */}
      <p className="mt-8 text-center text-white/70 text-sm">
        © {new Date().getFullYear()} SmartKlinik. All rights reserved.
      </p>
    </footer>
  );
}

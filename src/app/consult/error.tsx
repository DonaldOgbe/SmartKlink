"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-sm w-full space-y-4">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1">
          <p className="text-gray-800 font-semibold">Something went wrong</p>
          <p className="text-sm text-gray-400">
            There was a network issue loading this page. Please check your
            connection and try again.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={reset}
            className="w-full py-3 rounded-xl bg-[#0059cd] hover:bg-[#0048a8] active:scale-[0.98] transition-all duration-200 text-white font-semibold text-sm"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}

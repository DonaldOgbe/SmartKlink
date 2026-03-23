// app/payment/page.tsx
import { Suspense } from "react";
import PaymentCallbackPage from "./PaymentCallbackPage"; // your actual component

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
          <div className="w-8 h-8 rounded-full border-2 border-[#0059cd] border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">Verifying your payment...</p>
        </div>
      }>
      <PaymentCallbackPage />
    </Suspense>
  );
}

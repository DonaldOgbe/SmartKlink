"use client";

import { FormData, ConsultationResult, Pharmacy} from "@/types/consult";

type PaymentPayload = {
  email: string;
  amount: number;
};

type PaystackResponse = {
  authorization_url: string;
  reference: string;
  access_code: string;
};

type Props = {
  formData: FormData;
  consultationResult: ConsultationResult | null;
  selectedPharmacy: Pharmacy | null;
};

export default function PaymentStep({
  formData,
  consultationResult,
  selectedPharmacy,
}: Props) {
  if (!consultationResult) return null;

  const baseTotal = consultationResult.total || 0;

  let discount = 0;
  if (formData.hasInsurance && formData.insuranceProvider === "NHIA") {
    discount = baseTotal * 0.9;
  }
  const finalTotal = baseTotal - discount;

  const handlePaystack = async () => {
    const payload: PaymentPayload = {
      email: formData.email,
      amount: finalTotal * 100,
    };

    try {
      const response = await fetch("/api/payment/paystack/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: PaystackResponse = await response.json();

      if (!data.authorization_url) {
        console.error("No authorization URL returned");
        return;
      }

      
      sessionStorage.setItem(
        "consultData",
        JSON.stringify({
          formData,
          consultationResult,
          selectedPharmacy,
          finalTotal,
          discount,
        }),
      );

      console.log(
        "saved to sessionStorage:",
        sessionStorage.getItem("consultData"),
      );

      
      window.location.href = data.authorization_url;
    } catch (err) {
      console.error("[handlePaystack]", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* AMOUNT CARD */}
      <div className="bg-[#0059cd] rounded-2xl p-6 text-white text-center space-y-1">
        <p className="text-sm text-blue-200 font-medium uppercase tracking-wide">
          Amount Due
        </p>
        <h1 className="text-5xl font-bold">₦{finalTotal.toLocaleString()}</h1>
        {discount > 0 && (
          <p className="text-sm text-blue-200 mt-1">
            NHIA Insurance discount applied — you saved ₦
            {discount.toLocaleString()}
          </p>
        )}
      </div>

      {/* BILLING SUMMARY */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
          Billing Summary
        </p>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Patient</span>
          <span className="font-medium text-gray-800">
            {formData.firstName} {formData.lastName}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Consultation fee</span>
          <span className="font-medium text-gray-800">
            ₦{baseTotal.toLocaleString()}
          </span>
        </div>

        {selectedPharmacy && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Pharmacy</span>
            <span className="font-medium text-gray-800">
              {selectedPharmacy.name}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Insurance discount</span>
            <span className="font-medium">− ₦{discount.toLocaleString()}</span>
          </div>
        )}

        <hr />

        <div className="flex justify-between text-sm font-semibold text-gray-800">
          <span>Total</span>
          <span>₦{finalTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* PAYSTACK BUTTON */}
      <button
        onClick={handlePaystack}
        className="w-full py-4 rounded-xl bg-[#0059cd] hover:bg-[#0048a8] active:scale-[0.98] transition-all duration-200 text-white font-semibold text-base shadow-md shadow-blue-200">
        Pay ₦{finalTotal.toLocaleString()} with Paystack
      </button>

      <p className="text-xs text-center text-gray-400">
        Secured by Paystack. Your prescription unlocks immediately after
        payment.
      </p>
    </div>
  );
}

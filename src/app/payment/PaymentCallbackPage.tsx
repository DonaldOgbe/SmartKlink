"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, MapPin, Pill, User, ClipboardList } from "lucide-react";
import {
  FormData,
  ConsultationResult,
  Medication,
  Pharmacy,
} from "@/types/consult";

type ConsultData = {
  formData: FormData;
  consultationResult: ConsultationResult;
  selectedPharmacy: Pharmacy | null;
  finalTotal: number;
  discount: number;
};

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ConsultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        const reference = searchParams.get("reference");
        if (!reference) {
          if (!cancelled) {
            setError(true);
            setLoading(false);
          }
          return;
        }

        const res = await fetch(
          `/api/payment/paystack/verify?reference=${reference}`,
        );
        const result = await res.json();

        if (!result.status || result.data?.status !== "success") {
          if (!cancelled) {
            setError(true);
            setLoading(false);
          }
          return;
        }

        const raw = sessionStorage.getItem("consultData");
        if (!raw) {
          if (!cancelled) {
            setError(true);
            setLoading(false);
          }
          return;
        }

        const parsed: ConsultData = JSON.parse(raw);

        if (!cancelled) {
          sessionStorage.removeItem("consultData");
          setData(parsed);
          setLoading(false);
        }
      } catch (err) {
        console.error("[callback]", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="w-8 h-8 rounded-full border-2 border-[#0059cd] border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Verifying your payment...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-sm space-y-3">
          <p className="text-gray-800 font-semibold">Something went wrong</p>
          <p className="text-sm text-gray-400">
            {
              "We couldn't verify your payment. If you were charged, check your email for confirmation or contact support."
            }
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-xl bg-[#0059cd] text-white font-semibold text-sm mt-2 hover:bg-[#0048a8] transition">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const {
    formData,
    consultationResult,
    selectedPharmacy,
    finalTotal,
    discount,
  } = data;
  const baseTotal = finalTotal + discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* SUCCESS BANNER */}
        <div className="bg-[#0059cd] rounded-2xl p-6 text-white text-center space-y-2">
          <div className="flex justify-center">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful</h1>
          <p className="text-blue-200 text-sm">
            Your prescription is now unlocked
          </p>
          <div className="inline-block bg-white/10 rounded-lg px-4 py-2 mt-1">
            <p className="text-xs text-blue-200 uppercase tracking-wide mb-0.5">
              Prescription ID
            </p>
            <p className="text-white font-mono font-bold tracking-widest">
              {searchParams.get("reference")?.toUpperCase()}
            </p>
          </div>
        </div>

        {/* PATIENT DETAILS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-[#0059cd]" />
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Patient Details
            </p>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Name</span>
            <span className="font-medium text-gray-800">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Age</span>
            <span className="font-medium text-gray-800">{formData.age}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800">{formData.email}</span>
          </div>
          {formData.hasInsurance && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Insurance</span>
              <span className="font-medium text-gray-800">
                {formData.insuranceProvider} — {formData.insuranceId}
              </span>
            </div>
          )}
        </div>

        {/* DOCTOR SUMMARY */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-4 h-4 text-[#0059cd]" />
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              {"Doctor's Summary"}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-800">
            {consultationResult.summary}
          </p>
          <p className="text-sm text-gray-500">
            {consultationResult.recommendation}
          </p>
          <p className="text-xs text-gray-400">
            Dr. {consultationResult.doctor?.name || "Assigned Doctor"}
          </p>
        </div>

        {/* FULL PRESCRIPTION — UNLOCKED */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#0059cd]" />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Full Prescription
              </p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              ✓ Unlocked
            </span>
          </div>

          <div className="space-y-3">
            {consultationResult.medications.map(
              (med: Medication, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{med.name}</p>
                    <p className="text-xs text-gray-400">{med.dosage}</p>
                  </div>
                  <span className="font-medium text-gray-800">
                    ₦{med.price.toLocaleString()}
                  </span>
                </div>
              ),
            )}
          </div>

          <hr />

          {consultationResult.instructions && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                Instructions
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {consultationResult.instructions}
              </p>
            </div>
          )}

          <hr />

          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-800">
              ₦{baseTotal.toLocaleString()}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Insurance discount</span>
              <span className="font-medium">
                − ₦{discount.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Paid</span>
            <span>₦{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* PHARMACY */}
        {selectedPharmacy && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#0059cd]" />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Pickup Pharmacy
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              {selectedPharmacy.name}
            </p>
            <p className="text-sm text-gray-400">{selectedPharmacy.address}</p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 pb-8">
          <button
            onClick={() => window.print()}
            className="w-full py-4 rounded-xl bg-[#0059cd] hover:bg-[#0048a8] active:scale-[0.98] transition-all duration-200 text-white font-semibold text-sm shadow-md shadow-blue-200">
            Download / Print Prescription
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

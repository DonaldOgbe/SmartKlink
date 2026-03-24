"use client";

import ConsultLayout from "@/app/consult/ConsultLayout";
import { useState } from "react";
import UserInfoStep from "./steps/UserInfoStep";
import ChatStep from "./steps/ChatStep";
import DoctorReportStep from "./steps/DoctorsReportStep";
import PaymentStep from "./steps/PaymentStep";
import {
  FormData,
  Message,
  Location,
  Pharmacy,
  ConsultationResult,
} from "@/types/consult";
import PharmacyStep from "./steps/PharmacyStep";

const steps = [
  { title: "Tell us a little bit about yourself", component: UserInfoStep },
  { title: "Chat with a doctor", component: ChatStep },
  { title: "Doctor's Report", component: DoctorReportStep },
  { title: "Find a pharmacy", component: PharmacyStep },
  { title: "Pay for Prescription and Medication", component: PaymentStep },
];

export default function ConsultPage() {
  const [currentStep, setCurrentStep] = useState(0);

  // form
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    hasInsurance: false,
    insuranceProvider: "",
    insuranceId: "",
  });

  // chat
  const [messages, setMessages] = useState<Message[]>([]);

  // doctors report
  const [consultationResult, setConsultationResult] =
    useState<ConsultationResult | null>(null);

  const [loadingPrescription, setLoadingPrescription] = useState(false);

  // pharmacies
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  );

  const step = steps[currentStep];
  const StepComponent = step.component;

  const handleNext = async () => {
    // Step 2 (Chat) → Step 3 (DoctorReport): fetch the AI report
    if (currentStep === 1) {
      if (messages.length === 0) return;
      setLoadingPrescription(true);
      try {
        const res = await fetch("/api/prescription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages
          }),
        });
        const data = await res.json();
        setConsultationResult(data); // partial/locked data
        setCurrentStep((prev) => prev + 1);
      } catch (err) {
        console.error(err);
      }
      setLoadingPrescription(false);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = async () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <ConsultLayout
      title={step.title}
      currentStep={currentStep + 1}
      totalSteps={steps.length}
      onNext={handleNext}
      onBack={handleBack}
      loadingPrescription={loadingPrescription}>
      <StepComponent
        formData={formData}
        setFormData={setFormData}
        messages={messages}
        setMessages={setMessages}
        consultationResult={consultationResult}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedPharmacy={selectedPharmacy}
        setSelectedPharmacy={setSelectedPharmacy}
      />
    </ConsultLayout>
  );
}

// components/HowItWorks.tsx
import { Form, MessagesSquare, Pill, Hospital } from "lucide-react";

const steps = [
  {
    title: "Submit Info",
    icon: <Form className="w-16 h-16" />,
    description:
      "Fill in some information about youself, so the Doctor can better understand you",
  },
  {
    title: "Chat with Doctor",
    icon: <MessagesSquare className="w-16 h-16" />,
    description:
      "Fill in some information about youself, so the Doctor can better understand you",
  },
  {
    title: "Get Prescription",
    icon: <Pill className="w-16 h-16" />,
    description:
      "Fill in some information about youself, so the Doctor can better understand you",
  },
  {
    title: "Find Pharmacy",
    icon: <Hospital className="w-16 h-16" />,
    description:
      "Fill in some information about youself, so the Doctor can better understand you",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-20 -mt-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto text-center bg-white rounded-3xl shadow-2xl py-20 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-12 text-[#0057d5]">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-md p-6">
              <span className="text-[#0057d5] mb-5">{step.icon}</span>
              <span className="font-display font-semibold text-sm text-black">
                {step.title}
              </span>
              <span className="font-sans text-sm text-black">
                {step.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

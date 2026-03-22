import { FileText, MessagesSquare, Pill, MapPin } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Submit Your Info",
    icon: FileText,
    description:
      "Fill in a short health form so the doctor has the context they need before your consultation.",
  },
  {
    step: "02",
    title: "Chat with a Doctor",
    icon: MessagesSquare,
    description:
      "Connect instantly with a licensed physician via secure text or video — no waiting rooms.",
  },
  {
    step: "03",
    title: "Get Your Prescription",
    icon: Pill,
    description:
      "Receive a verified digital prescription directly to your SmartKlinik account.",
  },
  {
    step: "04",
    title: "Find a Pharmacy",
    icon: MapPin,
    description:
      "Locate a nearby pharmacy and get your medication fulfilled with one tap.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-20 -mt-20 px-4 sm:px-10 pb-24">
      <div
        className="max-w-6xl mx-auto rounded-[2rem] shadow-2xl shadow-[#0059cd]/10 overflow-hidden"
        style={{ background: "#ffffff" }}>
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0059cd] via-[#4d9aff] to-[#0059cd]" />

        <div className="px-8 sm:px-16 py-20">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0059cd]/8 text-[#0059cd] text-xs font-bold tracking-widest uppercase mb-4">
              The Process
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              How It Works
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">
              From symptom to solution in four simple steps.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-[#0059cd]/[0.03] hover:border-[#0059cd]/20 transition-all duration-300">
                  {/* Step number + connector */}
                  <div className="flex items-center gap-3">
                    <span className="text-[0.7rem] font-black tracking-widest text-[#0059cd]/40 uppercase">
                      {step.step}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px border-t border-dashed border-[#0059cd]/15" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#0059cd]/10 flex items-center justify-center group-hover:bg-[#0059cd]/15 transition-colors duration-300">
                    <Icon
                      className="w-5 h-5 text-[#0059cd]"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="font-bold text-gray-900 text-[0.95rem] mb-2"
                      style={{ fontFamily: "'Sora', sans-serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

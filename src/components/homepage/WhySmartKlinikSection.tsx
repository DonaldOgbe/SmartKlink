import {
  UserCheck,
  Clipboard,
  MapPin,
  Shield,
  Clock,
  Star,
} from "lucide-react";

const values = [
  {
    title: "Instant Doctor Access",
    icon: UserCheck,
    description:
      "Skip the waiting room. Connect with a licensed physician in under 2 minutes, any time of day.",
    accent: "from-[#0059cd]/10 to-[#4d9aff]/5",
  },
  {
    title: "Seamless Prescriptions",
    icon: Clipboard,
    description:
      "Receive verified digital prescriptions that are legally recognized and easy to share with any pharmacy.",
    accent: "from-[#0059cd]/10 to-[#4d9aff]/5",
  },
  {
    title: "Nearby Pharmacies",
    icon: MapPin,
    description:
      "Locate the closest pharmacy to fulfil your prescription — with live stock availability.",
    accent: "from-[#0059cd]/10 to-[#4d9aff]/5",
  },
  {
    title: "Private & Secure",
    icon: Shield,
    description:
      "All consultations are end-to-end encrypted and fully compliant with Nigeria's NDPR data regulations.",
    accent: "from-[#0059cd]/10 to-[#4d9aff]/5",
  },
  {
    title: "Available 24 / 7",
    icon: Clock,
    description:
      "Whether it's 2 PM or 2 AM, a doctor is always ready. Healthcare doesn't keep office hours.",
    accent: "from-[#0059cd]/10 to-[#4d9aff]/5",
  },
  {
    title: "Trusted Professionals",
    icon: Star,
    description:
      "Every doctor on SmartKlinik is verified, licensed, and peer-reviewed by our medical board.",
    accent: "from-[#0059cd]/10 to-[#4d9aff]/5",
  },
];

export default function WhySmartKlinik() {
  return (
    <section className="bg-white py-28 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Section header — left-aligned for editorial variety */}
        <div className="max-w-xl mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#0059cd]/8 text-[#0059cd] text-xs font-bold tracking-widest uppercase mb-4">
            Why Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            Built around what
            <br />
            patients actually need.
          </h2>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            { "We've removed every barrier between you and quality healthcare. No jargon, no friction, no unnecessary steps." }
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`group relative flex flex-col gap-4 p-7 rounded-2xl bg-gradient-to-br ${value.accent} border border-gray-100 hover:border-[#0059cd]/20 hover:shadow-lg hover:shadow-[#0059cd]/5 transition-all duration-300 cursor-default`}>
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#0059cd] flex items-center justify-center shadow-md shadow-[#0059cd]/25 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="font-bold text-gray-900 text-[0.95rem] mb-2"
                    style={{ fontFamily: "'Sora', sans-serif" }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

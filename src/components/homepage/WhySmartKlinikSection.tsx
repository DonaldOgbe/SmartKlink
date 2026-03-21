// components/homepage/WhySmartKlinik.tsx
import { UserCheck, Clipboard, MapPin } from "lucide-react";

const values = [
  {
    title: "Quick access to doctors",
    icon: <UserCheck />,
    description: "Some long description about each values",
  },
  {
    title: "Seamless prescriptions",
    icon: <Clipboard />,
    description: "Some long description about each values",
  },
  {
    title: "Nearby pharmacies",
    icon: <MapPin />,
    description: "Some long description about each values",
  },
];

export default function WhySmartKlinik() {
  return (
    <section className="bg-white py-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Why SmartKlinik?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-center gap-4 p-6">
              <span className="text-black mb-5">{value.icon}</span>
              <span className="font-display font-semibold text-sm text-black">
                {value.title}
              </span>
              <span className="font-sans text-sm text-black">
                {value.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

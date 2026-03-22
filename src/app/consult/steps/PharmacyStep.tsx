"use client";

import { useState, useEffect } from "react";
import { Location, Pharmacy } from "@/types/consult";

type Props = {
  selectedLocation: Location | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  selectedPharmacy: Pharmacy | null;
  setSelectedPharmacy: React.Dispatch<React.SetStateAction<Pharmacy | null>>;
};

export default function PharmacyStep({
  selectedLocation,
  setSelectedLocation,
  selectedPharmacy,
  setSelectedPharmacy,
}: Props) {
  const [availablePharmacies, setAvailablePharmacies] = useState<Pharmacy[]>(
    [],
  );

  const states = ["Bayelsa"];
  const cities = ["Yenagoa"];

  useEffect(() => {
    if (selectedLocation?.city) {
      setAvailablePharmacies([
        {
          id: "1",
          name: "Denson Pharmacy",
          address: "Mbiama-Yenagoa Road, Yenagoa 569101, Bayelsa",
          imageUrl: "/Denson_pharmacy.jpg",
        },
        {
          id: "2",
          name: "Zurich Medicals",
          address: "563 Mbiama-Yenagoa Road, Yenagoa 569101, Bayelsa",
          imageUrl: "/Zurich_medical.jpg",
        },
        {
          id: "3",
          name: "Asueifai Hospital Pharmacy",
          address: "No. 14 Asueifai Off Baybridge Road, Hospital Road, Yenagoa",
          imageUrl: "/Asueifai_hospital.webp",
        },
        {
          id: "4",
          name: "Montana Pharmacy Ltd",
          address:
            "Isaac Borough Express Way, PDP Rd, Yenizue-gene, Yenagoa 569101, Bayelsa",
          imageUrl: "/Montana_pharmacy.webp",
        },
      ]);
    } else {
      setAvailablePharmacies([]);
    }
  }, [selectedLocation]);

  return (
    <div className="space-y-6">
      {/* LOCATION CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Select Your Location
        </p>

        <div className="flex gap-3">
          <select
            className="flex-1 p-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0059cd] focus:border-transparent transition"
            value={selectedLocation?.state || ""}
            onChange={(e) =>
              setSelectedLocation({
                state: e.target.value,
                city: selectedLocation?.city || "",
              })
            }>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            className="flex-1 p-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0059cd] focus:border-transparent transition disabled:opacity-40 disabled:cursor-not-allowed"
            value={selectedLocation?.city || ""}
            onChange={(e) =>
              setSelectedLocation({
                state: selectedLocation?.state || "",
                city: e.target.value,
              })
            }
            disabled={!selectedLocation?.state}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PHARMACIES CARD */}
      {availablePharmacies.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            Available Pharmacies
          </p>

          <div className="flex flex-col gap-3">
            {availablePharmacies.map((pharm) => {
              const isSelected = selectedPharmacy?.id === pharm.id;
              return (
                <div
                  key={pharm.id}
                  onClick={() => setSelectedPharmacy(pharm)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-[#0059cd] bg-blue-50 shadow-sm"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                  }`}>
                  {/* Image placeholder */}
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex-shrink-0 overflow-hidden">
                    <img
                      src={pharm.imageUrl}
                      alt={pharm.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // fallback if image missing
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-sm ${isSelected ? "text-[#0059cd]" : "text-gray-800"}`}>
                      {pharm.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {pharm.address}
                    </p>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0059cd] flex-shrink-0 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

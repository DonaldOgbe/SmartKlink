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

  // Simulate fetching pharmacies once city is selected
  useEffect(() => {
    if (selectedLocation?.city) {
      // for MVP we hardcode
      setAvailablePharmacies([
        {
          id: "1",
          name: "Yenagoa Pharmacy",
          address: "123 Main Street, Yenagoa",
          imageUrl: "/pharmacy1.jpg",
        },
        {
          id: "2",
          name: "Central Pharmacy",
          address: "45 Market Road, Yenagoa",
          imageUrl: "/pharmacy2.jpg",
        },
      ]);
    } else {
      setAvailablePharmacies([]);
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col gap-6">
      {/* CARD 1: Select State & City */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h3 className="font-semibold text-lg">Select Your Location</h3>
        <div className="flex gap-4">
          <select
            className="flex-1 p-3 border rounded-lg"
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
            className="flex-1 p-3 border rounded-lg"
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

      {/* CARD 2: List Pharmacies */}
      {availablePharmacies.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h3 className="font-semibold text-lg">Available Pharmacies</h3>
          <div className="grid grid-cols-1 gap-4">
            {availablePharmacies.map((pharm) => (
              <div
                key={pharm.id}
                className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer hover:shadow-md transition ${
                  selectedPharmacy?.id === pharm.id
                    ? "border-[#1368FE]"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedPharmacy(pharm)}>
                <img
                  src={pharm.imageUrl}
                  alt={pharm.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{pharm.name}</p>
                  <p className="text-sm text-gray-500">{pharm.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

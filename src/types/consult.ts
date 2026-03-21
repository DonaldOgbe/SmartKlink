// src/types/consult.ts

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  hasInsurance: false;
  insuranceProvider: ""; // now controlled list
  insuranceId: "";
}

export interface Message {
  sender: "user" | "doctor";
  text: string;
}

export interface Medication {
  name: string;
  dosage: string;
  price: number;
}

export interface Doctor {
  name: string;
}


export type Location = {
  state: string;
  city: string;
};

export type Pharmacy = {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
};

export type Insurance = {
  provider: "NHIA";
  coverage: number; // percentage (e.g. 0.2 for 20%)
};

interface BaseConsultation {
  doctor: Doctor;
  medications: Medication[];
  total: number;
  summary: string;
  recommendation: string;
}

// partial — what you get from the API after chat
export interface ConsultationResult extends BaseConsultation {
  instructions?: string; // optional at this stage
}

// full — unlocked after payment
export interface Prescription extends BaseConsultation {
  instructions: string; // required now
}
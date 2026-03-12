export type UserRole = 'patient' | 'doctor' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  age?: number;
  gender?: string;
  village?: string;
  blood_group?: string;
  medical_history?: string;
}

export interface Doctor {
  id: string;
  specialization?: string;
  hospital_name?: string;
  license_number?: string;
  available?: boolean;
}

export interface Pharmacy {
  id: string;
  pharmacy_name?: string;
  village?: string;
  contact_number?: string;
}

export interface Medicine {
  id: string;
  name: string;
  description?: string;
  dosage_form?: string;
  manufacturer?: string;
  requires_prescription?: boolean;
}

export interface PharmacyInventory {
  id: string;
  pharmacy_id: string;
  medicine_id: string;
  stock: number;
  price?: number;
  expiry_date?: string;
  reorder_level?: number;
  last_updated?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_time: string;
  symptoms?: string;
  status: string;
  prescription_id?: string;
  follow_up_date?: string;
  consultation_notes?: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  issued_at: string;
  valid_until?: string;
  status: string;
}

export interface PrescriptionItem {
  id: string;
  prescription_id: string;
  medicine_id: string;
  dosage?: string;
  frequency?: string;
  duration_days?: number;
}

export interface SymptomLog {
  id: string;
  patient_id: string;
  symptoms?: string;
  predicted_disease?: string;
  severity?: string;
  created_at: string;
}

export interface Patient {
  _id: string;
  id: string;
  name: string;
  phone: string;
}

export interface Doctor {
  _id: string;
  id: string;
  name: string;
  specialty: string;
  phone?: string;
  email?: string;
}

export type AppointmentStatus = 'Agendada' | 'Confirmada' | 'Realizada' | 'Cancelada';

export interface Appointment {
  _id: string;
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  status: AppointmentStatus;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor';
  doctorId?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export type AppointmentStatus = 'Agendada' | 'Confirmada' | 'Realizada' | 'Cancelada';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  status: AppointmentStatus;
}

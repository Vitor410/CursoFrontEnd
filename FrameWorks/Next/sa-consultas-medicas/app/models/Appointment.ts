import mongoose, { Schema, Document } from 'mongoose';

export type AppointmentStatus = 'Agendada' | 'Confirmada' | 'Realizada' | 'Cancelada';

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: string; // ISO date string
  time: string; // HH:MM format
  status: AppointmentStatus;
}

const AppointmentSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['Agendada', 'Confirmada', 'Realizada', 'Cancelada'], required: true },
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

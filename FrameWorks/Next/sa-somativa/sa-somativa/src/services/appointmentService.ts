import dbConnect from '../lib/mongodb';
import Appointment from '../models/appointment';

export async function getAllAppointments() {
  await dbConnect();
  return Appointment.find({}).populate('patient doctor');
}

export async function getAppointmentById(id: string) {
  await dbConnect();
  return Appointment.findById(id).populate('patient doctor');
}

export async function createAppointment(data: { patient: string; doctor: string; date: Date; time: string; status?: string }) {
  await dbConnect();
  // Check for conflicts
  const { doctor: doctorId, date, time } = data;
  const existing = await Appointment.find({
    doctor: doctorId,
    date,
    time,
    status: { $ne: 'Cancelada' }
  });
  if (existing.length > 0) {
    throw new Error('Horario ja ocupado para este medico');
  }
  const appointment = new Appointment(data);
  return appointment.save();
}

export async function updateAppointment(id: string, data: { patient?: string; doctor?: string; date?: Date; time?: string; status?: string }) {
  await dbConnect();
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new Error('Appointment not found');
  
  if (data.date || data.time) {
    const { doctor = appointment.doctor, date = appointment.date, time = appointment.time } = data;
    const existing = await Appointment.find({
      _id: { $ne: id },
      doctor,
      date,
      time,
      status: { $ne: 'Cancelada' }
    });
    if (existing.length > 0) {
      throw new Error('Horario ja ocupado para este medico');
    }
  }
  return Appointment.findByIdAndUpdate(id, data, { new: true }).populate('patient doctor');
}

export async function deleteAppointment(id: string) {
  await dbConnect();
  return Appointment.findByIdAndDelete(id);
}

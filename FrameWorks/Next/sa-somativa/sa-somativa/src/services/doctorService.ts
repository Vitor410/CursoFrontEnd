import dbConnect from '../lib/mongodb';
import Doctor from '../models/doctor';

export async function getAllDoctors() {
  await dbConnect();
  return Doctor.find({});
}

export async function getDoctorById(id: string) {
  await dbConnect();
  return Doctor.findById(id);
}

export async function createDoctor(data: { name: string; specialty: string }) {
  await dbConnect();
  const doctor = new Doctor(data);
  return doctor.save();
}

export async function updateDoctor(id: string, data: { name?: string; specialty?: string }) {
  await dbConnect();
  return Doctor.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteDoctor(id: string) {
  await dbConnect();
  return Doctor.findByIdAndDelete(id);
}

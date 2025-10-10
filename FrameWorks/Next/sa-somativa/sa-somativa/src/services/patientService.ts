import dbConnect from '../lib/mongodb';
import Patient from '../models/patient';

export async function getAllPatients() {
  await dbConnect();
  return Patient.find({});
}

export async function getPatientById(id: string) {
  await dbConnect();
  return Patient.findById(id);
}

export async function createPatient(data: { name: string; phone: string }) {
  await dbConnect();
  const patient = new Patient(data);
  return patient.save();
}

export async function updatePatient(id: string, data: { name?: string; phone?: string }) {
  await dbConnect();
  return Patient.findByIdAndUpdate(id, data, { new: true });
}

export async function deletePatient(id: string) {
  await dbConnect();
  return Patient.findByIdAndDelete(id);
}

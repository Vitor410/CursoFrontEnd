import { NextRequest, NextResponse } from 'next/server';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../../../services/patientService';

export async function getAll() {
  try {
    const patients = await getAllPatients();
    return NextResponse.json(patients);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function create(request: NextRequest) {
  try {
    const body = await request.json();
    const patient = await createPatient(body);
    return NextResponse.json(patient, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function getById(id: string) {
  try {
    const patient = await getPatientById(id);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    return NextResponse.json(patient);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 });
  }
}

export async function update(id: string, request: NextRequest) {
  try {
    const body = await request.json();
    const patient = await updatePatient(id, body);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    return NextResponse.json(patient);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function remove(id: string) {
  try {
    const patient = await deletePatient(id);
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Patient deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete patient' }, { status: 500 });
  }
}

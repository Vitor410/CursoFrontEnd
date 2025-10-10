import { NextRequest, NextResponse } from 'next/server';
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '../../../services/doctorService';

export async function getAll() {
  try {
    const doctors = await getAllDoctors();
    return NextResponse.json(doctors);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function create(request: NextRequest) {
  try {
    const body = await request.json();
    const doctor = await createDoctor(body);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function getById(id: string) {
  try {
    const doctor = await getDoctorById(id);
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json(doctor);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
  }
}

export async function update(id: string, request: NextRequest) {
  try {
    const body = await request.json();
    const doctor = await updateDoctor(id, body);
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json(doctor);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function remove(id: string) {
  try {
    const doctor = await deleteDoctor(id);
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Doctor deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}

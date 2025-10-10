import { NextRequest, NextResponse } from 'next/server';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from '../../../services/appointmentService';

export async function getAll() {
  try {
    const appointments = await getAllAppointments();
    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function create(request: NextRequest) {
  try {
    const body = await request.json();
    const appointment = await createAppointment(body);
    return NextResponse.json(appointment, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function getById(id: string) {
  try {
    const appointment = await getAppointmentById(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 });
  }
}

export async function update(id: string, request: NextRequest) {
  try {
    const body = await request.json();
    const appointment = await updateAppointment(id, body);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json(appointment);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function remove(id: string) {
  try {
    const appointment = await deleteAppointment(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}

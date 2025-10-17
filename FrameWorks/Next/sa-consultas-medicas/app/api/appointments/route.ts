import { NextRequest, NextResponse } from 'next/server';
import { Appointment } from '../../types';

let appointments: Appointment[] = [
  { id: '1', patientId: '1', doctorId: '1', date: '2024-10-01', time: '09:00', status: 'Agendada' },
  { id: '2', patientId: '2', doctorId: '2', date: '2024-10-02', time: '10:00', status: 'Confirmada' },
];

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
  const body: Omit<Appointment, 'id'> = await request.json();

  // Validation: Check if doctor is available at that date and time
  const conflict = appointments.find(
    a => a.doctorId === body.doctorId && a.date === body.date && a.time === body.time && a.status !== 'Cancelada'
  );
  if (conflict) {
    return NextResponse.json({ error: 'Horário ocupado para este médico' }, { status: 400 });
  }

  const newAppointment: Appointment = {
    id: Date.now().toString(),
    ...body,
  };
  appointments.push(newAppointment);
  return NextResponse.json(newAppointment, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body: Appointment = await request.json();
  const index = appointments.findIndex(a => a.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }

  // Validation for update: Check if new time conflicts
  const conflict = appointments.find(
    a => a.id !== body.id && a.doctorId === body.doctorId && a.date === body.date && a.time === body.time && a.status !== 'Cancelada'
  );
  if (conflict) {
    return NextResponse.json({ error: 'Horário ocupado para este médico' }, { status: 400 });
  }

  appointments[index] = body;
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  appointments = appointments.filter(a => a.id !== id);
  return NextResponse.json({ message: 'Appointment deleted' });
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Appointment from '../../models/Appointment';

export async function GET() {
  await dbConnect();
  const appointments = await Appointment.find({}).populate('patientId').populate('doctorId');
  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();

  // Validation: Check if doctor is available at that date and time
  const conflict = await Appointment.findOne({
    doctorId: body.doctorId,
    date: body.date,
    time: body.time,
    status: { $ne: 'Cancelada' }
  });
  if (conflict) {
    return NextResponse.json({ error: 'Horário ocupado para este médico' }, { status: 400 });
  }

  const newAppointment = new Appointment(body);
  await newAppointment.save();
  return NextResponse.json(newAppointment, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const existingAppointment = await Appointment.findById(body._id);
  if (!existingAppointment) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }

  // Validation for update: Check if new time conflicts
  const conflict = await Appointment.findOne({
    _id: { $ne: body._id },
    doctorId: body.doctorId,
    date: body.date,
    time: body.time,
    status: { $ne: 'Cancelada' }
  });
  if (conflict) {
    return NextResponse.json({ error: 'Horário ocupado para este médico' }, { status: 400 });
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(body._id, body, { new: true });
  return NextResponse.json(updatedAppointment);
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  const deletedAppointment = await Appointment.findByIdAndDelete(id);
  if (!deletedAppointment) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Appointment deleted' });
}

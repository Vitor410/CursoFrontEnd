import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Appointment from '../../models/Appointment';
import { verifyToken } from '../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();

    let appointments;
    if (user.role === 'admin') {
      // Admin can see all appointments
      appointments = await Appointment.find({}).populate('patientId').populate('doctorId');
    } else if (user.role === 'doctor' && user.doctorId) {
      // Doctor can only see their own appointments
      appointments = await Appointment.find({ doctorId: user.doctorId }).populate('patientId').populate('doctorId');
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Transform the data to match the frontend types
    const transformedAppointments = appointments.map((appt: any) => ({
      _id: appt._id.toString(),
      id: appt._id.toString(),
      patientId: appt.patientId._id.toString(),
      doctorId: appt.doctorId._id.toString(),
      date: appt.date,
      time: appt.time,
      status: appt.status,
    }));

    return NextResponse.json(transformedAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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
    const transformedAppointment = {
      _id: newAppointment._id.toString(),
      id: newAppointment._id.toString(),
      patientId: newAppointment.patientId.toString(),
      doctorId: newAppointment.doctorId.toString(),
      date: newAppointment.date,
      time: newAppointment.time,
      status: newAppointment.status,
    };
    return NextResponse.json(transformedAppointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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
    const transformedUpdatedAppointment = {
      _id: updatedAppointment._id.toString(),
      id: updatedAppointment._id.toString(),
      patientId: updatedAppointment.patientId.toString(),
      doctorId: updatedAppointment.doctorId.toString(),
      date: updatedAppointment.date,
      time: updatedAppointment.time,
      status: updatedAppointment.status,
    };
    return NextResponse.json(transformedUpdatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}

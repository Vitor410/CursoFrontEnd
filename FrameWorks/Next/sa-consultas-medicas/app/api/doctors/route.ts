import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Doctor from '../../models/Doctor';

export async function GET() {
  await dbConnect();
  const doctors = await Doctor.find({});
  return NextResponse.json(doctors);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const newDoctor = new Doctor(body);
  await newDoctor.save();
  return NextResponse.json(newDoctor, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const updatedDoctor = await Doctor.findByIdAndUpdate(body._id, body, { new: true });
  if (!updatedDoctor) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }
  return NextResponse.json(updatedDoctor);
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  const deletedDoctor = await Doctor.findByIdAndDelete(id);
  if (!deletedDoctor) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Doctor deleted' });
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Patient from '../../models/Patient';

export async function GET() {
  await dbConnect();
  const patients = await Patient.find({});
  return NextResponse.json(patients);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const newPatient = new Patient(body);
  await newPatient.save();
  return NextResponse.json(newPatient, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const updatedPatient = await Patient.findByIdAndUpdate(body._id, body, { new: true });
  if (!updatedPatient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }
  return NextResponse.json(updatedPatient);
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  const deletedPatient = await Patient.findByIdAndDelete(id);
  if (!deletedPatient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Patient deleted' });
}

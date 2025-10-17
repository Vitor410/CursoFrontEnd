import { NextRequest, NextResponse } from 'next/server';
import { Patient } from '../../types';

let patients: Patient[] = [
  { id: '1', name: 'João Silva', phone: '11987654321' },
  { id: '2', name: 'Maria Oliveira', phone: '11987654322' },
];

export async function GET() {
  return NextResponse.json(patients);
}

export async function POST(request: NextRequest) {
  const body: Omit<Patient, 'id'> = await request.json();
  const newPatient: Patient = {
    id: Date.now().toString(),
    ...body,
  };
  patients.push(newPatient);
  return NextResponse.json(newPatient, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body: Patient = await request.json();
  const index = patients.findIndex(p => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }
  patients[index] = body;
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  patients = patients.filter(p => p.id !== id);
  return NextResponse.json({ message: 'Patient deleted' });
}

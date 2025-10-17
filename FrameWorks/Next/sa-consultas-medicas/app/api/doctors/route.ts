import { NextRequest, NextResponse } from 'next/server';
import { Doctor } from '../../types';

let doctors: Doctor[] = [
  { id: '1', name: 'Dr. Ana Costa', specialty: 'Cardiologia' },
  { id: '2', name: 'Dr. Pedro Santos', specialty: 'Dermatologia' },
];

export async function GET() {
  return NextResponse.json(doctors);
}

export async function POST(request: NextRequest) {
  const body: Omit<Doctor, 'id'> = await request.json();
  const newDoctor: Doctor = {
    id: Date.now().toString(),
    ...body,
  };
  doctors.push(newDoctor);
  return NextResponse.json(newDoctor, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body: Doctor = await request.json();
  const index = doctors.findIndex(d => d.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }
  doctors[index] = body;
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  doctors = doctors.filter(d => d.id !== id);
  return NextResponse.json({ message: 'Doctor deleted' });
}

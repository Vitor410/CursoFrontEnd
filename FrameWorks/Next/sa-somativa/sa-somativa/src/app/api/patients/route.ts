import { NextRequest } from 'next/server';
import { getAll, create } from '../controllers/patientController';

export async function GET() {
  return getAll();
}

export async function POST(request: NextRequest) {
  return create(request);
}

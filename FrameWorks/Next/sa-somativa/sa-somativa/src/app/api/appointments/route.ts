import { NextRequest, NextResponse } from 'next/server';
import { getAll, create } from '../controllers/appointmentController';

export async function GET() {
  return getAll();
}

export async function POST(request: NextRequest) {
  return create(request);
}

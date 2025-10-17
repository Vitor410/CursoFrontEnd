import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, doctorId } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['admin', 'doctor'].includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role' },
        { status: 400 }
      );
    }

    if (role === 'doctor' && !doctorId) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID is required for doctor role' },
        { status: 400 }
      );
    }

    const result = await registerUser(name, email, password, role, doctorId);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

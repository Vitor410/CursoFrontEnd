import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from './mongodb';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor';
  doctorId?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      doctorId: user.doctorId,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      name: string;
      email: string;
      role: 'admin' | 'doctor';
      doctorId?: string;
    };
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      doctorId: decoded.doctorId,
    };
  } catch (error) {
    return null;
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'doctor',
  doctorId?: string
): Promise<{ success: boolean; message: string; user?: AuthUser }> {
  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      doctorId: role === 'doctor' ? doctorId : undefined,
    });

    await user.save();

    const authUser: AuthUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role as 'admin' | 'doctor',
      doctorId: user.doctorId?.toString(),
    };

    return { success: true, message: 'User registered successfully', user: authUser };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> {
  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return { success: false, message: 'Invalid credentials' };
    }

    const authUser: AuthUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role as 'admin' | 'doctor',
      doctorId: user.doctorId?.toString(),
    };

    const token = generateToken(authUser);

    return { success: true, message: 'Login successful', user: authUser, token };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
}

import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'admin' | 'doctor';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  doctorId?: mongoose.Types.ObjectId; // For doctors, link to Doctor model
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor'], required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' }, // Optional for doctors
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

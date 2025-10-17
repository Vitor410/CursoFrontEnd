import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  phone?: string;
  email?: string;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
});

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

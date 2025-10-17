import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialty: string;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
});

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

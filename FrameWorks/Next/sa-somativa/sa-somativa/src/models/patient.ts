import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default Patient;

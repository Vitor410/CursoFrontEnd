import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

const UserSchema: Schema = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres']
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  atualizadoEm: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar o campo atualizadoEm antes de salvar
UserSchema.pre<IUser>('save', function(next) {
  this.atualizadoEm = new Date();
  next();
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

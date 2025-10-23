import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  nome: string;
  descricao?: string;
  categoria?: string;
  tamanho?: string;
  peso?: number;
  material?: string;
  estoqueMinimo: number;
  quantidadeAtual: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

const ProductSchema: Schema = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    trim: true
  },
  tamanho: {
    type: String,
    trim: true,
    enum: ['Pequeno', 'Médio', 'Grande']
  },
  peso: {
    type: Number,
    min: [0, 'Peso deve ser positivo']
  },
  material: {
    type: String,
    trim: true
  },
  estoqueMinimo: {
    type: Number,
    required: [true, 'Estoque mínimo é obrigatório'],
    min: [0, 'Estoque mínimo deve ser não negativo'],
    default: 0
  },
  quantidadeAtual: {
    type: Number,
    required: [true, 'Quantidade atual é obrigatória'],
    min: [0, 'Quantidade atual deve ser não negativa'],
    default: 0
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
ProductSchema.pre<IProduct>('save', function(next) {
  this.atualizadoEm = new Date();
  next();
});

// Índice para busca por nome
ProductSchema.index({ nome: 'text', descricao: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

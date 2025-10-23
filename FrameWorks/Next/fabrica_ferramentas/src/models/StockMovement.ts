import mongoose, { Document, Schema } from 'mongoose';

export interface IStockMovement extends Document {
  produtoId: mongoose.Types.ObjectId;
  usuarioId: mongoose.Types.ObjectId;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: Date;
  criadoEm: Date;
}

const StockMovementSchema: Schema = new Schema({
  produtoId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Produto é obrigatório']
  },
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório']
  },
  tipo: {
    type: String,
    required: [true, 'Tipo de movimentação é obrigatório'],
    enum: {
      values: ['entrada', 'saida'],
      message: 'Tipo deve ser "entrada" ou "saida"'
    }
  },
  quantidade: {
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [1, 'Quantidade deve ser pelo menos 1']
  },
  data: {
    type: Date,
    required: [true, 'Data da movimentação é obrigatória'],
    default: Date.now
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Índices para otimização de consultas
StockMovementSchema.index({ produtoId: 1, data: -1 });
StockMovementSchema.index({ usuarioId: 1, data: -1 });
StockMovementSchema.index({ tipo: 1, data: -1 });

export default mongoose.models.StockMovement || mongoose.model<IStockMovement>('StockMovement', StockMovementSchema);

// Script de criação e população do banco de dados MongoDB
// Execute este script no MongoDB Shell ou via Node.js com mongoose

// Conectar ao banco de dados (ajuste a string de conexão conforme necessário)
// mongoose.connect('mongodb://localhost:27017/fabrica_ferramentas', { useNewUrlParser: true, useUnifiedTopology: true });

// Schemas e Modelos (usando Mongoose)

// User Schema
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  atualizadoEm: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  categoria: String,
  tamanho: String,
  peso: Number,
  material: String,
  estoqueMinimo: { type: Number, required: true, default: 0 },
  quantidadeAtual: { type: Number, required: true, default: 0 },
  criadoEm: { type: Date, default: Date.now },
  atualizadoEm: { type: Date, default: Date.now }
});

// StockMovement Schema
const stockMovementSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, required: true, enum: ['entrada', 'saida'] },
  quantidade: { type: Number, required: true },
  data: { type: Date, required: true },
  criadoEm: { type: Date, default: Date.now }
});

// Criar modelos
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

// Dados de exemplo para população

// Usuários de exemplo
const sampleUsers = [
  {
    nome: 'João Silva',
    email: 'joao@fabrica.com',
    senha: '$2a$10$example.hash.for.password' // Senha: 'senha123' (hash bcrypt)
  },
  {
    nome: 'Maria Santos',
    email: 'maria@fabrica.com',
    senha: '$2a$10$example.hash.for.password' // Senha: 'senha123'
  }
];

// Produtos de exemplo
const sampleProducts = [
  {
    nome: 'Martelo de Cabeça Aço',
    descricao: 'Martelo resistente com cabeça de aço carbono',
    categoria: 'Martelo',
    tamanho: 'Médio',
    peso: 0.5,
    material: 'Aço',
    estoqueMinimo: 10,
    quantidadeAtual: 25
  },
  {
    nome: 'Chave de Fenda Isolada',
    descricao: 'Chave de fenda com cabo isolante para eletricidade',
    categoria: 'Chave de Fenda',
    tamanho: 'Pequeno',
    peso: 0.1,
    material: 'Aço com isolamento',
    estoqueMinimo: 20,
    quantidadeAtual: 50
  },
  {
    nome: 'Alicate Universal',
    descricao: 'Alicate versátil para múltiplas funções',
    categoria: 'Alicate',
    tamanho: 'Médio',
    peso: 0.3,
    material: 'Aço cromado',
    estoqueMinimo: 15,
    quantidadeAtual: 30
  },
  {
    nome: 'Serra de Metal',
    descricao: 'Serra especializada para corte de metais',
    categoria: 'Serra',
    tamanho: 'Grande',
    peso: 0.8,
    material: 'Aço temperado',
    estoqueMinimo: 5,
    quantidadeAtual: 12
  },
  {
    nome: 'Chave Inglesa Ajustável',
    descricao: 'Chave inglesa de alta precisão',
    categoria: 'Chave Inglesa',
    tamanho: 'Médio',
    peso: 0.4,
    material: 'Aço forjado',
    estoqueMinimo: 8,
    quantidadeAtual: 18
  }
];

// Função para popular o banco de dados
async function populateDatabase() {
  try {
    // Limpar coleções existentes (opcional, para desenvolvimento)
    await User.deleteMany({});
    await Product.deleteMany({});
    await StockMovement.deleteMany({});

    // Inserir usuários
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log('Usuários inseridos:', insertedUsers.length);

    // Inserir produtos
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log('Produtos inseridos:', insertedProducts.length);

    // Criar algumas movimentações de exemplo
    const sampleMovements = [
      {
        produtoId: insertedProducts[0]._id,
        usuarioId: insertedUsers[0]._id,
        tipo: 'entrada',
        quantidade: 25,
        data: new Date('2024-01-15')
      },
      {
        produtoId: insertedProducts[1]._id,
        usuarioId: insertedUsers[1]._id,
        tipo: 'saida',
        quantidade: 5,
        data: new Date('2024-01-20')
      },
      {
        produtoId: insertedProducts[2]._id,
        usuarioId: insertedUsers[0]._id,
        tipo: 'entrada',
        quantidade: 30,
        data: new Date('2024-01-25')
      }
    ];

    const insertedMovements = await StockMovement.insertMany(sampleMovements);
    console.log('Movimentações inseridas:', insertedMovements.length);

    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Executar população se o script for chamado diretamente
if (require.main === module) {
  populateDatabase();
}

module.exports = { User, Product, StockMovement, populateDatabase };

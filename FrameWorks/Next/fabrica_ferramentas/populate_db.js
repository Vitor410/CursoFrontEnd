const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Conectar ao banco de dados
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/fabrica_ferramentas', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

// Schemas
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  atualizadoEm: { type: Date, default: Date.now }
});

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

const stockMovementSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, required: true, enum: ['entrada', 'saida'] },
  quantidade: { type: Number, required: true },
  data: { type: Date, required: true },
  criadoEm: { type: Date, default: Date.now }
});

// Modelos
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

// Dados de exemplo
async function populateDatabase() {
  try {
    // Limpar coleções
    await User.deleteMany({});
    await Product.deleteMany({});
    await StockMovement.deleteMany({});

    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Usuários
    const users = [
      {
        nome: 'Administrador',
        email: 'admin@fabrica.com',
        senha: hashedPassword
      },
      {
        nome: 'João Silva',
        email: 'joao@fabrica.com',
        senha: hashedPassword
      }
    ];

    const insertedUsers = await User.insertMany(users);
    console.log('Usuários inseridos:', insertedUsers.length);

    // Produtos
    const products = [
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

    const insertedProducts = await Product.insertMany(products);
    console.log('Produtos inseridos:', insertedProducts.length);

    // Movimentações
    const movements = [
      {
        produtoId: insertedProducts[0]._id,
        usuarioId: insertedUsers[0]._id,
        tipo: 'entrada',
        quantidade: 25,
        data: new Date('2024-01-15')
      },
      {
        produtoId: insertedProducts[1]._id,
        usuarioId: insertedUsers[0]._id,
        tipo: 'saida',
        quantidade: 5,
        data: new Date('2024-01-20')
      }
    ];

    const insertedMovements = await StockMovement.insertMany(movements);
    console.log('Movimentações inseridas:', insertedMovements.length);

    console.log('Banco de dados populado com sucesso!');
    console.log('Credenciais de teste: admin@fabrica.com / admin123');

  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Executar
connectDB().then(() => {
  populateDatabase();
});

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import StockMovement from '@/models/StockMovement';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

interface DecodedToken {
  userId: string;
  email: string;
  nome: string;
}

// Função auxiliar para verificar token JWT
function verifyToken(request: NextRequest): DecodedToken | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch {
    return null;
  }
}

// POST - Criar nova movimentação de estoque
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    // Verificar autenticação
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { produtoId, tipo, quantidade, data } = body;

    // Validações
    if (!produtoId || !tipo || !quantidade || !data) {
      return NextResponse.json(
        { error: 'Produto, tipo, quantidade e data são obrigatórios' },
        { status: 400 }
      );
    }

    if (!['entrada', 'saida'].includes(tipo)) {
      return NextResponse.json(
        { error: 'Tipo deve ser "entrada" ou "saida"' },
        { status: 400 }
      );
    }

    if (quantidade <= 0) {
      return NextResponse.json(
        { error: 'Quantidade deve ser positiva' },
        { status: 400 }
      );
    }

    // Verificar se produto existe
    const product = await Product.findById(produtoId);
    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Calcular nova quantidade
    let novaQuantidade = product.quantidadeAtual;
    if (tipo === 'entrada') {
      novaQuantidade += quantidade;
    } else {
      novaQuantidade -= quantidade;
      if (novaQuantidade < 0) {
        return NextResponse.json(
          { error: 'Quantidade insuficiente em estoque' },
          { status: 400 }
        );
      }
    }

    // Verificar alerta de estoque mínimo para saídas
    let alertaEstoqueMinimo = false;
    if (tipo === 'saida' && novaQuantidade <= product.estoqueMinimo) {
      alertaEstoqueMinimo = true;
    }

    // Criar movimentação
    const movement = new StockMovement({
      produtoId,
      usuarioId: user.userId,
      tipo,
      quantidade,
      data: new Date(data)
    });

    await movement.save();

    // Atualizar quantidade do produto
    await Product.findByIdAndUpdate(produtoId, {
      quantidadeAtual: novaQuantidade
    });

    return NextResponse.json({
      movement,
      novaQuantidade,
      alertaEstoqueMinimo,
      message: alertaEstoqueMinimo ? 'Movimentação realizada. Alerta: Estoque abaixo do mínimo!' : 'Movimentação realizada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar movimentação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// GET - Listar movimentações com filtros opcionais
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Verificar autenticação
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const produtoId = searchParams.get('produtoId');
    const tipo = searchParams.get('tipo');
    const dataInicio = searchParams.get('dataInicio');
    const dataFim = searchParams.get('dataFim');

    const query: Record<string, unknown> = {};

    if (produtoId) {
      query.produtoId = produtoId;
    }

    if (tipo && ['entrada', 'saida'].includes(tipo)) {
      query.tipo = tipo;
    }

    if (dataInicio || dataFim) {
      query.data = {};
      if (dataInicio) {
        (query.data as Record<string, unknown>).$gte = new Date(dataInicio);
      }
      if (dataFim) {
        (query.data as Record<string, unknown>).$lte = new Date(dataFim);
      }
    }

    const movements = await StockMovement.find(query)
      .populate('produtoId', 'nome')
      .populate('usuarioId', 'nome')
      .sort({ data: -1, criadoEm: -1 });

    return NextResponse.json(movements);

  } catch (error) {
    console.error('Erro ao buscar movimentações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

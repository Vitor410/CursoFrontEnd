import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

// GET - Listar produtos com busca opcional
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let query = {};
    if (search) {
      query = {
        $or: [
          { nome: { $regex: search, $options: 'i' } },
          { descricao: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const products = await Product.find(query).sort({ nome: 1 });

    return NextResponse.json(products);

  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      nome,
      descricao,
      categoria,
      tamanho,
      peso,
      material,
      estoqueMinimo,
      quantidadeAtual
    } = body;

    // Validações
    if (!nome || !estoqueMinimo || quantidadeAtual === undefined) {
      return NextResponse.json(
        { error: 'Nome, estoque mínimo e quantidade atual são obrigatórios' },
        { status: 400 }
      );
    }

    if (estoqueMinimo < 0 || quantidadeAtual < 0) {
      return NextResponse.json(
        { error: 'Estoque mínimo e quantidade atual devem ser não negativos' },
        { status: 400 }
      );
    }

    if (peso && peso < 0) {
      return NextResponse.json(
        { error: 'Peso deve ser positivo' },
        { status: 400 }
      );
    }

    // Criar produto
    const product = new Product({
      nome,
      descricao,
      categoria,
      tamanho,
      peso,
      material,
      estoqueMinimo,
      quantidadeAtual
    });

    await product.save();

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

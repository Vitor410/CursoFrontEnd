import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

// GET - Buscar produto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar produto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        nome,
        descricao,
        categoria,
        tamanho,
        peso,
        material,
        estoqueMinimo,
        quantidadeAtual
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Produto excluído com sucesso' });

  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

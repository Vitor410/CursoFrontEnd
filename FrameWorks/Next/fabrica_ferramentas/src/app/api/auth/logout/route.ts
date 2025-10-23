import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Para logout baseado em JWT, o cliente deve simplesmente remover o token
    // Este endpoint pode ser usado para logging ou invalidação de tokens se necessário

    return NextResponse.json({
      message: 'Logout realizado com sucesso'
    });

  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { nome, email, senha, confirmarSenha } = await request.json();

    // Validações básicas
    if (!nome || !email || !senha || !confirmarSenha) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (senha !== confirmarSenha) {
      return NextResponse.json(
        { error: 'As senhas não coincidem' },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se email já existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const newUser = new User({
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      senha: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'Usuário cadastrado com sucesso' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

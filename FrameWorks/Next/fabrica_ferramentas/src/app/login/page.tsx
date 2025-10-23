'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import Alert from '@/components/Alert';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: Record<string, any>) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirecionar para dashboard
        router.push('/dashboard');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: Record<string, any>) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setError('');
        alert('Usuário cadastrado com sucesso! Faça o login.');
        setIsRegister(false);
      } else {
        setError(result.error || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const loginFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'Digite seu email',
    },
    {
      name: 'senha',
      label: 'Senha',
      type: 'password' as const,
      required: true,
      placeholder: 'Digite sua senha',
    },
  ];

  const registerFields = [
    {
      name: 'nome',
      label: 'Nome Completo',
      type: 'text' as const,
      required: true,
      placeholder: 'Digite seu nome completo',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'Digite seu email',
    },
    {
      name: 'senha',
      label: 'Senha',
      type: 'password' as const,
      required: true,
      placeholder: 'Digite sua senha',
    },
    {
      name: 'confirmarSenha',
      label: 'Confirmar Senha',
      type: 'password' as const,
      required: true,
      placeholder: 'Confirme sua senha',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegister ? 'Cadastrar Usuário' : 'Entrar no Sistema'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de Gestão de Estoque - Fábrica de Ferramentas
          </p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
          />
        )}

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <Form
            fields={isRegister ? registerFields : loginFields}
            onSubmit={isRegister ? handleRegister : handleLogin}
            submitLabel={loading ? (isRegister ? 'Cadastrando...' : 'Entrando...') : (isRegister ? 'Cadastrar' : 'Entrar')}
            className="space-y-6"
          />

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isRegister ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

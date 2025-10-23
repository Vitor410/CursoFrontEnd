'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Table from '@/components/Table';
import Form from '@/components/Form';
import Alert from '@/components/Alert';

interface Product {
  _id: string;
  nome: string;
  quantidadeAtual: number;
  estoqueMinimo: number;
}

interface StockMovement {
  _id: string;
  produtoId: { nome: string };
  usuarioId: { nome: string };
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: string;
  criadoEm: string;
}

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMovementForm, setShowMovementForm] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  };

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Carregar produtos
      const productsResponse = await fetch('/api/products', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData);
      }

      // Carregar movimentações
      const movementsResponse = await fetch('/api/movements', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (movementsResponse.ok) {
        const movementsData = await movementsResponse.json();
        setMovements(movementsData);
      }

      if (productsResponse.status === 401 || movementsResponse.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao carregar dados' });
    } finally {
      setLoading(false);
    }
  };

  const handleMovement = async (data: Record<string, any>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/movements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({
          type: result.alertaEstoqueMinimo ? 'warning' : 'success',
          message: result.message
        });
        setShowMovementForm(false);
        loadData(); // Recarregar dados
      } else {
        setAlert({ type: 'error', message: result.error || 'Erro ao registrar movimentação' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro de conexão' });
    }
  };

  const movementFields = [
    {
      name: 'produtoId',
      label: 'Produto',
      type: 'select' as const,
      required: true,
      options: products.map(p => ({ value: p._id, label: p.nome }))
    },
    {
      name: 'tipo',
      label: 'Tipo de Movimentação',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'entrada', label: 'Entrada' },
        { value: 'saida', label: 'Saída' }
      ]
    },
    {
      name: 'quantidade',
      label: 'Quantidade',
      type: 'number' as const,
      required: true,
      min: 1
    },
    {
      name: 'data',
      label: 'Data',
      type: 'date' as const,
      required: true
    },
  ];

  const productsColumns = [
    { key: 'nome', header: 'Produto' },
    { key: 'quantidadeAtual', header: 'Qtd. Atual' },
    { key: 'estoqueMinimo', header: 'Qtd. Mínima' },
    {
      key: 'status',
      header: 'Status',
      render: (value: any, row: Product) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.quantidadeAtual <= row.estoqueMinimo
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {row.quantidadeAtual <= row.estoqueMinimo ? 'Baixo Estoque' : 'OK'}
        </span>
      )
    },
  ];

  const movementsColumns = [
    {
      key: 'produtoId',
      header: 'Produto',
      render: (value: any) => value?.nome || 'N/A'
    },
    {
      key: 'tipo',
      header: 'Tipo',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 'entrada' ? 'Entrada' : 'Saída'}
        </span>
      )
    },
    { key: 'quantidade', header: 'Quantidade' },
    {
      key: 'data',
      header: 'Data',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: 'usuarioId',
      header: 'Usuário',
      render: (value: any) => value?.nome || 'N/A'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados do estoque...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mr-4">
                ← Voltar ao Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestão de Estoque
              </h1>
            </div>
            <button
              onClick={() => setShowMovementForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Nova Movimentação
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
              className="mb-6"
            />
          )}

          {/* Movement Form Modal */}
          {showMovementForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-lg shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Nova Movimentação de Estoque
                  </h3>
                  <Form
                    fields={movementFields}
                    onSubmit={handleMovement}
                    onCancel={() => setShowMovementForm(false)}
                    submitLabel="Registrar"
                    cancelLabel="Cancelar"
                    initialData={{
                      data: new Date().toISOString().split('T')[0] // Data atual
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Visão Geral do Estoque</h2>
            <Table
              columns={productsColumns}
              data={products}
            />
          </div>

          {/* Movements History */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Movimentações</h2>
            <Table
              columns={movementsColumns}
              data={movements}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

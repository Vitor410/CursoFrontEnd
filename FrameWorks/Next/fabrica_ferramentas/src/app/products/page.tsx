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
  descricao: string;
  categoria: string;
  tamanho: string;
  peso: number;
  material: string;
  estoqueMinimo: number;
  quantidadeAtual: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadProducts();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  };

  const loadProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/products?search=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao carregar produtos' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSave = async (data: Record<string, any>) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlert({
          type: 'success',
          message: `Produto ${editingProduct ? 'atualizado' : 'criado'} com sucesso`
        });
        setShowForm(false);
        setEditingProduct(null);
        loadProducts();
      } else {
        const error = await response.json();
        setAlert({ type: 'error', message: error.error || 'Erro ao salvar produto' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro de conexão' });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Tem certeza que deseja excluir o produto "${product.nome}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'Produto excluído com sucesso' });
        loadProducts();
      } else {
        const error = await response.json();
        setAlert({ type: 'error', message: error.error || 'Erro ao excluir produto' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro de conexão' });
    }
  };

  const productFields = [
    { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
    { name: 'descricao', label: 'Descrição', type: 'textarea' as const },
    { name: 'categoria', label: 'Categoria', type: 'text' as const },
    { name: 'tamanho', label: 'Tamanho', type: 'text' as const },
    { name: 'peso', label: 'Peso (kg)', type: 'number' as const, min: 0, step: 0.01 },
    { name: 'material', label: 'Material', type: 'text' as const },
    { name: 'estoqueMinimo', label: 'Estoque Mínimo', type: 'number' as const, required: true, min: 0 },
    { name: 'quantidadeAtual', label: 'Quantidade Atual', type: 'number' as const, required: true, min: 0 },
  ];

  const tableColumns = [
    { key: 'nome', header: 'Nome' },
    { key: 'categoria', header: 'Categoria' },
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
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
                Cadastro de Produtos
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Novo Produto
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

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                  </h3>
                  <Form
                    fields={productFields}
                    onSubmit={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                    }}
                    initialData={editingProduct || {}}
                    submitLabel={editingProduct ? 'Atualizar' : 'Criar'}
                    cancelLabel="Cancelar"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <Table
            columns={tableColumns}
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

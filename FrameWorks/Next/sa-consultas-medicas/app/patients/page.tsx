'use client';

import { useState, useEffect } from 'react';
import { Patient } from '../types';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [editing, setEditing] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch('/api/patients');
    const data = await res.json();
    setPatients(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch('/api/patients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, ...form }),
      });
      setEditing(null);
    } else {
      await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', phone: '' });
    fetchPatients();
  };

  const handleEdit = (patient: Patient) => {
    setEditing(patient);
    setForm({ name: patient.name, phone: patient.phone });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/patients?id=${id}`, { method: 'DELETE' });
    fetchPatients();
  };

  const patientsWithId = Array.isArray(patients) ? patients.map((patient) => ({
    ...patient,
    id: patient._id,
  })) : [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          👥 Gerenciar Pacientes
        </h1>
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">
            {editing ? 'Editar Paciente' : 'Adicionar Novo Paciente'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do Paciente"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="input-field"
            />
            <input
              type="text"
              placeholder="Telefone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="input-field"
            />
            <div className="flex gap-2 md:col-span-2">
              <button type="submit" className="btn-primary flex-1">
                {editing ? '✏️ Atualizar' : '➕ Adicionar'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ name: '', phone: '' });
                  }}
                  className="btn-secondary flex-1"
                >
                  ❌ Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">Lista de Pacientes</h2>
          <div className="space-y-4">
            {patientsWithId.map((patient) => (
              <div key={patient.id} className="appointment-item">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg text-gray-800">{patient.name}</div>
                    <div className="text-sm text-gray-600">📞 {patient.phone}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(patient)} className="btn-secondary text-sm px-3 py-1">
                      ✏️ Editar
                    </button>
                    <button onClick={() => handleDelete(patient.id)} className="btn-danger text-sm px-3 py-1">
                      🗑️ Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const patientsWithId = patients.map((patient) => ({
    ...patient,
    id: patient._id,
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Pacientes</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editing ? 'Atualizar' : 'Adicionar'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ name: '', phone: '' });
            }}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {patientsWithId.map((patient) => (
          <li key={patient.id} className="flex justify-between items-center mb-2">
            <span>{patient.name} - {patient.phone}</span>
            <div>
              <button onClick={() => handleEdit(patient)} className="bg-yellow-500 text-white p-1 mr-2">
                Editar
              </button>
              <button onClick={() => handleDelete(patient.id)} className="bg-red-500 text-white p-1">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

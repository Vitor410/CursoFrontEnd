'use client';

import { useState, useEffect } from 'react';
import { Doctor } from '../types';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState({ name: '', specialty: '' });
  const [editing, setEditing] = useState<Doctor | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    setDoctors(data.map((d: any) => ({ ...d, id: d._id })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch('/api/doctors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, ...form }),
      });
      setEditing(null);
    } else {
      await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', specialty: '' });
    fetchDoctors();
  };

  const handleEdit = (doctor: Doctor) => {
    setEditing(doctor);
    setForm({ name: doctor.name, specialty: doctor.specialty });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/doctors?id=${id}`, { method: 'DELETE' });
    fetchDoctors();
  };

  const doctorsWithId = doctors.map((doctor) => ({
    ...doctor,
    id: doctor._id,
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Médicos</h1>
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
          placeholder="Especialidade"
          value={form.specialty}
          onChange={(e) => setForm({ ...form, specialty: e.target.value })}
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
              setForm({ name: '', specialty: '' });
            }}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {doctorsWithId.map((doctor) => (
          <li key={doctor.id} className="flex justify-between items-center mb-2">
            <span>{doctor.name} - {doctor.specialty}</span>
            <div>
              <button onClick={() => handleEdit(doctor)} className="bg-yellow-500 text-white p-1 mr-2">
                Editar
              </button>
              <button onClick={() => handleDelete(doctor.id)} className="bg-red-500 text-white p-1">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

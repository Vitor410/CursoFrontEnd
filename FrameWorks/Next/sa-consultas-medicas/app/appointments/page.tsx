'use client';

import { useState, useEffect } from 'react';
import { Appointment, Patient, Doctor, AppointmentStatus } from '../types';
import { useAuth } from '../context/AuthContext';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    status: 'Agendada' as AppointmentStatus,
  });
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchAppointments();
      if (user.role === 'admin') {
        fetchPatients();
        fetchDoctors();
      }
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) {
        setError('Erro ao buscar consultas');
        return;
      }
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError('Erro ao buscar consultas');
    }
  };

  const fetchPatients = async () => {
    const res = await fetch('/api/patients');
    const data = await res.json();
    setPatients(Array.isArray(data) ? data.map((p: any) => ({ ...p, id: p._id })) : []);
  };

  const fetchDoctors = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    setDoctors(data.map((d: any) => ({ ...d, id: d._id })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        const res = await fetch('/api/appointments', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editing, ...form }),
        });
        if (!res.ok) {
          const err = await res.json();
          setError(err.error);
          return;
        }
        setEditing(null);
      } else {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const err = await res.json();
          setError(err.error);
          return;
        }
      }
      setForm({ patientId: '', doctorId: '', date: '', time: '', status: 'Agendada' });
      fetchAppointments();
    } catch (err) {
      setError('Erro ao salvar consulta');
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditing(appointment);
    setForm({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' });
    fetchAppointments();
  };

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.name || 'Desconhecido';
  const getDoctorName = (id: string) => doctors.find(d => d.id === id)?.name || 'Desconhecido';

  const getMyAppointments = () => {
    if (!user) return [];
    if (user.role === 'admin') return appointments;
    return appointments.filter(app => app.doctorId === user.doctorId);
  };

  if (!user) {
    return (
      <div className="p-8">
        <div className="text-center">Por favor, faça login para acessar esta página.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {user.role === 'admin' ? '📅 Gerenciar Consultas' : '📅 Minhas Consultas'}
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {user.role === 'admin' && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-600">Adicionar Nova Consulta</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <select
                value={form.patientId}
                onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                required
                className="input-field"
              >
                <option value="">Selecione Paciente</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                value={form.doctorId}
                onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
                required
                className="input-field"
              >
                <option value="">Selecione Médico</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="input-field"
              />
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="input-field"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as AppointmentStatus })}
                className="input-field"
              >
                <option value="Agendada">Agendada</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1">
                  {editing ? 'Atualizar' : 'Adicionar'}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      setForm({ patientId: '', doctorId: '', date: '', time: '', status: 'Agendada' });
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">
            {user.role === 'admin' ? 'Todas as Consultas' : 'Minhas Consultas'}
          </h2>
          <div className="space-y-4">
            {getMyAppointments().map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-gray-800">
                      {getPatientName(appointment.patientId)}
                    </div>
                    <div className="text-sm text-gray-600">
                      com {getDoctorName(appointment.doctorId)} • {appointment.date} às {appointment.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'Agendada' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'Confirmada' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'Realizada' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                    <div className="flex gap-2">
                      {user.role === 'doctor' && appointment.status === 'Confirmada' && (
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch('/api/appointments', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ...appointment, status: 'Realizada' }),
                              });
                              if (res.ok) {
                                fetchAppointments();
                              }
                            } catch (err) {
                              console.error('Erro ao atualizar status');
                            }
                          }}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          ✅ Concluir Consulta
                        </button>
                      )}
                      {user.role === 'admin' && (
                        <>
                          <button onClick={() => handleEdit(appointment)} className="btn-secondary text-sm px-3 py-1">
                            ✏️ Editar
                          </button>
                          <button onClick={() => handleDelete(appointment.id)} className="btn-danger text-sm px-3 py-1">
                            🗑️ Deletar
                          </button>
                        </>
                      )}
                    </div>
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

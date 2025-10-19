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
    setPatients(data.map((p: any) => ({ ...p, id: p._id })));
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {user.role === 'admin' ? 'Gerenciar Consultas' : 'Minhas Consultas'}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {user.role === 'admin' && (
        <form onSubmit={handleSubmit} className="mb-8">
          <select
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            required
            className="border p-2 mr-2"
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
            className="border p-2 mr-2"
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
            className="border p-2 mr-2"
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
            className="border p-2 mr-2"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as AppointmentStatus })}
            className="border p-2 mr-2"
          >
            <option value="Agendada">Agendada</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Realizada">Realizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2">
            {editing ? 'Atualizar' : 'Adicionar'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ patientId: '', doctorId: '', date: '', time: '', status: 'Agendada' });
              }}
              className="bg-gray-500 text-white p-2 ml-2"
            >
              Cancelar
            </button>
          )}
        </form>
      )}

      <ul>
        {getMyAppointments().map((appointment) => (
          <li key={appointment.id} className="flex justify-between items-center mb-2 p-4 bg-gray-100 rounded">
            <span>
              {getPatientName(appointment.patientId)} com {getDoctorName(appointment.doctorId)} em {appointment.date} às {appointment.time} - {appointment.status}
            </span>
            <div>
              {user.role === 'doctor' && appointment.status === 'Confirmada' && (
                <select
                  value={appointment.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value as AppointmentStatus;
                    try {
                      const res = await fetch('/api/appointments', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...appointment, status: newStatus }),
                      });
                      if (res.ok) {
                        fetchAppointments();
                      }
                    } catch (err) {
                      console.error('Erro ao atualizar status');
                    }
                  }}
                  className="border p-1 mr-2"
                >
                  <option value="Confirmada">Confirmada</option>
                  <option value="Realizada">Realizada</option>
                </select>
              )}
              {user.role === 'admin' && (
                <>
                  <button onClick={() => handleEdit(appointment)} className="bg-yellow-500 text-white p-1 mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(appointment.id)} className="bg-red-500 text-white p-1">
                    Deletar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

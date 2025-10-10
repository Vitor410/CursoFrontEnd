'use client';

import { useState, useEffect } from 'react';

interface Patient {
  _id: string;
  name: string;
  phone: string;
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

interface Appointment {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  time: string;
  status: string;
}

export default function ReceptionistDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [newPatient, setNewPatient] = useState({ name: '', phone: '' });
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
  const [newAppointment, setNewAppointment] = useState({ patient: '', doctor: '', date: '', time: '', status: 'Agendada' });

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch('/api/patients');
    const data = await res.json();
    setPatients(data);
  };

  const fetchDoctors = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    setDoctors(data);
  };

  const fetchAppointments = async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPatient),
    });
    setNewPatient({ name: '', phone: '' });
    fetchPatients();
  };

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoctor),
    });
    setNewDoctor({ name: '', specialty: '' });
    fetchDoctors();
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment),
    });
    setNewAppointment({ patient: '', doctor: '', date: '', time: '', status: 'Agendada' });
    fetchAppointments();
  };

  const handleDeletePatient = async (id: string) => {
    await fetch(`/api/patients/${id}`, { method: 'DELETE' });
    fetchPatients();
  };

  const handleDeleteDoctor = async (id: string) => {
    await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    fetchDoctors();
  };

  const handleDeleteAppointment = async (id: string) => {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    fetchAppointments();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Painel da Recepcionista</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Patients */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pacientes</h2>
          <form onSubmit={handleAddPatient} className="mb-4">
            <input
              type="text"
              placeholder="Nome"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              value={newPatient.phone}
              onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Adicionar</button>
          </form>
          <ul>
            {patients.map((p) => (
              <li key={p._id} className="flex justify-between items-center mb-2">
                <span>{p.name} - {p.phone}</span>
                <button onClick={() => handleDeletePatient(p._id)} className="text-red-500">Excluir</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Doctors */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Médicos</h2>
          <form onSubmit={handleAddDoctor} className="mb-4">
            <input
              type="text"
              placeholder="Nome"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <input
              type="text"
              placeholder="Especialidade"
              value={newDoctor.specialty}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Adicionar</button>
          </form>
          <ul>
            {doctors.map((d) => (
              <li key={d._id} className="flex justify-between items-center mb-2">
                <span>{d.name} - {d.specialty}</span>
                <button onClick={() => handleDeleteDoctor(d._id)} className="text-red-500">Excluir</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Appointments */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Consultas</h2>
          <form onSubmit={handleAddAppointment} className="mb-4">
            <select
              value={newAppointment.patient}
              onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            >
              <option value="">Selecionar Paciente</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <select
              value={newAppointment.doctor}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            >
              <option value="">Selecionar Médico</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <select
              value={newAppointment.status}
              onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
              className="block w-full mb-2 p-2 border"
            >
              <option value="Agendada">Agendada</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Realizada">Realizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Agendar</button>
          </form>
          <ul>
            {appointments.map((a) => (
              <li key={a._id} className="mb-2">
                <div>{a.patient.name} com {a.doctor.name} em {a.date} às {a.time} - {a.status}</div>
                <button onClick={() => handleDeleteAppointment(a._id)} className="text-red-500">Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

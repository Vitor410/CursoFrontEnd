'use client';

import { useState, useEffect } from 'react';
import { Patient, Doctor, Appointment } from './types';

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.name || 'Desconhecido';
  const getDoctorName = (id: string) => doctors.find(d => d.id === id)?.name || 'Desconhecido';

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard - Clínica Saúde & Bem-estar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
          <p className="text-2xl">{patients.length}</p>
          <a href="/patients" className="text-blue-600 hover:underline">Gerenciar Pacientes</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Médicos</h2>
          <p className="text-2xl">{doctors.length}</p>
          <a href="/doctors" className="text-blue-600 hover:underline">Gerenciar Médicos</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Consultas</h2>
          <p className="text-2xl">{appointments.length}</p>
          <a href="/appointments" className="text-blue-600 hover:underline">Gerenciar Consultas</a>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Próximas Consultas</h2>
        <ul>
          {appointments
            .filter(a => new Date(a.date) >= new Date() && a.status !== 'Cancelada')
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((appointment) => (
              <li key={appointment.id} className="mb-2 p-4 bg-gray-100 rounded">
                {getPatientName(appointment.patientId)} com {getDoctorName(appointment.doctorId)} em {appointment.date} às {appointment.time} - {appointment.status}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

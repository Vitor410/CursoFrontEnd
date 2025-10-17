'use client';

import { useState, useEffect } from 'react';
import { Patient, Doctor, Appointment } from './types';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!loading && user) {
      fetchPatients();
      fetchDoctors();
      fetchAppointments();
    }
  }, [user, loading]);

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patients');
      if (res.ok) {
        const data = await res.json();
        setPatients(Array.isArray(data) ? data : []);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const data = await res.json();
        setDoctors(Array.isArray(data) ? data : []);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.name || 'Desconhecido';
  const getDoctorName = (id: string) => doctors.find(d => d.id === id)?.name || 'Desconhecido';

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Sistema de Agendamento Médico</h1>
          <p className="text-xl mb-4">Por favor, faça login para acessar o sistema.</p>
          <div className="space-x-4">
            <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Fazer Login
            </a>
            <a href="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Registrar
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard - Clínica Saúde & Bem-estar</h1>
      <p className="mb-4">Bem-vindo, {user.name} ({user.role === 'admin' ? 'Administrador' : 'Médico'})</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
          <p className="text-2xl">{patients.length}</p>
          {user.role === 'admin' && (
            <a href="/patients" className="text-blue-600 hover:underline">Gerenciar Pacientes</a>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Médicos</h2>
          <p className="text-2xl">{doctors.length}</p>
          {user.role === 'admin' && (
            <a href="/doctors" className="text-blue-600 hover:underline">Gerenciar Médicos</a>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {user.role === 'admin' ? 'Consultas' : 'Minhas Consultas'}
          </h2>
          <p className="text-2xl">{appointments.length}</p>
          <a href="/appointments" className="text-blue-600 hover:underline">
            {user.role === 'admin' ? 'Gerenciar Consultas' : 'Ver Consultas'}
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {user.role === 'admin' ? 'Próximas Consultas' : 'Minhas Próximas Consultas'}
        </h2>
        <ul>
          {appointments && appointments.length > 0 ? (
            appointments
              .filter(a => new Date(a.date) >= new Date() && a.status !== 'Cancelada')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((appointment) => (
                <li key={appointment.id} className="mb-2 p-4 bg-gray-100 rounded">
                  {getPatientName(appointment.patientId)} com {getDoctorName(appointment.doctorId)} em {appointment.date} às {appointment.time} - {appointment.status}
                </li>
              ))
          ) : (
            <li className="mb-2 p-4 bg-gray-100 rounded">Nenhuma consulta agendada</li>
          )}
        </ul>
      </div>
    </div>
  );
}

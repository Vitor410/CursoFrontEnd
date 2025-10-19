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
      if (user.role === 'admin') {
        fetchDoctors();
      }
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="hero-section">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            Sistema de Agendamento Médico
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Gerencie consultas de forma eficiente e moderna
          </p>
          <div className="space-x-6">
            <a href="/login" className="btn-primary text-lg px-8 py-4 inline-block">
              🚀 Fazer Login
            </a>
            <a href="/register" className="btn-secondary text-lg px-8 py-4 inline-block">
              ✨ Registrar
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🏥 Tela Inicial - Clínica Saúde & Bem-estar
        </h1>
        <p className="text-xl mb-8 text-center text-gray-700">
          Bem-vindo, <span className="font-semibold text-purple-600">{user.name}</span> ({user.role === 'admin' ? 'Administrador' : 'Médico'})
        </p>

        <div className={`grid grid-cols-1 ${user.role === 'admin' ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-8 mb-12`}>
          {user.role === 'admin' && (
            <div className="stats-card card">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">👥 Pacientes</h2>
              <p className="text-4xl font-bold text-blue-600 mb-4">{patients.length}</p>
              <a href="/patients" className="btn-primary text-sm">
                Gerenciar Pacientes
              </a>
            </div>
          )}
          {user.role === 'admin' && (
            <div className="stats-card card">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">👨‍⚕️ Médicos</h2>
              <p className="text-4xl font-bold text-blue-600 mb-4">{doctors.length}</p>
              <a href="/doctors" className="btn-primary text-sm">
                Gerenciar Médicos
              </a>
            </div>
          )}
          <div className="stats-card card">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">
              📅 {user.role === 'admin' ? 'Consultas' : 'Minhas Consultas'}
            </h2>
            <p className="text-4xl font-bold text-blue-600 mb-4">{appointments.length}</p>
            <a href="/appointments" className="btn-primary text-sm">
              {user.role === 'admin' ? 'Gerenciar Consultas' : 'Ver Consultas'}
            </a>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
            📅 {user.role === 'admin' ? 'Próximas Consultas' : 'Minhas Próximas Consultas'}
          </h2>
          <ul className="space-y-4">
            {appointments && appointments.length > 0 ? (
              appointments
                .filter(a => new Date(a.date) >= new Date() && a.status !== 'Cancelada')
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((appointment) => (
                  <li key={appointment.id} className="appointment-item">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-lg">{getPatientName(appointment.patientId)}</span>
                        <span className="text-gray-600 ml-2">com</span>
                        <span className="font-semibold text-lg ml-2 text-purple-600">{getDoctorName(appointment.doctorId)}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{appointment.date} às {appointment.time}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === 'Agendada' ? 'bg-yellow-100 text-yellow-800' :
                          appointment.status === 'Confirmada' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'Realizada' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li className="appointment-item text-center text-gray-500">
                Nenhuma consulta agendada
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

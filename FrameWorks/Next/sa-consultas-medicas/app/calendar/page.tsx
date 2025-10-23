'use client';

import { useState, useEffect } from 'react';
import { Appointment, Patient } from '../types';
import { useAuth } from '../context/AuthContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      fetchAppointments();
      fetchPatients();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      setAppointments([]);
    }
  };

  const fetchPatients = async () => {
    const res = await fetch('/api/patients');
    const data = await res.json();
    if (Array.isArray(data)) {
      setPatients(data.map((p: any) => ({ ...p, id: p._id })));
    } else {
      setPatients([]);
    }
  };

  const getMyAppointments = () => {
    if (!user) return [];
    return appointments.filter(app => app.doctorId === user.doctorId);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayAppointments = getMyAppointments().filter(app => {
        const appDate = new Date(app.date);
        return appDate.toDateString() === date.toDateString();
      });
      return dayAppointments.length > 0 ? <div className="calendar-tile text-xs rounded p-1">{dayAppointments.length}</div> : null;
    }
    return null;
  };

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.name || 'Desconhecido';

  if (!user || user.role !== 'doctor') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">🚫 Acesso Negado</h2>
          <p className="text-gray-600">Apenas médicos podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          📆 Calendário de Consultas
        </h1>
        <div className="card p-8 mb-8">
          <Calendar
            onChange={(value) => setCalendarDate(value as Date)}
            value={calendarDate}
            tileContent={tileContent}
            onClickDay={(date) => setCalendarDate(date)}
            className="w-full"
          />
        </div>
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6 text-purple-600">
            📅 Consultas em {calendarDate.toLocaleDateString('pt-BR')}
          </h3>
          <ul className="space-y-4">
            {getMyAppointments()
              .filter(app => {
                const appDate = new Date(app.date);
                return appDate.toDateString() === calendarDate.toDateString();
              })
              .map((app) => (
                <li key={app.id} className="appointment-item">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-lg">{getPatientName(app.patientId)}</span>
                      <span className="text-gray-600 ml-2">às</span>
                      <span className="font-semibold text-lg ml-2">{app.time}</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'Agendada' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Confirmada' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Realizada' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

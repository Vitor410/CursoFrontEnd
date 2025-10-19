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
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
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
      return dayAppointments.length > 0 ? <div className="text-xs bg-blue-200 rounded p-1">{dayAppointments.length}</div> : null;
    }
    return null;
  };

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.name || 'Desconhecido';

  if (!user || user.role !== 'doctor') {
    return (
      <div className="p-8">
        <div className="text-center">Acesso negado. Apenas médicos podem acessar esta página.</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Calendário de Consultas</h1>
      <Calendar
        onChange={(value) => setCalendarDate(value as Date)}
        value={calendarDate}
        tileContent={tileContent}
        onClickDay={(date) => setCalendarDate(date)}
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">Consultas em {calendarDate.toLocaleDateString()}</h3>
        <ul>
          {getMyAppointments()
            .filter(app => {
              const appDate = new Date(app.date);
              return appDate.toDateString() === calendarDate.toDateString();
            })
            .map((app) => (
              <li key={app.id} className="mb-2 p-2 bg-gray-100 rounded">
                {app.time} - {getPatientName(app.patientId)} - {app.status}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

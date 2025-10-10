'use client';

import { useState, useEffect } from 'react';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

interface Patient {
  _id: string;
  name: string;
  phone: string;
}

interface Appointment {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  time: string;
  status: string;
}

export default function DoctorDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

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

  const filteredAppointments = appointments.filter(a => a.doctor._id === selectedDoctor);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchAppointments();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Painel do Médico</h1>

      <div className="mb-8">
        <label className="block mb-2">Selecionar Médico:</label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="p-2 border"
        >
          <option value="">Selecionar</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>{d.name} - {d.specialty}</option>
          ))}
        </select>
      </div>

      {selectedDoctor && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Minhas Consultas</h2>
          <ul>
            {filteredAppointments.map((a) => (
              <li key={a._id} className="mb-4 p-4 border rounded">
                <div>Paciente: {a.patient.name}</div>
                <div>Data: {a.date} às {a.time}</div>
                <div>
                  Status:
                  <select
                    value={a.status}
                    onChange={(e) => handleStatusChange(a._id, e.target.value)}
                    className="ml-2 p-1 border"
                  >
                    <option value="Agendada">Agendada</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Realizada">Realizada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

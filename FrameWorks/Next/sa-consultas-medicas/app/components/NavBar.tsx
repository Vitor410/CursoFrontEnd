'use client';

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Clínica Saúde & Bem-estar</h1>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/" className="hover:underline">Dashboard</Link>
              {user.role === 'admin' && (
                <>
                  <Link href="/patients" className="hover:underline">Pacientes</Link>
                  <Link href="/doctors" className="hover:underline">Médicos</Link>
                </>
              )}
              <Link href="/appointments" className="hover:underline">
                {user.role === 'admin' ? 'Consultas' : 'Minhas Consultas'}
              </Link>
              {user.role === 'doctor' && (
                <Link href="/calendar" className="hover:underline">Calendário</Link>
              )}
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Registrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

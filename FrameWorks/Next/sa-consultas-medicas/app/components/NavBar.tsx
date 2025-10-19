'use client';

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          Clínica Saúde & Bem-estar
        </h1>
        <div className="space-x-6 flex items-center">
          {user ? (
            <>
              <Link href="/" className="nav-link hover:text-pink-300 transition-colors duration-300">🏠 Dashboard</Link>
              {user.role === 'admin' && (
                <>
                  <Link href="/patients" className="nav-link hover:text-pink-300 transition-colors duration-300">👥 Pacientes</Link>
                  <Link href="/doctors" className="nav-link hover:text-pink-300 transition-colors duration-300">👨‍⚕️ Médicos</Link>
                </>
              )}
              <Link href="/appointments" className="nav-link hover:text-pink-300 transition-colors duration-300">
                {user.role === 'admin' ? '📅 Consultas' : '📅 Minhas Consultas'}
              </Link>
              {user.role === 'doctor' && (
                <Link href="/calendar" className="nav-link hover:text-pink-300 transition-colors duration-300">📆 Calendário</Link>
              )}
              <button onClick={logout} className="btn-secondary text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link hover:text-pink-300 transition-colors duration-300">🔐 Login</Link>
              <Link href="/register" className="nav-link hover:text-pink-300 transition-colors duration-300">📝 Registrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Clínica Saúde & Bem-estar</h1>
      <p className="text-lg text-gray-600 mb-12">Sistema de Agendamento de Consultas</p>
      <div className="space-x-4">
        <Link href="/receptionist">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Recepcionista
          </button>
        </Link>
        <Link href="/doctor">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Médico
          </button>
        </Link>
      </div>
    </div>
  );
}

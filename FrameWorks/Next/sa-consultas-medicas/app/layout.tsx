import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clínica Saúde & Bem-estar",
  description: "Sistema de Agendamento de Consultas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">Clínica Saúde & Bem-estar</h1>
            <div className="space-x-4">
              <a href="/" className="hover:underline">Dashboard</a>
              <a href="/patients" className="hover:underline">Pacientes</a>
              <a href="/doctors" className="hover:underline">Médicos</a>
              <a href="/appointments" className="hover:underline">Consultas</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

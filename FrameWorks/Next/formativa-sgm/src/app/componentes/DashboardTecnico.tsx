"use client";

import { Iordem } from "@/models/Ordem";
import { useEffect, useState } from "react";

export default function DashboardTecnico() {
    const [ordens, setOrdens] = useState<Iordem[]>([]);

    useEffect(() => {
        fetchOrdens();
    }, []);

    const fetchOrdens = async () => {
        try {
            const resposta = await fetch("/api/ordemservico");
            const data = await resposta.json();
            if (data.success) {
                setOrdens(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Minhas Ordens de Serviço</h3>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Tipo de Manutenção</th>
                        <th>Data Solicitação</th>
                        <th>Data Finalização</th>
                        <th>Id Equipamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ordens.map((ordem) => (
                        <tr key={ordem._id}>
                            <td>{ordem.titulo}</td>
                            <td>{ordem.descricao}</td>
                            <td>{ordem.status}</td>
                            <td>{ordem.tipoManutencao}</td>
                            <td>{new Date(ordem.dataSolictada).toLocaleDateString()}</td>
                            <td>{ordem.dataFinalizacao ? new Date(ordem.dataFinalizacao).toLocaleDateString() : ""}</td>
                            <td>{ordem.EquipamentoId}</td>
                            <td>
                                <button>Finalizar Serviço</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
//rotas que não precisam especificar o ID (GET/POST)

import { createTarefa, getAllTarefas } from "@/controllers/tarefaController";
import { NextRequest, NextResponse } from "next/server";

//GET
export async function GET(){
    try {
        const tarefas = await getAllTarefas();
        return NextResponse.json({success:true, data:tarefas}, {status: 200});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha ao Buscar As Tarefas: ${error}`
        }, {status:500});
    }
}

//POST
export async function POST(req:NextRequest) {
    try {
        const data = await req.json(); //verifico se esta escrito no formato json
        const newTarefa = await createTarefa(data);
        return NextResponse.json({success:true, data:newTarefa}, {status: 201});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha ao Inserir Tarefa: ${error}`
        }, {status:500});
    }
}
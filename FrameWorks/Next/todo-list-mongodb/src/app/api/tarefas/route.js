// rotas para GET e POST

import Tarefa from "@/models/Tarefa";
import connectMongo from "@/services/mongodb";
import { NextResponse } from "next/server"; //biblioteca interna do next

//get
export async function GET() {
    try {
        await connectMongo(); //conectar com o mongoDB
        const tarefas = await Tarefa.find({}); 
        //retornar as tarefas
        //usando o NextResponse => explicando o NextResponse
        // é uma resposta do NEXT para Requisições HTTP
        return NextResponse.json(tarefas, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao buscar as Tarefas"},
            {status: 500}
        );
    }
}

//post
export async function POST(req) {
    try {
        await connectMongo(); 
        const data = await req.json(); //pega os dados da requisição
        const tarefa = await Tarefa.create(data); //cria a tarefa a partir do Schema Tarefa
        return NextResponse.json(tarefa, {status: 201}); //retorna a tarefa criada
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao criar a Tarefa"},
            {status: 500}
        );
    }
}
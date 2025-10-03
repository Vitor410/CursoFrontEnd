//PUT e DELETE

import Tarefa from "@/models/Tarefa";
import connectMongo from "@/services/mongpodb";
import { NextResponse } from "next/server";

export async function PUT(req, {params}){ //pegar o ID dos parametros
    try {
        await connectMongo();
        const data = await req.json();
        const tarefa =  await Tarefa.findByIdAndUpdate(
            params.id, //id da tarefa que será atualizada
            data, //dados que serão atualizados
            {new: true, runValidators: true} // retorna a tarefa atualizada
        );
        if(!tarefa){
            return NextResponse.json({error: "Tarefa não Encontrada"},{})
        }
        return NextResponse.json(tarefa, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao atualizar a Tarefa"},
            {status:500}
        );
    }
}

//DELETE
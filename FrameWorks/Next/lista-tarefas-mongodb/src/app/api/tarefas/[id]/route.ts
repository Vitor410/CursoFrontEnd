//PACH E DELETE que usam ID para fazer as Requisições Http

import { deleteTarefa, updateTarefa } from "@/controllers/tarefaController";
import { NextRequest, NextResponse } from "next/server";

interface Parametros{
    id:string
}
//params -> Next precisa dos Params para dar acesso ao segmento da URL
//params.id => "/api/tarefas/123" => transforma os params em endereço URL
export async function PATCH(req: NextRequest, {params}:{params:Parametros}) {
    try {
        const {id} = params;
        const data = await req.json();
        const tarefaAtualizada = await updateTarefa(id,data);
        if(!tarefaAtualizada) {
            return NextResponse.json({success:false, error: "Not Found"},{status:404})
        }
        return NextResponse.json({success:true, data:tarefaAtualizada}, {status:200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha atualizar a Tarefa: ${error}`
        }, {status:500});        
    }
}

//DELETE
export async function DELETE({params}:{params:Parametros}){
    try {
        const {id} = params;
        const resultado = await deleteTarefa(id);
        if(!resultado){
            return NextResponse.json({success:false, error:"Not found"},{status:404})
        }
        return NextResponse.json({success:true}, {status:200});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha ao Deletar A Tarefas: ${error}`
        }, {status:500});
    }
}
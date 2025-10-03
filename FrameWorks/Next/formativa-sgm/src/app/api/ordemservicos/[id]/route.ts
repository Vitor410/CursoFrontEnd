//Rotas que Precisam do ID ( PATCH ou PUT. DELETE, GET(one))
import { deleteOrdemServico, getOrdemServicoById, updateOrdemServico } from "@/controllers/OrdemController";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Parametro{
    id:string;
}

//PATCH
export async function PATCH(req: NextRequest, {params}:{params:Parametro}){
    try {
        const data = await req.json();
        const updatedOrdemServico = await updateOrdemServico(params.id, data);
        return NextResponse.json({success:true, data: updatedOrdemServico});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}
//GET(one)
export async function GET ({params}:{params:Parametro}){
    try {
        const ordem = await getOrdemServicoById(params.id);
        return NextResponse.json({success:true, data:ordem});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}   
//DELETE
export async function DELETE({params}:{params:Parametro}) {
    try {
        await deleteOrdemServico(params.id);
        return NextResponse.json({success:true});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}
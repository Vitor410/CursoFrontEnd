// rotas que não precisam de ID (GET / POST)

import { createOrdemServico, getOrdensServico } from "@/controllers/OrdemController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const data = await getOrdensServico();//busca todos as ordens
        return NextResponse.json({success:true, data:data});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newOrdemServico = await createOrdemServico(data);
        return NextResponse.json({success:true, data: newOrdemServico});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}
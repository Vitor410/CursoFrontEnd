//rotas que não precisam de ID (GET / POST)

import { createEquipamento, getEquipamentos } from "@/controllers/EquipamentoController";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const equipamentos = await getEquipamentos();
        return NextResponse.json({success:true, data:equipamentos});
    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const novoEquipamento = await createEquipamento(data);
        return NextResponse.json({success:true, data:novoEquipamento});
    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
}

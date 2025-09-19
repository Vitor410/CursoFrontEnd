import mongoose, { Model, Schema } from "mongoose";

export interface Iequipamento extends Document{
    nome: string;
    modelo: string;
    numeroserie : string;
    localizacao: string;
    status: string;
}

const EquipamentoSchema: Schema<Iequipamento> = new mongoose.Schema({
    nome:{
        type:String,
        required:[true, "O Nome é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    modelo:{
        type:String,
        required:[true, "O Modelo é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    numeroserie:{
        type:String,
        required:[true, "O Numero de serie é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    localizacao:{
        type:String,
        required:[true, "A localização é Obrigatoria"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    status:{
        type:String,
        required:[true, "O Status do equipamento é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
}); 


const Equipameto: Model<Iequipamento> = mongoose.models.Equipamento || mongoose.model<Iequipamento>("Equipamento",EquipamentoSchema);

//componente reutilizavel
export default Equipameto;






















//nome modelo numeroserie localizacao status







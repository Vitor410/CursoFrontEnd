//classe para equipamentos

import mongoose, { Document, Model, Schema } from "mongoose";

// atributos da classe
export interface IEquipamento extends Document{
    _id: string;
    modelo: string;
    marca: string;
    localizacao: string;
    numSerie: string;
    status: string;
}

//Schema da Classe ( Construtor)
const EquipamentoSchema:Schema<IEquipamento> = new Schema({
    modelo:{type:String, required:true},
    marca:{type:String, required:true},
    localizacao:{type:String, required:true},
    numSerie:{type:String, required:true, unique: true},
    status:{type: String, enum: ["ativo","inativo"], default: "ativo"}
});

// fromMap toMap

const Equipamento: Model<IEquipamento> = mongoose.models.Equipamento
|| mongoose.model<IEquipamento>("Equipamento",EquipamentoSchema);

export default Equipamento;
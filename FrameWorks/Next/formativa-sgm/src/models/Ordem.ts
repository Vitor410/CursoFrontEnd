import mongoose, { Model, Schema } from "mongoose";
import { Iusuario } from "./Usuario";

export interface Iordem extends Document{
    titulo:string,
    descricao:string,
    eqpid:string,
    userid:string,
    tipo:string,
    status:boolean;
}

const ordemSchema: Schema<Iordem> = new mongoose.Schema({
    titulo:{
        type:String,
        required:[true, "O Título é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    descricao:{
        type:String,
        required:[true, "A descrição é Obrigatoria"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    eqpid:{
        type:String,
        required:[true, "O Id do equipamento é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    userid:{
        type:String,
        required:[true, "O Id do Usuario é obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    tipo:{
        type:String,
        required:[true, "O Tipo é Obrigatorio"],
        trim: true,
        maxlength: [50, "máximo de 50 char"]
    },
    status:{
        type:Boolean,
        required:[true, "O status é Obrigatorio"],
        default: false
    }
})

const Ordem: Model<Iordem> = mongoose.models.Ordem || mongoose.model<Iordem>("Ordem", ordemSchema);

//componente reutilizavel
export default Ordem;




















//titulo descricao eqpid
//userid tipo status
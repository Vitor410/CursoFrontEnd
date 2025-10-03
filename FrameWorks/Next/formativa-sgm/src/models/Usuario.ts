import mongoose, { Model, Schema, Document } from "mongoose";
import { tree } from "next/dist/build/templates/app-page";
import bcrypt from "bcrypt";

export interface Iusuario extends Document {
    _id:string,
    username: string,
    email: string,
    senha?: string;
    tipo: string
    compareSenha(cuserSenha:string): Promise<boolean>;
}

const usuarioSchema : Schema<Iusuario> = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "O Nome é Obrigatorio"],
        trim: true,
        maxlength: [100, "máximo de 100 char"],
        unique:true
    }, 
    email:{
        type:String,
        required:[true, "O Email é Obrigatorio"],
        trim: true, 
        maxlength: [80, "máximo de 80 char"]
    },
    senha:{
        type:String,
        required:[true, "A Senha é Obrigatoria"],
        trim: true, 
        maxlength: [30, "máximo de 30 char"],
        select:false
    },
    tipo:{type: String, enum:["tecnico","gerente","admin"],required:true}
});

//Middleware para hashear a senha
//serve para criptografar a senha quando for armazenar u usuário no BD
usuarioSchema.pre<Iusuario>('save', async function (next){
    if(!this.isModified('senha') || !this.senha) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error:any) {
        next(error);
    }
})

//método para comparar senha 
//quando o usuário for fazer login (compara a senha digitada e criptogrfada com a senha criptografada)
usuarioSchema.methods.compareSenha = function (userSenha:string):Promise<boolean>{
    return bcrypt.compare(userSenha, this.senha);
}


const Usuario: Model<Iusuario> = mongoose.models.Usuario || mongoose.model<Iusuario>("Usuario",usuarioSchema);

//componente reutilizavel
export default Usuario;



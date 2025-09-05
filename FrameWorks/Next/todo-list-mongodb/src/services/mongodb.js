//auxiliar de conexão com o mongo db

import mongoose from "mongoose";

//arrow Function

const connectMongo = async () =>{
    mongoose.connect(process.env.DATABASE_URL) //estabele a conexão com o mongoDB
        .then(()=>console.log("Conectado ao Mongo"))
        .catch((err)=>console.error("Erro ao conectar ao Mongo:", err));
}

export default connectMongo;
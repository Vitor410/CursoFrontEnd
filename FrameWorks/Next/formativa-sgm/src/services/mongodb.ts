import mongoose from "mongoose";


//componentes responsavel por estabelece a conexão com o mongoDB
//converte uma string em URL => 
const MONGO_URI = process.env.DATABASE_URL;

//verificar se o arquivo enviroment(.env) foi definido

//1º Passo Criar e Verificar o Endereço de Conexão
if(!MONGO_URI){
    throw new Error("Crie o .env.local com a Variável DATABASE_URL");
}



//2º Passo criar um arquivo Cached, para armazenar as conexões ao longo do projeto
let cached = (global as any).mongoose;

//se cached não existir (primeira vez que for fazer acesso ao mongo)
if(!cached) {
    cached = (global as any).mongoose = {conn: null, promise: null}
}

//3º passo criar a função de conexão com o DB

async function connectMongo(){
    //verificar se já existe uma conexão
    if(cached.conn) return cached.conn;

    //se caso não existir a conexão
    if(!cached.promise){
        const aguarde = {bufferCommands: false};
        //criar uma promessa de conexão
        cached.promise = mongoose.connect(MONGO_URI!, aguarde)
            .then((mongoose)=>{console.log("Conectado ao Mongo");
                return mongoose;
            })
    }
    //colocar a promessa dentro da conexão promise => conn
    try {
        //cria a conexão a partir da promessa que estava pendente
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error; //lança um erro para o view
    }

    return cached.conn;
}

//trasnformar em componente reutilizável
export default connectMongo;

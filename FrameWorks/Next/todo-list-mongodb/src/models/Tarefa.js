//baser o meu modelo no Schema da Coleção

import mongoose from "mongoose";

const TarefaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O título é obrigatório"],
        trim: true,
        maxlength: [100, "O título < 100 char"]
    },
    concluida: {
        type: Boolean,
        default: false, //toda tarefa criada, não esta concluida
    },
    dataCriacao: {
        type: Date,
        default: Date.now, 
    }
});

export default mongoose.models.Tarefa || mongoose.model("Tarefa", TarefaSchema);
// ai esporta o modelo como tarefa caso não exista uma tarefa no banco,
// casa já exista uma tarefa.

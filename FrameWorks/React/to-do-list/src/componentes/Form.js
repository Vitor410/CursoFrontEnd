//componente para criar formulário para inserir uma nova tarefa
//função para adicionar tarefa (arrow function)
import "./Form.css"; //importa a estilização

import { useState } from "react"

const Form = ({addTarefa}) => {
    
    //vetor para armazenar o valor do input -> useState
    const [tarefa, setTarefa] = useState("");
    //useState => usa a memoria local do navegador
    //para armazenar as mudanças de estado
    //primeiro elemento do [] aramazenas as tarefas,
    // segundo elemento armazena as mudanças de estado

    //função para atualizar o esstado com o valor do input
    //função vai criar uma nova tarefa ao ser clicado o botão do submit(enviar)
    const handleSubmit = (e) =>{ //arrowFucntion
        //impedir o funcionamento padrão do botão submit
        e.preventDefault();//não permite o recarregamento da página
        // verificar se o campo não está vazio
        if(tarefa.trim() !== ""){
            //adicionar a tarefa ao vetor de tarefas
            addTarefa(tarefa);
            //limpo o campo do input
            setTarefa("");
        }
    };
    //lógica por tras do design
    //view
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Inserir Nova Tarefa"
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)}
            />
            <button className="btnEnviar" type="submit">
                Adicionar
            </button>
        </form>
    );
};

export default Form;
//componente cria o formulário das tarefas
//pode ser reutilizado em outros componentes da aplicação (export)


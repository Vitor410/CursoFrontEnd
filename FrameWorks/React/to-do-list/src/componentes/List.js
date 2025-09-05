import "./List.css";

//arrowFucntion
const List = ({tarefas, removerTarefas}) => {
    return(
        //lista não ordenada com as tarefas como elemento da lista
        <ul>
            {tarefas.map((tarefa,index) => (
                <li key={index}>
                    {tarefa}
                    <button onClick={()=>removerTarefas(index)}>
                        Excluir
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default List;
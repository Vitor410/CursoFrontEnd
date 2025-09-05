import "./App.css";

import { useState } from "react";
import Form from "./componentes/Form";
import List from "./componentes/List";

const App = () => {
  //lógica do componente
  const [tarefas, setTarefas] = useState([]);
  //estado para armazenar a lista de tarefas

  const addTarefa = (tarefa) => {
    setTarefas([...tarefas, tarefa]);
    //adiciona nova tarefa ao array de tarefas,
    //...tarefas => copia todas as anteriores + a nova
  }

  const removerTarefas = (index) => {
    setTarefas(tarefas.filter((_,i) => i !== index));
    //cria um novo vetor se a tarefa que quero remover
    //filtra o array, removendo a posição index
  };

  //view do componente

  return(
    <div>
      <h1>To-Do-List APP</h1>
      <Form addTarefa={addTarefa} />
      <List tarefas={tarefas} removerTarefas={removerTarefas}/>
    </div>
  );

};

export default App;
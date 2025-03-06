//Usar o dom para adiconar um evento no HTML
document.getElementById("btnAdicionar").addEventListener("click", adicionarTarefa);

function adicionarTarefa(){
    let input = document.getElementById("tarefa");
    let texto = input.value.trim();

    if(texto===""){
        return ;//interromper a function
    }

    //continuar o codigo - se texto não for "";
    let li = document.createElement("li"); // criando um elemento de lista
    li.innerHTML = texto+'<button onclick="removerTarefa(this)">Remover</button>'; //crie o conteudo do LI

    let ul = document.getElementById("Lista");
    ul.appendChild(li); //adicionar o item a lista

    input.value = "";

}

function removerTarefa(botao){
    botao.parentElement.remove();
}

function mudarCor() {
    document.getElementById("mudarCor").addEventListener("click", function() {
        let cores = ["red", "blue", "green", "purple", "orange"];
        document.body.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    });
};    



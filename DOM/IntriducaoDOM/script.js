function alterarTexto() {
    document.getElementById("titulo").innerText = "Texto Alterado!";
}

//getElementById - seleção do elementos pelo ID

let titulo = document.getElementById("titulo");
//varivel comum
titulo.style.color = "blue";  


//GetElementsByClassName - Seleciona elementos por classe, retornando uma coleção HTML.
let descricao = document.getElementsByClassName("descricao");
//variavel vetor//array
descricao[1].style.fontWeight = "bold"; 
descricao[2].style.color = "green";

//getElementsByTagName - Seleciona elementos pelo nome da tag.
let todosdescricao = document.getElementsByTagName("p");
console.log(todosdescricao.length); 

//querySelector e querySelectorAll
//querySelector() primeiro elemento 
let primeiroParagrafo = document.querySelector(".descricao");
primeiroParagrafo.style.color = "red"; 

//querySelectorAll() retorna todos os elementos que correspondem ao seletor.
let ps = document.querySelectorAll("p");
ps.forEach(p => p.style.fontSize = "18px"); 







//Crie um formulário onde o usuário insira notas.
//Armazene essas notas em um array.
//Use o método reduce para calcular a média e exiba o resultado na tela.
const prompt = require("prompt-sync")();

let notas = []; //declarado o vetor de notas

function inserirNotas(){
    let nota = Number(prompt("Digite a nota: "));
    notas.push(nota);
}

function media(){
    let media = notas.reduce((media,nota)=>media+nota)/notas.length;
    console.log("A media é "+media);
}

function menu(){
    let continuar = true;
    let operador;
    while(continuar)
        console.log("===Sistemas de notas===")
        console.log("1. Inserir notas.");
        console.log("2. Calcular a media.");
        console.log("3. Sair.");
        console.log("=======================");
        operador = prompt("Informe a opção")
    switch (operador) {
        case "1":
            inserirNotas();
            break;
        case "2":
            media();
            break;
        case "3":
            continuar = false
            console.log("Saindo....");
            break;
    
        default:
            console.log("Informe uma opção valida");
            break;
        }
    }//fim do switch
//fim do while

menu();

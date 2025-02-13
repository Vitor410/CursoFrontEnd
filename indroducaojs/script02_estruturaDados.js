//Estruturas de dados

//Condicionais (If Else ; Switch Case)

var precoProduto = 150;

if (precoProduto>=100) {
    console.log("Valor  a Pagar: " + (precoProduto*0.9));
} else{
    console.log("Valor a pagar: " + (precoProduto));
}

//switch case
var mes = 2;

switch (mes) {
    case 1:
        console.log("Janeiro");
        break;
    case 2:
        console.log("Feveiro");
        break;
    case 3:
        console.log("Março");
        break;
    default:
        console.log("Outro mes");
        break;
}

//Estrutura de repetição (for ; While)

//For (ponto di inicio; ponto de parada; incremento)
for (let i = 0; i < 10; i++) {
    console.log("Indice: "+i);
    
}

//while (condição de parada == false)
var continuar = true;
var numeroEscolhido = 3;
var tentativas=0;

while (continuar) {
    let numeroSorteado = Math.round(Math.random()*10);
    if (numeroEscolhido==numeroSorteado) {
        continuar = false
    }
    tentativas++;
    console.log("Numero de tentativas : " + tentativas);
}

//funçoes (métodos)

function saudacao(nome) {
    return "Olá, " + nome +"!!!";
}

console.log(saudacao("Vitor"));
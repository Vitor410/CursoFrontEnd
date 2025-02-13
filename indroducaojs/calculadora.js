var prompt = require("prompt-sync")();

//calculadora simples

//funções
//soma
function soma(a,b){
    return (a+b);
}

function Multiplicação(a,b){
    return (a*b);
}

function subtração(a,b){
    return (a-b);
}

function Divisão(a,b){
    return (a/b);
}

function menu(){
    console.log("Escolha a operação desejada ")
    console.log("1. soma");
    console.log("2. Multiplicação");
    console.log("3. subtração");
    console.log("4. Divisão");
    let operacao = Number(prompt());
    switch (operacao) {
        case 1:
            var a = Number(prompt("Informe o primeiro numero "));
            var b = Number(prompt("Informe o segundo o numero"));
            console.log(soma(a,b));
            break;
        case 2:
            var a = Number(prompt("Informe o primeiro numero "));
            var b = Number(prompt("Informe o segundo o numero"));
            console.log(Multiplicação(a,b));
            break;
        case 3:
            var a = Number(prompt("Informe o primeiro numero "));
            var b = Number(prompt("Informe o segundo o numero"));
            console.log(Multiplicação(a,b));
            break;
        case 4:
            var a = Number(prompt("Informe o primeiro numero "));
            var b = Number(prompt("Informe o segundo o numero"));
            if (b==0){
                console.log("Não dividiras por Zero")
             } else{
                console.log(Divisão(a,b));
            }
            break;
    
        default:
            console.log("Operação invalida")
            break;
    }
}

menu();
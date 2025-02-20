//Funções de data e hora

let agora = new Date();
console.log(agora);
console.log(agora.toLocaleString());

//Difinição de um objeto da classe date()
//Para a variavel agora

//Calculo com datas
let data1 = new Date("2025-01-23");
let data2 = new Date("2025-06-18");

let diferença = data2 - data1;

console.log(diferença/(1000*60*60*24)); // dias da diferença


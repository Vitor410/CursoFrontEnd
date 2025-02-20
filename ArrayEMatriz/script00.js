// array e matrizes

//declaração de um array
let dados = []; //uso do colchetes e declaração de um array

let numeros = [1,2,3,4,5,6,7,8,9];
let palavras = ["Bola", "Sapatos"];
console.log(numeros.length); //quantidade de elementos do array

//indices do array

//imprimir o 5º elemento de um array
console.log(numeros[4]); // 5

//adicionar elementos ao array

palavras.push("Cachorro"); // no final do array
console.log(palavras);

palavras.unshift("Predio"); // no começo do array
console.log(palavras);

//Remover elementos

palavras.pop(); //remove o ultimo elemento
console.log(palavras);

palavras.shift(); //remove o primeiro elemento
console.log(palavras);

//forEach - repetição em um vetor

palavras.forEach(palavras => {
    console.log(palavras);
});

//Splice
//remove pelo indice
palavras.splice(1,1); // remover sapato
console.log(palavras);

//manipulação de arrays
let numerosDobro = numeros.map(x => x*10);
console.log(numerosDobro);
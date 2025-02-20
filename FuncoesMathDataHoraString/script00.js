//Funções Matematicas 

//Sqrt //Pow
//raiz quadrada de 25
console.log(Math.sqrt(25)); // resultado 5

//Pontencia
console.log(Math.pow(3,2)); // 3 ao quadrado = 9
console.log(Math.pow(4,3)); //4 ao quadrado = 64
console.log(Math.pow(27,1/3)); //27^(1/3) = 3

//Arredondamento 
//Math.round (arredondar para o mais proximo)
console.log(Math.round(4.4)); //4
console.log(Math.round(4.7)); //5
//Math.floor (arrendondar para baixo)
console.log(Math.floor(4.9)); //4
//Math.ceil (arredondar sempre para cima)
console.log(Math.ceil(4.1));

//Numeros Aleatorios 
console.log(Math.random()); //vai sortear numeros entre 0 e 1 

//1 ->100
console.log(Math.ceil(Math.random()*100));
//0 ->99
console.log(Math.floor(Math.random()*100));
console.log(Math.floor(Math.random()*10000));
console.log(Math.floor(Math.random()*10000));

console.log(Math.round(Math.random)*50);
console.log(Math.round(Math.random)*50+50);

//Maximo, Minino, Absoluto
var numeros = [0,1,2,3,4,5,6,7,8,9]; //array
console.log(Math.max(numeros)); //9 //Maior numero da sequencia
console.log(Math.min(numeros)); //0 // Menor Numero da sequencia
var Absoluto = -10;
console.log(Math.abs(Absoluto)); //10 // Modulo do numero





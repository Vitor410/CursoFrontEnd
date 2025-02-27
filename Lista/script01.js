let dados = []; 

let numeros = [1,2,3,4,5,6,7,8,9,10];
console.log(numeros);

for(let i = 0; i<numeros.length;i++){
    console.log("numero = ["+i+"]"+numeros[i])
};

numeros.forEach(numeros => {
    console.log(numeros);
});

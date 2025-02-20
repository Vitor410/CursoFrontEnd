//Funções de string(texto)

var texto = "Aula de JavaScript";
console.log(texto.length); //contar o numero de caracteres

console.log(texto.toUpperCase()); //Tudo Maisculo
console.log(texto.toLowerCase()); //Tudo Minusculo

//Manipulação de texto
console.log(texto.substring(0,4)); //Aula
console.log(texto.slice(-10)); //JavaScript
console.log(texto.replace("JavaScript", "TypeScript"));

// Split ( usar um caracter em comum oara separar em um vetor)

let linguagem = "JavaScript,C++,Python,Java,PHP";
let arraylinguagem = linguagem.split(",");
console.log(arraylinguagem);

// Trim (tesoura)
let tesoura = "  JavaScript  ";
console.log(tesoura.trim()); //tirou o espaço
console.log(tesoura); //sem o trim vai ficar com espaço

var prompt = require("prompt-sync")();
var numero = Number(prompt("Informe um intervalo de número: "));

for (let i = numero; i <= 20; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
}

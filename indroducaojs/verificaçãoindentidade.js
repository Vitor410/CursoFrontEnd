var prompt = require("prompt-sync")();

let idade = Number(prompt("Sua idade"));

if (idade < 18)
    console.log("Você é menor de idade.");
else if (idade < 60)
    console.log("Você é maior de idade.");
else 
 console.log("Você é idoso.");
    
class Funcionarios{
    nome;
    salario;
    cargo;
    constructor(nome, salario, cargo){
        this.nome = nome;
        this.salario = salario;
        this.cargo = cargo;
    }
    //metodos aumentar salario percentual e exibir info
    aumentarSalario(percentual){
        this.salario += this.salario * percentual / 100;
        console.log(`Salário atualizado: R$${this.salario.toFixed(2)}`);
    }
    exibirInfo(){
        return `Nome: ${this.nome}, Salário: R$${this.salario.toFixed(2)}, Cargo: ${this.cargo}`;
    }
}

// exemplo de uso
const conta = new Funcionarios("João", 1000, "Gerente");
conta.aumentarSalario(20); // Aumenta o salário em 10%
console.log(conta.exibirInfo());
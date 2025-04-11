class veiculo{
    constructor(marca, modelo, ano){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    exibirInfo(){
        console.log(`Veículo: ${this.marca} ${this.modelo}, Ano: ${this.ano}, Cor: ${this.cor}`);
    }
}


class Carro extends veiculo{
    constructor(marca, modelo, ano, qtdadePortas){
        super(marca, modelo, ano);
        this.qtdadePortas = qtdadePortas;
    }

    exibirInfo(){
        console.log(`Carro: ${this.marca} ${this.modelo}, Ano: ${this.ano}, Quantidade De Portas ${this.qtdadePortas}`);
    }
}

let carro1 = new Carro("Ford", "Fusca", 1970, 2);
carro1.exibirInfo();
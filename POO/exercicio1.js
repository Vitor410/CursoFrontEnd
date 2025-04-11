class Produto{
    constructor(nome, preco, estoque){
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender(quantidade){
        if(this.estoque >= quantidade){
            this.estoque -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidades de ${this.nome} vendidas.`);
        }else{
            console.log(`Estoque insuficiente para ${this.nome}.`);
        }
    }

    repor(quantidade){
        this.estoque += quantidade;
        console.log(`Estoque atualizado: ${this.estoque} unidades de ${this.nome}.`);
    }

    exibirInfo(){
        console.log(`Produto: ${this.nome}, Preço: R$${this.preco}, Estoque: ${this.estoque}`);
    }
}

let produto1 = new Produto("Celular", 2000, 50);
produto1.exibirInfo();






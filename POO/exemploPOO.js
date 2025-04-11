let produto = {
    nome: "Notebook",
    preco: 3000,
    desconto: function(){return this.preco*0.1}  
}

let produto3 = {
    nome: "Caixa de som",
    preco: 1000,
    desconto: function(){return this.preco*0.1}  
} //coleção (chave/valor)


// coleção (chave/valor)

console.log(produto.nome, "desconto:", produto.desconto());

//POO
class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    desconto() {
        return this.preco * 0.1;
    }
}

let produto1 = new Produto("Celular", 2000);
let produto2 = new Produto("Mouse Gamer", 200);
console.log(produto1.nome, "desconto:", produto1.desconto());

//exemplo de encapsulamento
class Usuario{
    //atributos privado
    #nome;
    #id;
    #senha;
    constructor(nome, id, senha){
        this.#nome = nome;
        this.#senha=senha;
        this.#id = id;
    }

    // metedo do tipo get
    getNome(){
        return this.#nome;
    }

    getId(){
        return this.#id;
    }

    getSenha(){
        return this.#senha;
    }
}

let user = new Usuario("João", "123456", "a01");
console.log(user.nome); // vai dar erro não pode chamar pelo atributo
console.log(user.getNome()); // vai dar certo

//herança

class Pessoa{
    constructor(nome, cpf){
        this.nome = nome;
        this.cpf = cpf;
    }
    exibirInfo(){
        console.log("Nome: " + this.nome + ", CPF: " + this.cpf);
    }
}

class Aluno extends Pessoa{
    constructor(nome, cpf, matricula){
        super(nome, cpf);
        this.matricula = matricula;
    }
}

let aluno1 = new Aluno("Maria", 123,"RM123456");
aluno1.exibirInfo(); 
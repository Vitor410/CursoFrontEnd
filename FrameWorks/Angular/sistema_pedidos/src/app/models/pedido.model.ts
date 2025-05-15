import { Cliente } from "./cliente.model";

export interface ItemPedido{
    produtoID: number;
    quantidade: number;
}

export class Pedido{
    constructor(
        public id: number,
        public cliente: Cliente,
        public itens: ItemPedido[],
        public desconto: number
    ){}

    //método
    calcularTotal(produtos: any[]):number{
        const total = this.itens.reduce((acc,item)=>{ // reduce -> uma lista a um unico item
            const prod = produtos.find(p=>p.id === item.produtoID); // procura o produto na lista de item
            return acc + (prod ? prod.preco*item.quantidade : 0); // se o produto estiver na lista faz ? produto*qtd, caso não: 0
        },0); // o acumulado sempre começa em 0
        return total - (total*(this.desconto/100)); // calcula o desconto sobre o valor total encontrado anterriormente
    }

}
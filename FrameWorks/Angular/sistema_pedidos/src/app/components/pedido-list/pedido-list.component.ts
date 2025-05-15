import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
import { Produto } from 'src/app/models/produto.model';
import { DadosService } from 'src/app/services/dados.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {
  //atributos
  pedidos : Pedido[] = [];
  produtos: Produto[] = [];

  constructor(private dadosService: DadosService){}

  ngOnInit(): void {
    this.dadosService.getPedidos().subscribe(p=>this.pedidos = p);
    this.dadosService.getProdutos().subscribe(p => this.produtos = p);
  }

  calcularTotal(pedido: Pedido): number{
    return new Pedido(
      pedido.id, 
      pedido.cliente, 
      pedido.itens, 
      pedido.desconto
    ).calcularTotal(this.produtos);
  }
}

import { Component } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { DadosService } from 'src/app/services/dados.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {
  nome = "";
  preco = 0;

  constructor(private dadosService: DadosService){}

  salvarProduto(){
    const produto = new Produto(this.dadosService.getProdutos.length+1,this.nome,this.preco);
    this.dadosService.adicionarProduto(produto);
    this.nome = "";
    this.preco = 0;
  }
  
}

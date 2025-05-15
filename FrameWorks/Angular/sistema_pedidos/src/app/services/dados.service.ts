import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { Pedido } from '../models/pedido.model';


@Injectable({
  providedIn: 'root'
})
export class DadosService {
   private baseUrl = "http://localhost:3000"; //endereco da API backend

  constructor(private http: HttpClient) { }

  //métodos de conexão com o backend

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`); //usa o método get do httpClient(método de conexão com o backend para fazer solicitações) 
   // me retorna uma lista de clientes
  }
  //post
  adicionarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }
  
  //produtos
  //get 
  getProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`);  
  }
  
  //post 
  adicionarProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(`${this.baseUrl}/produtos`, produto);
  }
  
  //pedido
  //get
  getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrl}/pedidos`);  
  }
  //post
  adicionarPedido(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(`${this.baseUrl}/pedidos`, pedido);
  }
}

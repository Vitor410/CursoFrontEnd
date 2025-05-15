import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { DadosService } from 'src/app/services/dados.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent {
  nome= "";

  constructor(private dadosService: DadosService){}

  salvarCliente(){
  const cliente = new Cliente(this.dadosService.getClientes.length+1, this.nome);
  this.dadosService.adicionarCliente(cliente);
  this.nome = "";
  }
}

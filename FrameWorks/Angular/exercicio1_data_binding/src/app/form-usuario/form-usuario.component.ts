import { Component } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
                      })
export class FormUsuarioComponent {
  // Atributos
  nome: string = "";
  email: string = "";
  telefone: string = "";
  genero: string = "";
  idade: number | null = null;
  profissao: string = "";

  limparCampos(): void {
    this.nome = "";
    this.email = "";
    this.telefone = "";
    this.genero = "";
    this.idade = null;
    this.profissao = "";
  }
  
  enviarFormulario(): void {
    alert(`Nome: ${this.nome}\nEmail: ${this.email}\nTelefone: ${this.telefone}\nGênero: ${this.genero}\nIdade: ${this.idade}\nProfissão: ${this.profissao}`);
  }
  // mensagem de alerta casso o campo esteja vazio
  verificarCampos(): void {
    if (!this.nome || !this.email || !this.telefone || !this.genero || this.idade === null || !this.profissao) {
      alert("Por favor, preencha todos os campos.");
    } else {
      this.enviarFormulario();
    }
  }
} 
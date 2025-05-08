export class FormUsuarioComponent {
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

  verificarCampos(): void {
    if (!this.nome || !this.email || !this.telefone || !this.genero || this.idade === null || !this.profissao) {
      alert("Por favor, preencha todos os campos.");
    } else {
      this.enviarFormulario();
    }
  }
}

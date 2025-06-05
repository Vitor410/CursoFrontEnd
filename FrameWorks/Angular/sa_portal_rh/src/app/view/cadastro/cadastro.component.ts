import { Component } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  public curriculo: Curriculo = new Curriculo('', '', '', '', '');

  constructor(private curriculoService: CurriculoService) {}

  cadastrar() {
    if (
      !this.curriculo.cpf ||
      !this.curriculo.nome ||
      !this.curriculo.email ||
      !this.curriculo.telefone ||
      !this.curriculo.experiencia
    ) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
      return;
    }
    this.curriculoService.cadastrarCurriculo(this.curriculo).subscribe(
      () => {
        alert('Currículo cadastrado com sucesso!');
        this.curriculo = new Curriculo('', '', '', '', '');
        window.location.href = 'curriculos';
      },
      (err) => {
        alert('Erro ao cadastrar currículo.');
        console.error('Exception: ', err);
      }
    );
  }
}

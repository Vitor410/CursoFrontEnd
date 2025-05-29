import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss'],
})
export class PainelCurriculosComponent implements OnInit {
  public curriculo: Curriculo = new Curriculo(0, '', '', 0, ''); // corrigido para strings e number

  public curriculos: Curriculo[] = [];
  // armazenar os dados do API -json

  constructor(private _curriculosService: CurriculoService) {} // aplicando o service no Construtor

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    // Lista os currículos do servidor usando o serviço 'CurriculosService'
    this._curriculosService.getCurriculo().subscribe((retornaCurriculo: any[]) => {
      this.curriculos = retornaCurriculo.map((item: any) => {
        // Mapeia os dados retornados para objetos 'Curriculo'
        return new Curriculo(
          item.cpf,
          item.nome,
          item.email,
          item.telefone,
          item.experiencia
        );
      });
    });
  }

  // Listar único Currículo
  listarCurriculoUnico(curriculo: Curriculo) {
    // Função para listar currículo único, para edição no formulário
    this.curriculo = curriculo;
  }

  // Cadastrar Currículo
  cadastrar() {
    this._curriculosService.cadastrarCurriculo(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', '', 0, ''); // corrigido para tipos corretos
        this.listarCurriculos();
        alert('Currículo cadastrado com sucesso!');
      },
      (err) => {
        console.error('Exception: ', err);
      }
    );
  }

  // Atualizar Currículo
  atualizar(cpf: string) {
    this._curriculosService.atualizarCurriculo(cpf, this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', '', 0, ''); // corrigido para tipos corretos
        this.listarCurriculos();
        alert('Currículo atualizado com sucesso!');
      },
      (err) => {
        console.error('Exception: ', err);
      }
    );
  }

  // Excluir Currículo
  excluir(cpf: string) {
    this._curriculosService.removerCurriculo(cpf).subscribe(
      () => {
        this.listarCurriculos();
        alert('Currículo deletado com sucesso!');
      },
      (err) => {
        console.error('Exception: ', err);
      }
    );
  }
}

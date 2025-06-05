import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss'],
})
export class PainelCurriculosComponent implements OnInit {
  public curriculo: Curriculo = new Curriculo('', '', '', '', '');
  public curriculos: Curriculo[] = [];
  public mostrarFormulario: boolean = false;
  public alertaCampos: boolean = false;
  // armazenar os dados do API -json

  constructor(private _curriculosService: CurriculoService) {} // aplicando o service no Construtor

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    // Lista os currículos do servidor usando o serviço 'CurriculosService'
    this._curriculosService.getCurriculo().subscribe((retornaCurriculo: any[]) => {
      // Use any[] para manter o id
      this.curriculos = retornaCurriculo.map((item: any) => {
        // Retorne o objeto inteiro para manter o id
        return {
          ...item,
          cpf: String(item.cpf ?? ''),
          nome: String(item.nome ?? ''),
          email: String(item.email ?? ''),
          telefone: String(item.telefone ?? ''),
          experiencia: String(item.experiencia ?? '')
        };
      });
    });
  }

  // Listar único Currículo
  listarCurriculoUnico(curriculo: any) {
    // Cria uma cópia para evitar problemas de referência
    this.curriculo = new Curriculo(
      String(curriculo.cpf ?? ''),
      String(curriculo.nome ?? ''),
      String(curriculo.email ?? ''),
      String(curriculo.telefone ?? ''),
      String(curriculo.experiencia ?? '')
    );
  }

  // Cadastrar Currículo
  cadastrar() {
    if (
      !this.curriculo.cpf ||
      !this.curriculo.nome ||
      !this.curriculo.email ||
      !this.curriculo.telefone ||
      !this.curriculo.experiencia
    ) {
      this.alertaCampos = true;
      return;
    }
    this.alertaCampos = false;
    this._curriculosService.cadastrarCurriculo(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo('', '', '', '', '');
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
    if (
      !this.curriculo.cpf ||
      !this.curriculo.nome ||
      !this.curriculo.email ||
      !this.curriculo.telefone ||
      !this.curriculo.experiencia
    ) {
      this.alertaCampos = true;
      return;
    }
    this.alertaCampos = false;

    // Busca o currículo pelo CPF para obter o ID (curriculos é any[])
    const curriculoParaAtualizar: any = this.curriculos.find((c: any) => c.cpf === cpf && c.id);
    if (!curriculoParaAtualizar || !curriculoParaAtualizar.id) {
      alert('Não foi possível encontrar o currículo para atualização.');
      return;
    }

    this._curriculosService.atualizarCurriculo(curriculoParaAtualizar.id, this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo('', '', '', '', '');
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
    if (!cpf) {
      alert('Selecione um currículo para excluir.');
      return;
    }
    // Busca todos os currículos pelo CPF para obter todos os IDs
    const curriculosParaExcluir = this.curriculos.filter((c: any) => c.cpf === cpf && c.id);
    if (!curriculosParaExcluir.length) {
      alert('Não foi possível encontrar o currículo para exclusão.');
      return;
    }
    // Remove todos os currículos encontrados
    let excluidos = 0;
    curriculosParaExcluir.forEach((curriculo: any) => {
      this._curriculosService.removerCurriculo(curriculo.id).subscribe(
        () => {
          excluidos++;
          if (excluidos === curriculosParaExcluir.length) {
            this.curriculo = new Curriculo('', '', '', '', '');
            this.listarCurriculos();
            alert('Currículo(s) deletado(s) com sucesso!');
          }
        },
        (err) => {
          console.error('Exception: ', err);
        }
      );
    });
  }
}

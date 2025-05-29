import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss'],
})
export class PainelVagasComponent implements OnInit {
  public vaga: Vaga = new Vaga(0, '', '', '', 0); //rastrear os dados no formulário por interpolação

  public vagas: Vaga[] = [];
  //armazenar os dados do API -json

  constructor(private _vagasService: VagasService) {} // aplicando o service no Construtor

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas() {
    // Lista as vagas do servidor usando o serviço 'VagaService'
    this._vagasService.getVagas().subscribe((retornaVaga) => {
      this.vagas = retornaVaga.map((item) => {
        // Mapeia os dados retornados para objetos 'Vaga'
        return new Vaga(
          item.id,
          item.nome,
          item.foto,
          item.descricao,
          item.salario
        );
      });
    });
  }

  //Listar unica Vaga
  listarVagaUnica(vaga:Vaga){
    //Função para listar vaga unica, para edição no formulário
    this.vaga = vaga;
    //A vaga clicada é mostrada no formulário, =>
  }

  //cadastrar Vaga
  cadastrar(){
    this._vagasService.cadastrarVaga(this.vaga).subscribe(
      ()=>{
        this.vaga = new Vaga(0,"","","",0);//limpara os campos do formulário
        this.listarVagas();
        alert("Vaga Cadastrada com Sucesso");
      }, (err) => { console.error("Exception: ",err);}
    );
  }

  // atualizar Vagas
  atualizar(id:any){
    this._vagasService.atualizarVaga(id, this.vaga).subscribe(
      ()=>{
        this.vaga = new Vaga(0,"","","",0);
        this.listarVagas();
        alert("Vaga Atualizada com Sucesso!!!");
      }, (err) => {console.error("Exception: ",err);}
    );
  }

  //deletar Vagas
  excluir(id:any){
    this._vagasService.removerVaga(id).subscribe(
      ()=>{
        this.listarVagas();
        alert("Vaga Deletada com Sucesso!!!");
      }, (err) => {console.error("Exception: ",err);}
    );
  }

}

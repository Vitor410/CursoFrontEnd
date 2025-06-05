import { Component } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent {
   public curriculos: Curriculo[] = [];
  
    constructor(private _curriculoService:CurriculoService) {}
    
    ngOnInit(): void {
      this.listarCurriculos();
    }
  
    listarCurriculos() {
      this._curriculoService.getCurriculo().subscribe(
        (retornaCurriculo) => {
          this.curriculos = retornaCurriculo.map(
            (item) => {
              return new Curriculo(
                item.cpf,
                item.nome,
                item.email,
                item.telefone,
                item.experiencia
              );
            }
          );
        }
      );
    }
}

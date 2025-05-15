import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormComponent,
    ProdutoFormComponent,
    PedidoFormComponent,
    PedidoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

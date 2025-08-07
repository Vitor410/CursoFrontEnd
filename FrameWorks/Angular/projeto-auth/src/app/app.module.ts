import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { InternaComponent } from './pages/interna/interna.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    InternaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //Para fazer requisições HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

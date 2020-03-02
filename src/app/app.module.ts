import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListOrcamentoComponent } from './orcamento/list-orcamento/list-orcamento.component';
import { ListReparoComponent } from './reparo/list-reparo/list-reparo.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { InsertReparoComponent } from './reparo/insert-reparo/insert-reparo.component';
import { InsertOrcamentoComponent } from './orcamento/insert-orcamento/insert-orcamento.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListOrcamentoComponent,
    ListReparoComponent,
    LogoutComponent,
    InsertReparoComponent,
    InsertOrcamentoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

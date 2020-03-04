import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrcamentoListComponent } from './orcamento/orcamento-list/orcamento-list.component';
import { ReparoListComponent } from './reparo/reparo-list/reparo-list.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { OrcamentoInsertComponent } from './orcamento/orcamento-insert/orcamento-insert.component';
import { ReparoInsertComponent } from './reparo/reparo-insert/reparo-insert.component';
import { OrcamentoDetailComponent } from './orcamento/orcamento-detail/orcamento-detail.component';


const routes: Routes = [
  {path: 'orcamentos', component: OrcamentoListComponent},
  {path: 'orcamentos/:id', component: OrcamentoDetailComponent},
  {path: 'reparos', component: ReparoListComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'orcamentos-new', component: OrcamentoInsertComponent},
  {path: 'reparos-new', component: ReparoInsertComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

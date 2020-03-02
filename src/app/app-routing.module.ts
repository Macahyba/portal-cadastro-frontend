import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrcamentoComponent } from './orcamento/list-orcamento/list-orcamento.component';
import { ListReparoComponent } from './reparo/list-reparo/list-reparo.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: 'orcamentos', component: ListOrcamentoComponent},
  {path: 'reparos', component: ListReparoComponent},
  // {path: 'logout', redirectTo: '/login'},
  {path: 'logout', component: LogoutComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrcamentoListComponent } from './orcamento/orcamento-list/orcamento-list.component';
import { ReparoListComponent } from './reparo/reparo-list/reparo-list.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { OrcamentoInsertComponent } from './orcamento/orcamento-insert/orcamento-insert.component';
import { ReparoInsertComponent } from './reparo/reparo-insert/reparo-insert.component';
import { OrcamentoDetailComponent } from './orcamento/orcamento-list/orcamento-detail/orcamento-detail.component';
import { ReparoDetailComponent } from './reparo/reparo-list/reparo-detail/reparo-detail.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';


const routes: Routes = [
  {
    path: 'orcamentos',
    component: OrcamentoListComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'orcamentos/:id',
    component: OrcamentoDetailComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'reparos',
    component: ReparoListComponent,
    canActivate: [RoleGuardService],
    data: {
      role: ['admin', 'manager', 'user']
    }
  },{
    path: 'reparos/:id',
    component: ReparoDetailComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'logout',
    component: LogoutComponent
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'orcamentos-new',
    component: OrcamentoInsertComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'reparos-new',
    component: ReparoInsertComponent,
    canActivate: [AuthGuardService]
  },{
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

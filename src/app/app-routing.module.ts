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
import { CustomerCrudComponent } from './crud/customer-crud/customer-crud.component';
import { EquipmentCrudComponent } from './crud/equipment-crud/equipment-crud.component';
import { ServiceCrudComponent } from './crud/service-crud/service-crud.component';
import { UserCrudComponent } from './crud/user-crud/user-crud.component';
import { PerfilComponent } from './perfil/perfil.component';


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
    path: 'orcamentos-new',
    component: OrcamentoInsertComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'reparos',
    component: ReparoListComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'reparos/:id',
    component: ReparoDetailComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'reparos-new',
    component: ReparoInsertComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'clientes',
    component: CustomerCrudComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'equipamentos',
    component: EquipmentCrudComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'servicos',
    component: ServiceCrudComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'usuarios',
    component: UserCrudComponent,
    canActivate: [RoleGuardService],
    data: {
      role: ['admin', 'manager']
    }
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'logout',
    component: LogoutComponent
  },{
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

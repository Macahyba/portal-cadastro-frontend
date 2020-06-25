import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OrcamentoListComponent } from './orcamento/orcamento-list/orcamento-list.component';
import { ReparoListComponent } from './reparo/reparo-list/reparo-list.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReparoInsertComponent } from './reparo/reparo-insert/reparo-insert.component';
import { OrcamentoInsertComponent } from './orcamento/orcamento-insert/orcamento-insert.component';
import { LoginComponent } from './login/login.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { OrcamentoDetailComponent } from './orcamento/orcamento-list/orcamento-detail/orcamento-detail.component';
import { ReparoDetailComponent } from './reparo/reparo-list/reparo-detail/reparo-detail.component';
import { CustomerComponent } from './shared/customer/customer.component';
import { EquipmentComponent } from './shared/equipment/equipment.component';
import { ValorComponent } from './shared/valor/valor.component';
import { ServicesComponent } from './shared/services/services.component';
import { APIInterceptor } from './service/apiInterceptor.service';
import { StatusComponent } from './shared/status/status.component';
import { ReparoFupComponent } from './reparo/reparo-list/reparo-detail/reparo-fups/reparo-fup/reparo-fup.component';
import { ReparoFupsComponent } from './reparo/reparo-list/reparo-detail/reparo-fups/reparo-fups.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { NotasComponent } from './shared/notas/notas.component';
import { EquipmentCrudComponent } from './crud/equipment-crud/equipment-crud.component';
import { UserCrudComponent } from './crud/user-crud/user-crud.component';
import { CustomerCrudComponent } from './crud/customer-crud/customer-crud.component';
import { ServiceCrudComponent } from './crud/service-crud/service-crud.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DummyComponentMock } from './mock/dummy-component-mock';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrcamentoListComponent,
    ReparoListComponent,
    LogoutComponent,
    ReparoInsertComponent,
    OrcamentoInsertComponent,
    LoginComponent,
    DatepickerComponent,
    OrcamentoDetailComponent,
    ReparoDetailComponent,
    CustomerComponent,
    EquipmentComponent,
    ValorComponent,
    ServicesComponent,
    StatusComponent,
    ReparoFupComponent,
    ReparoFupsComponent,
    NotasComponent,
    EquipmentCrudComponent,
    UserCrudComponent,
    CustomerCrudComponent,
    ServiceCrudComponent,
    PerfilComponent,
    DummyComponentMock
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatRadioModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    AuthGuardService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

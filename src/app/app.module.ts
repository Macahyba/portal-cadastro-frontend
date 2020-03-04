import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OrcamentoListComponent } from './orcamento/orcamento-list/orcamento-list.component';
import { ReparoListComponent } from './reparo/reparo-list/reparo-list.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, 
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
          MatGridListModule  } from '@angular/material';
import { ReparoInsertComponent } from './reparo/reparo-insert/reparo-insert.component';
import { OrcamentoInsertComponent } from './orcamento/orcamento-insert/orcamento-insert.component';
import { LoginComponent } from './login/login.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { OrcamentoDetailComponent } from './orcamento/orcamento-detail/orcamento-detail.component';
import { ReparoDetailComponent } from './reparo/reparo-detail/reparo-detail.component';
import { CustomerComponent } from './shared/customer/customer.component';
import { EquipmentComponent } from './shared/equipment/equipment.component';
import { ServiceComponent } from './shared/service/service.component';


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
    ServiceComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

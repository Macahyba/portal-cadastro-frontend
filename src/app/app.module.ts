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
import { ReactiveFormsModule } from '@angular/forms';
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
          MatGridListModule,
          MatCheckboxModule,
          MatProgressBarModule  } from '@angular/material';
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
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatProgressBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

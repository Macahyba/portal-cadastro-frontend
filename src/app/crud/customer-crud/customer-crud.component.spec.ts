import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCrudComponent } from './customer-crud.component';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerServiceMock } from 'src/app/mock/customer-service-mock';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerCrudComponent', () => {
  let component: CustomerCrudComponent;
  let fixture: ComponentFixture<CustomerCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCrudComponent ],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatRadioModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CustomerService, useClass: CustomerServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

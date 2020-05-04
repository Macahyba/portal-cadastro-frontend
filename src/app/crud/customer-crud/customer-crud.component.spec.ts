import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCrudComponent } from './customer-crud.component';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerServiceMock } from 'src/app/mock/customer-service-mock';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatRadioModule, MatInputModule, MatOptionModule, MatSelectModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomerCrudComponent', () => {
  let component: CustomerCrudComponent;
  let fixture: ComponentFixture<CustomerCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCrudComponent ],
      imports: [
        ReactiveFormsModule,
        MatProgressBarModule,
        MatRadioModule,
        FormsModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
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

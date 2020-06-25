import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerServiceMock } from 'src/app/mock/customer-service-mock';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';

describe('CustomerComponent', () => {
  describe('given the CustomerComponent', () => {
    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;
    let form: FormBuilder;
    let customerService: CustomerServiceMock;
    let customer: CustomerModel;
    let contact: ContactModel;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CustomerComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: CustomerService, useClass: CustomerServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      customerService = TestBed.get(CustomerServiceMock);
      customer = customerService.getCustomer().value;
      contact = customer.contacts[0];

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('injectedCustomer should be empty', () => {
      expect(component.injectedCustomer$).toBeUndefined();
    })

    it('injectedContact should be empty', () => {
      expect(component.injectedContact$).toBeUndefined();
    })

    it('should register customerForm in the parentForm', () => {
      expect(component.parentFormGroup.controls.customer).toBeTruthy();
    })

    it('should register customer.id in the parentForm', () => {
      expect(component.customerGroup.controls.id).toBeTruthy();
    })

    it('should register customer.name in the parentForm', () => {
      expect(component.customerGroup.controls.name).toBeTruthy();
    })

    it('should register customer.fullName in the parentForm', () => {
      expect(component.customerGroup.controls.fullName).toBeTruthy();
    })

    it('should register customer.cnpj in the parentForm', () => {
      expect(component.customerGroup.controls.cnpj).toBeTruthy();
    })

    it('should register contactForm in the parentForm', () => {
      expect(component.parentFormGroup.controls.contact).toBeTruthy();
    })

    it('should register contact.id in the parentForm', () => {
      expect(component.contactGroup.controls.id).toBeTruthy();
    })

    it('should register contact.name in the parentForm', () => {
      expect(component.contactGroup.controls.name).toBeTruthy();
    })

    it('should register contact.department in the parentForm', () => {
      expect(component.contactGroup.controls.department).toBeTruthy();
    })

    it('should register contact.email in the parentForm', () => {
      expect(component.contactGroup.controls.email).toBeTruthy();
    })

    it('customerGroup should be valid when filled correctly', () => {

      component.customerGroup.controls.id.setValue(customer.id);
      component.customerGroup.controls.name.setValue(customer.name);
      component.customerGroup.controls.cnpj.setValue(customer.cnpj);
      component.customerGroup.controls.fullName.setValue(customer.fullName);

      expect(component.customerGroup.valid).toBeTruthy();
    })

    it('contactGroup should be valid when filled correctly', () => {

      component.contactGroup.controls.id.setValue(contact.id);
      component.contactGroup.controls.name.setValue(contact.name);
      component.contactGroup.controls.department.setValue(contact.department);
      component.contactGroup.controls.email.setValue(contact.email);

      expect(component.contactGroup.valid).toBeTruthy();
    })

  });

  describe('given the CustomerComponent has injectedCustomer', () => {
    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;
    let form: FormBuilder;
    let customerService: CustomerServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CustomerComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: CustomerService, useClass: CustomerServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      customerService = TestBed.get(CustomerServiceMock);
      component.injectedCustomer$ = customerService.getCustomer();

      fixture.detectChanges();
    });

    it('should load the injectedCustomer.id', () =>{
      expect(component.customerGroup.controls.id.value).toEqual(1);
    })

    it('should load the injectedCustomer.name', () =>{
      expect(component.customerGroup.controls.name.value).toEqual("name1");
    })

    it('should load the injectedCustomer.fullName', () =>{
      expect(component.customerGroup.controls.fullName.value).toEqual("fullName1");
    })

    it('should load the injectedCustomer.cnpj', () =>{
      expect(component.customerGroup.controls.cnpj.value).toEqual("cnpj1");
    })

  });


  describe('given the CustomerComponent has injectedContact', () => {
    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;
    let form: FormBuilder;
    let customerService: CustomerServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CustomerComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: CustomerService, useClass: CustomerServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      customerService = TestBed.get(CustomerServiceMock);
      component.injectedContact$ = customerService.getContact();

      fixture.detectChanges();
    });

    it('should load the injectedContact.id', () =>{
      expect(component.contactGroup.controls.id.value).toEqual(1);
    })

    it('should load the injectedContact.name', () =>{
      expect(component.contactGroup.controls.name.value).toEqual("name1");
    })

    it('should load the injectedContact.department', () =>{
      expect(component.contactGroup.controls.department.value).toEqual("depto1");
    })

    it('should load the injectedContact.email', () =>{
      expect(component.contactGroup.controls.email.value).toEqual("email1@mail");
    })

  });

  describe('given the CustomerComponent is disabled', () => {
    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CustomerComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: CustomerService, useClass: CustomerServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      component.disabled = true;

      fixture.detectChanges();
    });

    it('should not register customerGroup', () => {
      expect(component.parentFormGroup.controls.customer).toBeUndefined();
    })

    it('should not register the contactGroup', () => {
      expect(component.parentFormGroup.controls.contact).toBeUndefined();
    })

  });

});

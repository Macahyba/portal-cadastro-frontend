import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorComponent } from './valor.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotationServiceMock } from 'src/app/mock/quotation-service-mock';

describe('ValorComponent', () => {
  describe('given the ValorComponent', () => {
    let component: ValorComponent;
    let fixture: ComponentFixture<ValorComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ValorComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatCardModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ValorComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register totalDiscount in the parentForm', () =>{
      expect(component.parentFormGroup.controls.totalDiscount).toBeTruthy();
    })

    it('should register totalPrice in the parentForm', () =>{
      expect(component.parentFormGroup.controls.totalPrice).toBeTruthy();
    })
  });

  describe('given the ValorComponent has injectedDiscount', () => {
    let component: ValorComponent;
    let fixture: ComponentFixture<ValorComponent>;
    let quotationService: QuotationServiceMock;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ValorComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatCardModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ValorComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      quotationService = TestBed.get(QuotationServiceMock);
      component.injectedDiscount$ = quotationService.getDiscount();
      component.totalPrice = quotationService.getTotalPrice();

      fixture.detectChanges();
    });

    it('should load the totalDiscount', () =>{
      expect(component.totalDiscountControl.value).toEqual(10);
    })

    it('should load the totalPrice', () =>{
      expect(component.totalPriceControl.value).toEqual(100);
    })

    it('should calculate the valorFinal', () => {
      expect(component.returnTotal()).toEqual(90);
    })

  });

  describe('given the ValorComponent is disabled', () => {
    let component: ValorComponent;
    let fixture: ComponentFixture<ValorComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ValorComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatCardModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ValorComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});
      component.disabled = true;

      fixture.detectChanges();
    });

    it('should not register totalDiscount', () => {
      expect(component.parentFormGroup.controls.totalDiscount).toBeUndefined();
    })

  });

});

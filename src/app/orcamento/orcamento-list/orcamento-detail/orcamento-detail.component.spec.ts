import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrcamentoDetailComponent } from './orcamento-detail.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { QuotationService } from 'src/app/service/quotation.service';
import { QuotationServiceMock } from 'src/app/mock/quotation-service-mock';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthenticationServiceMock } from 'src/app/mock/authentication-service-mock';
import { QuotationModel } from 'src/app/model/quotation.model';
import { By } from '@angular/platform-browser';
import { UserModel } from 'src/app/model/user.model';
import { StatusModel } from 'src/app/model/status.model';

describe('OrcamentoDetailComponent', () => {
  describe('given the OrcamentoDetailComponent', () => {
    let component: OrcamentoDetailComponent;
    let fixture: ComponentFixture<OrcamentoDetailComponent>;
    let quotationService: QuotationServiceMock;
    let el: HTMLElement;
    let btn: HTMLElement;
    let quotation: QuotationModel;
    let fb: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OrcamentoDetailComponent ],
        imports: [
          ReactiveFormsModule,
          MatProgressBarModule,
          HttpClientModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QuotationService, useClass: QuotationServiceMock },
          { provide: AuthenticationService, useClass: AuthenticationServiceMock }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(OrcamentoDetailComponent);
      component = fixture.componentInstance;

      quotationService = TestBed.get(QuotationServiceMock);
      quotation = quotationService.get().value;

      component.id = 1;

      fb = TestBed.get(FormBuilder);

      el = fixture.debugElement.query(By.css('form')).nativeElement;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create a orcamentoDetailForm', () => {
      expect(component.orcamentoFormGroup).toBeTruthy();
    })

    it('should register orcamento.id in the orcamentoDetailForm', () => {
      expect(component.orcamentoFormGroup.controls.id.value).toEqual(quotation.id)
    })

    it('should register orcamento.approvalUser in the orcamentoDetailForm', () => {
      expect(component.orcamentoFormGroup.controls.approvalUser.value).toEqual(new UserModel(1));
    })

    it('should register orcamento.approvalDate in the orcamentoDetailForm', () => {
      expect(component.orcamentoFormGroup.controls.approvalDate.value.getTime()).toBeCloseTo(new Date().getTime(), -2)
    })

    it('should load the role',() => {
      expect(component.role).toEqual("admin");
    })

    it('should submit the form when pressing the button', <any>fakeAsync((): void => {
      spyOn(component, 'submitForm');
      fixture.whenStable();
      fixture.detectChanges();
      btn = el.querySelector('#atualizar');
      btn.click();
      tick();
      expect(component.submitForm).toHaveBeenCalledTimes(1);
    }))

  });

  describe('given the OrcamentoDetailComponent has role EQUALS user', () => {
    let component: OrcamentoDetailComponent;
    let fixture: ComponentFixture<OrcamentoDetailComponent>;
    let quotationService: QuotationServiceMock;
    let el: HTMLElement;
    let btn: HTMLElement;
    let quotation: QuotationModel;
    let fb: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OrcamentoDetailComponent ],
        imports: [
          ReactiveFormsModule,
          MatProgressBarModule,
          HttpClientModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QuotationService, useClass: QuotationServiceMock },
          { provide: AuthenticationService, useClass: AuthenticationServiceMock }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(OrcamentoDetailComponent);
      component = fixture.componentInstance;

      quotationService = TestBed.get(QuotationServiceMock);
      quotation = quotationService.get().value;

      component.id = 1;

      fb = TestBed.get(FormBuilder);

      el = fixture.debugElement.query(By.css('form')).nativeElement;

      fixture.detectChanges();
    });

    it('should NOT show the atualizar button', () => {
      component.role = "user";
      fixture.detectChanges();
      btn = el.querySelector('#atualizar')
      expect(btn).toBeNull();
    })

  });

  describe('given the OrcamentoDetailComponent has role NOT user', () => {
    let component: OrcamentoDetailComponent;
    let fixture: ComponentFixture<OrcamentoDetailComponent>;
    let el: HTMLElement;
    let btn: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OrcamentoDetailComponent ],
        imports: [
          ReactiveFormsModule,
          MatProgressBarModule,
          HttpClientModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QuotationService, useClass: QuotationServiceMock },
          { provide: AuthenticationService, useClass: AuthenticationServiceMock }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(OrcamentoDetailComponent);
      component = fixture.componentInstance;

      el = fixture.debugElement.query(By.css('form')).nativeElement;

      fixture.detectChanges();
    });

    it('should show the atualizar button', () => {
      btn = el.querySelector('#atualizar')
      expect(btn).not.toBeNull();
    })

  });

  describe('given the OrcamentoDetailComponent is approved', () => {
    let component: OrcamentoDetailComponent;
    let fixture: ComponentFixture<OrcamentoDetailComponent>;
    let quotationService: QuotationServiceMock;
    let el: HTMLElement;
    let btn: HTMLElement;
    let quotation: QuotationModel;
    let fb: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OrcamentoDetailComponent ],
        imports: [
          ReactiveFormsModule,
          MatProgressBarModule,
          HttpClientModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QuotationService, useClass: QuotationServiceMock },
          { provide: AuthenticationService, useClass: AuthenticationServiceMock }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(OrcamentoDetailComponent);
      component = fixture.componentInstance;

      quotationService = TestBed.get(QuotationServiceMock);
      quotation = quotationService.get().value;

      component.id = 1;

      fb = TestBed.get(FormBuilder);

      el = fixture.debugElement.query(By.css('form')).nativeElement;

      component.status$.next(new StatusModel(2, "APROVADO"))

      fixture.detectChanges();
    });

    it('should show the download button', () => {
      btn = el.querySelector('#download');
      expect(btn).not.toBeNull();
    })

  });

  describe('given the OrcamentoDetailComponent is NOT approved', () => {
    let component: OrcamentoDetailComponent;
    let fixture: ComponentFixture<OrcamentoDetailComponent>;
    let quotationService: QuotationServiceMock;
    let el: HTMLElement;
    let btn: HTMLElement;
    let quotation: QuotationModel;
    let fb: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OrcamentoDetailComponent ],
        imports: [
          ReactiveFormsModule,
          MatProgressBarModule,
          HttpClientModule,
          RouterTestingModule
        ],
        providers: [
          { provide: QuotationService, useClass: QuotationServiceMock },
          { provide: AuthenticationService, useClass: AuthenticationServiceMock }
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(OrcamentoDetailComponent);
      component = fixture.componentInstance;

      quotationService = TestBed.get(QuotationServiceMock);
      quotation = quotationService.get().value;

      component.id = 1;

      fb = TestBed.get(FormBuilder);

      el = fixture.debugElement.query(By.css('form')).nativeElement;

      component.status$.next(new StatusModel(1, "NOVO"))

      fixture.detectChanges();
    });

    it('should NOT show the download button', () => {
      btn = el.querySelector('#download');
      expect(btn).toBeNull();
    })

  });
});

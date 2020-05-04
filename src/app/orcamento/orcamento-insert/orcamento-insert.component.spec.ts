import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrcamentoInsertComponent } from './orcamento-insert.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from 'src/app/service/service.service';
import { ServiceServiceMock } from 'src/app/mock/service-service-mock';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthenticationServiceMock } from 'src/app/mock/authentication-service-mock';
import { QuotationServiceMock } from 'src/app/mock/quotation-service-mock';
import { QuotationModel } from 'src/app/model/quotation.model';
import { UserModel } from 'src/app/model/user.model';
import { StatusModel } from 'src/app/model/status.model';
import { By } from '@angular/platform-browser';
import { ServiceModel } from 'src/app/model/service.model';

describe('OrcamentoInsertComponent', () => {
  let component: OrcamentoInsertComponent;
  let fixture: ComponentFixture<OrcamentoInsertComponent>;
  let el: HTMLElement;
  let btn: HTMLElement;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoInsertComponent ],
      imports: [
        ReactiveFormsModule,
        MatProgressBarModule,
        HttpClientModule
      ],
      providers: [
        { provide: ServiceService, useClass: ServiceServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('form')).nativeElement;

    fb = TestBed.get(FormBuilder);

    spyOn(component, "submitForm");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a orcamentoFormGroup', () => {
    expect(component.orcamentoFormGroup).toBeTruthy();
  })

  it('should load the user from the session', () => {
    expect(component.orcamentoFormGroup.controls.user.value).not.toEqual(new UserModel());
  })

  it('should load the status', () => {
    expect(component.orcamentoFormGroup.controls.status.value).not.toEqual(new StatusModel());
  })

  it('should press the submitForm button if VALID', <any>fakeAsync((): void => {

    component.orcamentoFormGroup.registerControl('services', fb.array([new ServiceModel(1)]));

    fixture.detectChanges();
    btn = el.querySelector('#enviar');
    btn.click();
    tick();
    expect(component.submitForm).toHaveBeenCalledTimes(1);

  }))

  it('should NOT press the submitForm button if INVALID', <any>fakeAsync((): void => {

    fixture.detectChanges();
    component.orcamentoFormGroup.controls.user.setValue(null);
    fixture.detectChanges();
    btn = el.querySelector('#enviar');
    btn.click();
    tick();
    expect(component.submitForm).toHaveBeenCalledTimes(0);

  }))

});

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReparoInsertComponent } from './reparo-insert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthenticationServiceMock } from 'src/app/mock/authentication-service-mock';
import { StatusModel } from 'src/app/model/status.model';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

describe('ReparoInsertComponent', () => {
  let component: ReparoInsertComponent;
  let fixture: ComponentFixture<ReparoInsertComponent>;
  let el: HTMLElement;
  let btn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoInsertComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('form')).nativeElement;

    spyOn(component, "submitForm");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a reparoForm', () => {
    expect(component.reparoFormGroup).toBeTruthy();
  })

  it('should load the user from the session', () => {
    expect(component.reparoFormGroup.controls.user.value).not.toEqual(new UserModel());
  })

  it('should load the status', () => {
    expect(component.reparoFormGroup.controls.status.value).not.toEqual(new StatusModel());
  })

  it('should press the submitForm button if VALID', <any>fakeAsync((): void => {

    fixture.detectChanges();
    btn = el.querySelector('#enviar');
    btn.click();
    tick();
    expect(component.submitForm).toHaveBeenCalledTimes(1);

  }))

  it('should NOT press the submitForm button if INVALID', <any>fakeAsync((): void => {

    fixture.detectChanges();
    component.reparoFormGroup.controls.user.setValue(null);
    fixture.detectChanges();
    btn = el.querySelector('#enviar');
    btn.click();
    tick();
    expect(component.submitForm).toHaveBeenCalledTimes(0);

  }))

});

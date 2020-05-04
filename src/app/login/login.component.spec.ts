import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../service/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatProgressBarModule, MatCardModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AuthenticationServiceMock } from '../mock/authentication-service-mock';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let el: HTMLElement;
  let btn: HTMLElement;
  let usr: HTMLInputElement;
  let pass: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    spyOn(component, 'submitForm');
    fixture.whenStable();

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    el = fixture.debugElement.query(By.css('form')).nativeElement;

    usr = el.querySelector('input[formControlname=username]');
    pass = el.querySelector('input[formControlname=password]');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT press the submitForm button if INVALID', () => {
    fixture.detectChanges();
    btn = el.querySelector('button');
    btn.click();
    expect(component.submitForm).toHaveBeenCalledTimes(0);
  })

  it('should press the submitForm button if VALID', <any>fakeAsync((): void => {

    sendInput(usr,'admin')
    .then(() => {
      fixture.detectChanges();

      sendInput(pass,'teste').then(() => {
        fixture.detectChanges();
        btn = el.querySelector('button');
        btn.click();
        expect(component.submitForm).toHaveBeenCalledTimes(1);
      })
    })

  }))

  function sendInput(field: HTMLInputElement, text: string) {
    field.value = text;
    field.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  it('form should be invalid when empty', () => {
    component.loginFormGroup.controls['username'].setValue('');
    component.loginFormGroup.controls['password'].setValue('');
    expect(component.loginFormGroup.valid).toBeFalsy();
  })

  it('form should be valid when filled', () => {
    component.loginFormGroup.controls['username'].setValue('admin');
    component.loginFormGroup.controls['password'].setValue('admin');
    expect(component.loginFormGroup.valid).toBeTruthy();
  })

});

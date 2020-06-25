import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCrudComponent } from './user-crud.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/service/user.service';
import { UserServiceMock } from 'src/app/mock/user-service-mock';
import { By } from '@angular/platform-browser';

describe('UserCrudComponent', () => {
  let component: UserCrudComponent;
  let fixture: ComponentFixture<UserCrudComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCrudComponent ],
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatRadioModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT press the submitForm button if INVALID', () => {
    fixture.detectChanges();
    spyOn(component, 'submitForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitForm).toHaveBeenCalledTimes(0);
  })

  it('form should be invalid when empty', () => {
    component.userForm.controls['id'].setValue('');
    component.userForm.controls['username'].setValue('');
    component.userForm.controls['profile'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['passwordConfirm'].setValue('');
    component.getUserForm().controls['id'].setValue('');
    component.getUserForm().controls['fullName'].setValue('');
    component.getUserForm().controls['email'].setValue('');
    component.getUserForm().controls['phone'].setValue('');
    component.getUserForm().controls['role'].setValue('');
    expect(component.userForm.valid).toBeFalsy();
  })

  it('form should be invalid when passwords mismatch', () => {
    component.userForm.controls['id'].setValue(1);
    component.userForm.controls['username'].setValue('admin');
    component.userForm.controls['profile'].setValue('admin');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['passwordConfirm'].setValue('diffpassword');
    component.getUserForm().controls['id'].setValue(1);
    component.getUserForm().controls['fullName'].setValue('Teste');
    component.getUserForm().controls['email'].setValue('admin@mail');
    component.getUserForm().controls['phone'].setValue('999999999');
    component.getUserForm().controls['role'].setValue('Administrador');
    component.operacao = 'inserir';
    expect(component.userForm.valid).toBeFalsy();
  })

  it('form should be valid when filled correctly', () => {
    component.userForm.controls['id'].setValue(1);
    component.userForm.controls['username'].setValue('admin');
    component.userForm.controls['profile'].setValue('admin');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['passwordConfirm'].setValue('password');
    component.getUserForm().controls['id'].setValue(1);
    component.getUserForm().controls['fullName'].setValue('Teste');
    component.getUserForm().controls['email'].setValue('admin@mail');
    component.getUserForm().controls['phone'].setValue('999999999');
    component.getUserForm().controls['role'].setValue('Administrador');
    expect(component.userForm.valid).toBeTruthy();
  })

});

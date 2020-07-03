import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserDetailsModel } from '../model/user-details';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { Subject } from 'rxjs';
import { GenericFormService } from '../service/generic-form.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent extends GenericFormService implements OnInit {


  HTTP_HOST = environment.http_host;

  userForm = this._fb.group({});

  id = this._fb.control('');
  username = this._fb.control('', Validators.required);
  fullName = this._fb.control('', Validators.required);
  email = this._fb.control('', [Validators.required, Validators.email]);
  profile = this._fb.control('', Validators.required);
  phone = this._fb.control('', Validators.required);
  role = this._fb.control('', Validators.required);
  changePass = this._fb.control('');

  password = this._fb.control('', [Validators.required, Validators.minLength(8)]);
  passwordConfirm = this._fb.control('', [Validators.required, Validators.minLength(8)]);

  user = new Subject<UserDetailsModel>();

  path: string = 'perfil';

  getUserForm(){
    return this.userForm.controls.user as FormGroup;
  }

  constructor(
    _fb: FormBuilder,
    private _userService: UserService,
    _router: Router,
    private _auth: AuthenticationService) {
      super( _fb, _userService, _router);
      this._userService.getOneUserDetails(this._auth.getId()).subscribe(data =>{
        this.user.next(<UserDetailsModel>data);
        this.barFetch = false;
      });
      this.barFetch = true;
   }

  ngOnInit() {
    this.userForm = this._fb.group({
      id: this.id,
      username: this.username,
      profile: this.profile,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      user: this._fb.group({
        id: this.id,
        fullName : this.fullName,
        email: this.email,
        role: this.role,
        phone: this.phone
      })
    }, {
      validator : this.validateEquals(this.password, this.passwordConfirm)
    })
    this.password.disable();
    this.passwordConfirm.disable();

    this.user.subscribe(user =>{
      this.userForm.controls.id.setValue(user.id);
      this.userForm.controls.username.setValue(user.username);
      this.userForm.controls.profile.setValue(user.profile);
      this.getUserForm().controls.id.setValue(user.id);
      this.getUserForm().controls.fullName.setValue(user.user.fullName);
      this.getUserForm().controls.email.setValue(user.user.email);
      this.getUserForm().controls.phone.setValue(user.user.phone);
      this.getUserForm().controls.role.setValue(user.user.role);
      this.profile.disable();
      this.username.disable();
    })

  }

  checkButton(): boolean {
      return (this.userForm.valid) ? false : true;
  }

  checkPassword(event): void{
    if (!event.checked) {
      this.password.disable();
      this.passwordConfirm.disable();
    } else {
      this.password.enable();
      this.passwordConfirm.enable();
    }
  }

  submitForm(form){

    this.bar = true;

    this._userService.patchUserDetails(form.value)
    .pipe( finalize(() => this.bar = false ))
    .subscribe(
      (() => {
        this.showSuccess();
        this.redirectTo(this.path);
      }),
      ((error) => {
        console.error(error);
        this.showFailure();
        this.error = error;
      })
    )

  }

  validateEquals(field1: AbstractControl, field2: AbstractControl){
    return function(){
      const field1Value = field1.value;
      const field2Value = field2.value;

      if (field1Value !== '' && field1Value !== field2Value) {
        return { 'notMatch': true }
      }
      return null;
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserDetailsModel } from 'src/app/model/user-details';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { GenericFormService, Message } from '../../service/generic-form.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})

export class UserCrudComponent extends GenericFormService implements OnInit, OnDestroy {

  private _subscription: Subscription;

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

  users: UserDetailsModel[];

  selectedUser: UserDetailsModel;

  path: string = 'usuarios';

  getUserForm(){
    return this.userForm.controls.user as FormGroup;
  }

  constructor(
    _fb: FormBuilder,
    private _userService: UserService,
    _router: Router,
    private _auth: AuthenticationService) {
      super( _fb, _userService, _router);
      this._subscription = this._userService.getUsersDetails().subscribe(data =>{
        this.users = <UserDetailsModel[]>data;
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
    this.selectControl.disable();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  checkButton(): boolean {
    if (this.operacao === 'inserir'){
      return this.userForm.valid ? false : true;
    } else {
      return (this.userForm.valid && this.selectedUser) ? false : true;
    }
  }

  isMe(): boolean {
     return Math.floor(this._auth.getId()) === this.id.value ? true : false;
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

  radioSelect(){
    if (this.isInserir()){
      this.userForm.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
      this.password.enable();
      this.passwordConfirm.enable();
    } else {
      this.selectControl.enable();
      this.userForm.reset();
      this.password.disable();
      this.passwordConfirm.disable();
    }
  }

  selected(event){
    this.selectedUser = this.getUserById(parseInt(event.value));
    this.userForm.controls.id.setValue(this.selectedUser.id);
    this.userForm.controls.username.setValue(this.selectedUser.username);
    this.userForm.controls.profile.setValue(this.selectedUser.profile);
    this.getUserForm().controls.id.setValue(this.selectedUser.id);
    this.getUserForm().controls.fullName.setValue(this.selectedUser.user.fullName);
    this.getUserForm().controls.email.setValue(this.selectedUser.user.email);
    this.getUserForm().controls.phone.setValue(this.selectedUser.user.phone);
    this.getUserForm().controls.role.setValue(this.selectedUser.user.role);
  }

  getUserById(id: number){
    return this.users.find(eq => eq.id === id)
  }


  submitForm(form){

    this.bar = true;

    if (this.isAtualizar()) {

      if (this.changePass.value){
        this._userService.resetUser(form.value)
        .pipe( finalize(() => this.bar = false ))
        .subscribe(
          ((message: Message) => {
            if (message && message.warning) this.showWarning(message.warning);
            this.showSuccess();
          }),
          ((error) => {
            console.error(error);
            this.showFailure(error);
            this.error = error;
          })
        )
      }

      this._userService.patchUserDetails(form.value)
      .pipe( finalize(() => this.bar = false ))
      .subscribe(
        ((message: Message) => {
          if (message && message.warning) this.showWarning(message.warning);
          this.showSuccess();
          this.redirectTo(this.path);
        }),
        ((error) => {
          console.error(error);
          this.showFailure(error);
          this.error = error;
        })
      )
    } else {

      this._userService.postUserDetails(form.value)
      .pipe( finalize(() => this.bar = false ))
      .subscribe(
        ((message: Message) => {
          if (message && message.warning) this.showWarning(message.warning);
          this.showSuccess();
          this.redirectTo(this.path);
        }),
        ((error) => {
          console.error(error);
          this.showFailure(error);
        })
      )
    }

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


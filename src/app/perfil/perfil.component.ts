import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserDetailsModel } from '../model/user-details';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {


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
  message: string;
  bar: boolean;
  barFetch: boolean;
  error: string;

  getUserForm(){
    return this.userForm.controls.user as FormGroup;
  }

  constructor(
      private _fb: FormBuilder,
      private _http: UserService,
      private _auth: AuthenticationService) {
    this._http.getOneUserDetails(this._auth.getId()).subscribe(data =>{
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

  // ngAfterViewInit(){
  //   setTimeout(() => {
  //     this.userForm.controls.id.setValue(this.user.id);
  //     this.userForm.controls.username.setValue(this.user.username);
  //     this.userForm.controls.profile.setValue(this.user.profile);
  //     this.getUserForm().controls.id.setValue(this.user.id);
  //     this.getUserForm().controls.fullName.setValue(this.user.user.fullName);
  //     this.getUserForm().controls.email.setValue(this.user.user.email);
  //     this.getUserForm().controls.phone.setValue(this.user.user.phone);
  //     this.getUserForm().controls.role.setValue(this.user.user.role);
  //     this.profile.disable();
  //     this.username.disable();
  //   }, 1000);
  // }

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

  postSubscription: Subscription;

  submitForm(){

    this.postSubscription =
      this._http.patchUserDetails(this.userForm.value)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/perfil`,"_self");
          }, 2000);
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.error = error;
          this.bar = false;
        })
      )


    this.bar = true;
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 3000);
    this.message = m;
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

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { UserDetailsModel } from 'src/app/model/user-details';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  userForm = this._fb.group({});

  operacao: string = "inserir";
  selectControl = this._fb.control('');

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
    this._http.getUsersDetails().subscribe(data =>{
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

  isInserir(): boolean {
    return this.operacao === 'inserir'
  }

  isAtualizar(): boolean {
    return this.operacao === 'atualizar'
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

  postSubscription: Subscription;

  submitForm(){

    if (this.isAtualizar()) {

      if (this.changePass){
        this.postSubscription =
        this._http.resetUser(this.userForm.value)
        .subscribe(
          ((response) => {
            this.setMessage('sucesso');
          }),
          ((error) => {
            console.error(error);
            this.setMessage('erro');
            this.error = error;
          })
        )
      }

      this.postSubscription =
        this._http.patchUserDetails(this.userForm.value)
        .subscribe(
          ((response) => {
            this.setMessage('sucesso');
            this.bar = false;
            setTimeout(() => {
              window.open(`${this.HTTP_HOST}/usuarios`,"_self");
            }, 2000);
          }),
          ((error) => {
            console.error(error);
            this.setMessage('erro');
            this.error = error;
            this.bar = false;
          })
        )
    } else {

      this.postSubscription =
      this._http.postUserDetails(this.userForm.value)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/usuarios`,"_self");
          }, 2000);
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
        })
      )
    }

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


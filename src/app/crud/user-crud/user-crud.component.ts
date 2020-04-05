import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';
import { QuotationService } from 'src/app/service/quotation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  userForm = this._fb.group({});

  operacao = this._fb.control('');
  selectControl = this._fb.control('');

  id = this._fb.control('');
  username = this._fb.control('', Validators.required);
  fullName = this._fb.control('', Validators.required);
  email = this._fb.control('', [Validators.required, Validators.email]);
  profile = this._fb.control('', Validators.required);
  phone = this._fb.control('', Validators.required);
  role = this._fb.control('', Validators.required);
  password = this._fb.control('');

  users: UserModel[];

  selectedUser: UserModel;
  message: string;
  bar: boolean;

  constructor(private _fb: FormBuilder, private _http: QuotationService) {
    this._http.getUsers().subscribe(data =>{
      this.users = <UserModel[]>data;
    })
   }

  ngOnInit() {
    this.userForm = this._fb.group({
      id: this.id,
      username: this.username,
      fullName : this.fullName,
      email: this.email,
      profile: this.profile,
      phone: this.phone,
      role: this.role
    })
    this.operacao.setValue("inserir");
    this.selectControl.disable();
  }

  checkButton(): boolean {
    if (this.operacao.value === 'inserir'){
      return this.userForm.valid ? false : true;
    } else {
      return (this.userForm.valid && this.selectedUser) ? false : true;
    }
  }

  radioSelect(){
    if (this.operacao.value === 'inserir'){
      this.userForm.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }

  selected(event){
    this.selectedUser = this.getUserById(parseInt(event.value));
    this.userForm.controls.id.setValue(this.selectedUser.id);
    this.userForm.controls.username.setValue(this.selectedUser.username);
    this.userForm.controls.fullName.setValue(this.selectedUser.fullName);
    this.userForm.controls.email.setValue(this.selectedUser.email);
    this.userForm.controls.profile.setValue(this.selectedUser.profile);
    this.userForm.controls.phone.setValue(this.selectedUser.phone);
    this.userForm.controls.role.setValue(this.selectedUser.role);
  }

  getUserById(id: number){
    return this.users.find(eq => eq.id === id)
  }

  postSubscription: Subscription;

  submitForm(){

    // if (this.operacao.value === 'atualizar') {

    //   this.postSubscription =
    //     this._http.patchUser(this.userForm.value)
    //     .subscribe(
    //       ((response) => {
    //         this.setMessage('sucesso');
    //         this.bar = false;
    //         setTimeout(() => {
    //           window.open(`${this.HTTP_HOST}/users`,"_self");
    //         }, 2000);
    //       }),
    //       ((error) => {
    //         console.error(error);
    //         this.setMessage('erro');
    //         this.bar = false;
    //       })
    //     )
    // } else {

    //   this.postSubscription =
    //   this._http.setUser(this.userForm.value)
    //   .subscribe(
    //     ((response) => {
    //       this.setMessage('sucesso');
    //       this.bar = false;
    //       setTimeout(() => {
    //         window.open(`${this.HTTP_HOST}/users`,"_self");
    //       }, 2000);
    //     }),
    //     ((error) => {
    //       console.error(error);
    //       this.setMessage('erro');
    //       this.bar = false;
    //     })
    //   )
    // }

    // this.bar = true;

    console.log(this.userForm.value)
    if (this.password.value){
      console.log("a")
    }

  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 5000);
    this.message = m;
  }

}

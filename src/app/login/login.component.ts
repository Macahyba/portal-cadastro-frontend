import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['',Validators.required]
  });

  bar: boolean;
  message: string;
  error: string;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _auth: AuthenticationService) { }

  ngOnInit() {
  }

  checkButton(){
    return this.loginFormGroup.valid ? false : true;
  }

  postSubscription: Subscription;

  submitForm() {
    this.postSubscription =
    this._auth.authenticate(this.loginFormGroup.value.username, this.loginFormGroup.value.password)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            this._router.navigateByUrl('/orcamentos');
          }, 1000);
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.error = error;
          this.bar = false;
          this.loginFormGroup.reset();
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

}

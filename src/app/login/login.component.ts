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

  message: string;

  constructor(private _fb: FormBuilder, private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() {
  }

  checkValid(){
    return this.loginFormGroup.valid ? false : true;
  }

  postSubscription: Subscription;

  submitForm(){

    this.postSubscription =
      this._auth.authenticate(this.loginFormGroup.value.username, this.loginFormGroup.value.password)
      .subscribe(
        ((response) => {
          this._router.navigate(['/orcamentos']);

        }),
        ((error) =>{
          this.setMessage('erro');
          sessionStorage.clear()
        })
      )
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 5000);
    this.message = m;
  }

}

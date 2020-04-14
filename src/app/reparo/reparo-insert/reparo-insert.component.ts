import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RepairService } from 'src/app/service/repair.service';
import { StatusModel } from 'src/app/model/status.model';
import { UserModel } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-reparo-insert',
  templateUrl: './reparo-insert.component.html',
  styleUrls: ['./reparo-insert.component.scss']
})
export class ReparoInsertComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  reparoFormGroup : FormGroup;

  creationDate: Date;
  status : StatusModel = new StatusModel(1);
  user : UserModel = new UserModel(this._auth.getId());
  message: string;
  bar: boolean;
  error: string;

  constructor(private _http: RepairService , private _auth: AuthenticationService) {
    this.reparoFormGroup = new FormGroup({
      user: new FormControl(this.user),
      status: new FormControl(this.status)
    });
   }

  ngOnInit() {
  }

  postSubscription: Subscription;

  submitForm() {
    this.postSubscription =
      this._http.postRepair(this.reparoFormGroup.value)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/reparos`,"_self");
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

  checkValid(){
    return this.reparoFormGroup.valid ? false : true;
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 3000);
    this.message = m;
  }
}

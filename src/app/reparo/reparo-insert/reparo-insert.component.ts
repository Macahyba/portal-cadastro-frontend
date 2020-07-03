import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RepairService } from 'src/app/service/repair.service';
import { StatusModel } from 'src/app/model/status.model';
import { UserModel } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { GenericFormService } from 'src/app/service/generic-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reparo-insert',
  templateUrl: './reparo-insert.component.html',
  styleUrls: ['./reparo-insert.component.scss']
})
export class ReparoInsertComponent extends GenericFormService implements OnInit {

  HTTP_HOST = environment.http_host;

  reparoFormGroup : FormGroup;

  creationDate: Date;
  status : StatusModel = new StatusModel(1);
  user : UserModel = new UserModel(this._authenticationService.getId());

  path: string = 'reparos';

  constructor(
    private _repairService: RepairService ,
    private _authenticationService: AuthenticationService,
    _fb: FormBuilder,
    _router: Router) {
      super(_fb, _repairService, _router);
      this.reparoFormGroup = this._fb.group({
        user: this._fb.control(this.user, Validators.required),
        status: this._fb.control(this.status, Validators.required),
        active: this._fb.control(true)
      });
    }

  ngOnInit() {
  }

  submitForm(form) {

    this.postForm(form.value);
  }

  checkValid(){
    return this.reparoFormGroup.valid ? false : true;
  }

}

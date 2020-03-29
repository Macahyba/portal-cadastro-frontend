import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RepairService } from 'src/app/service/repair.service';
import { StatusModel } from 'src/app/model/status.model';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-reparo-insert',
  templateUrl: './reparo-insert.component.html',
  styleUrls: ['./reparo-insert.component.scss']
})
export class ReparoInsertComponent implements OnInit {

  creationDate = new FormControl(new Date());
  sapNotification = new FormControl('', Validators.required);
  notaDeEntrada = new FormControl('', Validators.required);
  warranty = new FormControl('');
  status : StatusModel = new StatusModel(1);
  user : UserModel = new UserModel(1);
  message: string;
  bar: boolean;

  reparoFormGroup : FormGroup;

  // get customerFormGroup() {
  //   return this.reparoFormGroup;
  // }

  // get equipmentFormGroup() {
  //   return this.reparoFormGroup;
  // }

  // get dateFormGroup(){
  //   return this.reparoFormGroup;
  // }

  constructor(private _http: RepairService , private fb: FormBuilder, private _ref: ChangeDetectorRef) {
    this.reparoFormGroup = this.fb.group({
      'creationDate' : this.creationDate,
      'sapNotification' : this.sapNotification,
      'notaDeEntrada' : this.notaDeEntrada,
      'warranty' : this.warranty,
      'user': this.user,
      'status': this.status
    });
   }

  ngOnInit() {
  }

  postSubscription: Subscription;

  submitForm() {
    console.log(this.reparoFormGroup.getRawValue());
    this.postSubscription =
      this._http.setRepair(this.reparoFormGroup.getRawValue())
      .subscribe(
        ((response) => {
          console.log(response);
          this.setMessage('sucesso');
          this.bar = false;
          window.open('http://localhost:4200/reparos',"_self");
          this._ref.detectChanges();
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
          this._ref.detectChanges();
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
    }, 5000);
    this.message = m;
  }

}

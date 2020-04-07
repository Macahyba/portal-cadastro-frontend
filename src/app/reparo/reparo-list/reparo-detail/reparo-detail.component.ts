import { Component, OnInit } from '@angular/core';
import { RepairService } from 'src/app/service/repair.service';
import { RepairModel } from 'src/app/model/repair.model';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { FormBuilder } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Subscription } from 'rxjs';
import { StatusModel } from 'src/app/model/status.model';

@Component({
  selector: 'app-reparo-detail',
  templateUrl: './reparo-detail.component.html',
  styleUrls: ['./reparo-detail.component.scss']
})
export class ReparoDetailComponent implements OnInit {

  id: string;
  repair: RepairModel;
  customer: CustomerModel;
  contact: ContactModel;
  equipment: EquipmentModel;
  sapNotification: string;
  notaDeEntrada: string;
  notaFiscal: string;
  warranty: boolean;
  repairFups: RepairFupModel[];
  status: StatusModel;
  bar: boolean;
  message: string;
  repairFormGroup;

  step = null;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  approvalUser : UserModel = new UserModel(this._auth.getId());

  constructor(
              private _http: RepairService,
              private _route: ActivatedRoute,
              private _fb: FormBuilder,
              private _auth: AuthenticationService) {
    this._route.params.subscribe( params => this.id = params.id );
    this._http.getOneRepair(this.id).subscribe(data =>{
      this.repair = <RepairModel>data;
      this.customer = this.repair.customer;
      this.contact = this.repair.contact;
      this.equipment = this.repair.equipment;
      this.sapNotification = this.repair.sapNotification;
      this.notaDeEntrada = this.repair.notaDeEntrada;
      this.notaFiscal = this.repair.notaFiscal;
      this.warranty = this.repair.warranty;
      this.repairFups = this.repair.repairFups;
    })
   }

  ngOnInit() {
    this.repairFormGroup = this._fb.group({
      id: this._fb.control(this.id),
      approvalUser: this._fb.control(this.approvalUser)
     })
  }

  postSubscription: Subscription;

  submitForm(){
    this.postSubscription =
      this._http.patchRepair(this.repairFormGroup.value)
      .subscribe(
        ((response) => {
          const quo = <RepairModel>response;
          this.status = quo.status;
          this.setMessage('sucesso');
          this.bar = false;
          location.reload();
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
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

}

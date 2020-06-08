import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RepairService } from 'src/app/service/repair.service';
import { RepairModel } from 'src/app/model/repair.model';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { FormBuilder, Validators } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { StatusModel } from 'src/app/model/status.model';

@Component({
  selector: 'app-reparo-detail',
  templateUrl: './reparo-detail.component.html',
  styleUrls: ['./reparo-detail.component.scss']
})
export class ReparoDetailComponent implements OnInit {

  id: number;
  repair: RepairModel;
  customer$ = new BehaviorSubject<CustomerModel>(new CustomerModel());
  contact$ = new BehaviorSubject<ContactModel>(new ContactModel());
  equipment$ = new BehaviorSubject<EquipmentModel>(new EquipmentModel());
  sapNotification$ = new BehaviorSubject<string>("");
  notaDeEntrada$ = new BehaviorSubject<String>("");
  notaFiscal$ = new BehaviorSubject<string>("");
  warranty$ = new BehaviorSubject<boolean>(false);
  repairFups$ = new Subject<RepairFupModel[]>();
  status$ = new BehaviorSubject<StatusModel>(new StatusModel());
  role: string;
  bar: boolean;
  barFetch: boolean;
  message: string;
  repairFormGroup;
  error: string;

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

  constructor(
              private _http: RepairService,
              private _route: ActivatedRoute,
              private _fb: FormBuilder,
              private _auth: AuthenticationService,
              private _cdr: ChangeDetectorRef) {
    this._route.params.subscribe( params => this.id = params.id );

    this._http.getOneRepair(this.id).subscribe(data =>{
      this.repair = <RepairModel>data;
      this.customer$.next(this.repair.customer);
      this.contact$.next(this.repair.contact);
      this.equipment$.next(this.repair.equipment);
      this.sapNotification$.next(this.repair.sapNotification);
      this.notaDeEntrada$.next(this.repair.notaDeEntrada);
      this.notaFiscal$.next(this.repair.notaFiscal);
      this.warranty$.next(this.repair.warranty);
      this.repairFups$.next(this.repair.repairFups);
      this.status$.next(this.repair.status);
      this.barFetch = false;
    });
    this.barFetch = true;
   }

  ngOnInit() {
    this.repairFormGroup = this._fb.group({
      id: this._fb.control(this.id, Validators.required),
    })
    this.role = this._auth.getRole();
    this._cdr.detectChanges();
  }

  postSubscription: Subscription;

  submitForm(){
    this.postSubscription =
      this._http.patchRepair(this.repairFormGroup.value)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          location.reload();
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

}

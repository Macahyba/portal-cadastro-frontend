import { Component, OnInit } from '@angular/core';
import { RepairService } from 'src/app/service/repair.service';
import { RepairModel } from 'src/app/model/repair.model';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { FormGroup } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';

@Component({
  selector: 'app-reparo-detail',
  templateUrl: './reparo-detail.component.html',
  styleUrls: ['./reparo-detail.component.scss']
})
export class ReparoDetailComponent implements OnInit {

  repairFormGroup = new FormGroup({});

  // get customerFormGroup() {
  //   return this.repairFormGroup;
  // }

  // get equipmentFormGroup() {
  //   return this.repairFormGroup;
  // }

  get dateFormGroup(){
    return this.repairFormGroup;
  }

  constructor(private _http: RepairService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.id = params.id );
    this._http.getOneRepair(this.id).subscribe(data =>{
      this.repair = <RepairModel>data;
      this.customer = this.repair.customer;
      this.contact = this.repair.contact;
      this.equipment = this.repair.equipment;
      this.sapNotification = this.repair.sapNotification;
      this.notaDeEntrada = this.repair.notaDeEntrada;
      this.warranty = this.repair.warranty;
      this.repairFups = this.repair.repairFups;

    })
   }

  id: string;
  repair: RepairModel;
  customer: CustomerModel;
  contact: ContactModel;
  equipment: EquipmentModel;
  sapNotification: string;
  notaDeEntrada: string;
  warranty: boolean;
  repairFups: RepairFupModel[];

  ngOnInit() {
    setTimeout(() => {},)
  }

}

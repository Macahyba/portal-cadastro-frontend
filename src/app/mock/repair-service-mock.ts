import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepairModel } from '../model/repair.model';
import { RepairFupModel } from '../model/repair-fup.model';
import { StatusModel } from '../model/status.model';
import { UserModel } from '../model/user.model';
import { SparePartModel } from '../model/spare-part.model';
import { EquipmentModel } from '../model/equipament.model';
import { CustomerModel } from '../model/customer.model';
import { ContactModel } from '../model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class RepairServiceMock {

  status1 = new StatusModel(1, "status1");
  status2 = new StatusModel(2, "status2");

  user1 = new UserModel(1, "test user1", "test1@mail", "Boss", "99999999");
  user2 = new UserModel(2, "test user2", "test2@mail", "User", "88888888");

  spareParts1 = [
    new SparePartModel(1, "partNumber1"),
    new SparePartModel(2, "partNumber2")
  ]

  spareParts2 = [
    new SparePartModel(3, "partNumber3"),
    new SparePartModel(4, "partNumber4")
  ]

  spareParts3 = [
    new SparePartModel(5, "partNumber5"),
    new SparePartModel(6, "partNumber6")
  ]

  spareParts4 = [
    new SparePartModel(7, "partNumber7"),
    new SparePartModel(8, "partNumber8")
  ]

  equipment1 = new EquipmentModel(1, "name1", "serialNumber1");
  equipment2 = new EquipmentModel(2, "name2", "serialNumber2");

  repairFup1 = new RepairFupModel(1, new Date(2020,3,2), "description1", this.user1, this.spareParts1, this.equipment1);
  repairFup2 = new RepairFupModel(2, new Date(2020,3,3), "description2", this.user2, this.spareParts2, this.equipment1);
  repairFup3 = new RepairFupModel(3, new Date(2020,4,2), "description3", this.user1, this.spareParts3, this.equipment2);
  repairFup4 = new RepairFupModel(4, new Date(2020,4,3), "description4", this.user2, this.spareParts4, this.equipment2);

  contacts1 = [
    new ContactModel(1, "name1", "email1@mail", "depto1"),
    new ContactModel(2, "name2", "email2@mail", "depto2"),
  ]

  contacts2 = [
    new ContactModel(3, "name3", "email3@mail", "depto3"),
    new ContactModel(4, "name4", "email4@mail", "depto4"),
  ]

  customer1 = new CustomerModel(1, "name1", "fullName1", "cnpj1", this.contacts1);
  customer2 = new CustomerModel(2, "name2", "fullName2", "cnpj2", this.contacts2);

  getNotaDeEntrada(): BehaviorSubject<string> {
    return new BehaviorSubject<string>("999999");
  }

  getSapNotification(): BehaviorSubject<string> {
    return new BehaviorSubject<string>("888888");
  }

  getNotaFiscal(): BehaviorSubject<string> {
    return new BehaviorSubject<string>("777777");
  }

  getWarranty(): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(true);
  }

  getRepairs(): BehaviorSubject<RepairModel[]> {

    const repairFups1 = [this.repairFup1, this.repairFup2];
    const repairFups2 = [this.repairFup3, this.repairFup4];

    const repairs = [
      new RepairModel(1, new Date(2020,3,1), new Date(2020,3,10), "sapNotification1", true, "notaFiscal1", 10,
                        this.status1, "notaDeEntrada1", repairFups1, this.user1, this.equipment1, this.customer1, this.contacts1[0]),
      new RepairModel(2, new Date(2020,4,1), new Date(2020,4,10), "sapNotification2", false, "notaFiscal2", 20,
                        this.status2, "notaDeEntrada2", repairFups2, this.user2, this.equipment2, this.customer2, this.contacts2[0])
    ]

    return new BehaviorSubject<RepairModel[]>(repairs);
  }

  getOneRepair(): BehaviorSubject<RepairFupModel>{

    const repairFups1 = [this.repairFup1, this.repairFup2];

    const repair = new RepairModel(1, new Date(2020,3,1), new Date(2020,3,10), "sapNotification1", true, "notaFiscal1", 10,
                        this.status1, "notaDeEntrada1", repairFups1, this.user1, this.equipment1, this.customer1, this.contacts1[0]);

    return new BehaviorSubject<RepairModel>(repair);

  }

  getRepairFup(): RepairFupModel {

    return this.repairFup1;
  }

  getRepairFups(): BehaviorSubject<RepairFupModel[]> {

    const repairFups = [this.repairFup1, this.repairFup2];

    return new BehaviorSubject<RepairFupModel[]>(repairFups);
  }
}


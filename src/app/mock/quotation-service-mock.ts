import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuotationModel } from '../model/quotation.model';
import { StatusModel } from '../model/status.model';
import { UserModel } from '../model/user.model';
import { EquipmentModel } from '../model/equipament.model';
import { ContactModel } from '../model/contact.model';
import { CustomerModel } from '../model/customer.model';
import { ServiceModel } from '../model/service.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationServiceMock {

  status1 = new StatusModel(1, "status1");
  status2 = new StatusModel(2, "status2");

  user1 = new UserModel(1, "test user1", "test1@mail", "Boss", "99999999");
  user2 = new UserModel(2, "test user2", "test2@mail", "User", "88888888");

  equipment1 = new EquipmentModel(1, "name1", "serialNumber1");
  equipment2 = new EquipmentModel(2, "name2", "serialNumber2")

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

  getDiscount(): BehaviorSubject<number>{
    return new BehaviorSubject<number>(10);
  }

  getTotalPrice(): number{
    return 100;
  }

  getQuotations(): BehaviorSubject<QuotationModel[]>{

    let services1 = new Set();
    services1.add(new ServiceModel(1, "service1", "description1", 100));
    services1.add(new ServiceModel(2, "service2", "description2", 200));

    let services2 = new Set();
    services2.add(new ServiceModel(3, "service3", "description3", 300));
    services2.add(new ServiceModel(4, "service4", "description4", 400));

    const quotations = [
      new QuotationModel(1, "label1", 100, 10, this.status1, new Date(2020,1,1),new Date(2020,1,2),
                            this.user1, this.equipment1, this.customer1, this.contacts1[0], this.user1, services1),
      new QuotationModel(2, "label2", 200, 20, this.status2, new Date(2020,2,1),new Date(2020,2,2),
                            this.user2, this.equipment2, this.customer2, this.contacts2[0], this.user2, services2)
    ]

    return new BehaviorSubject<QuotationModel[]>(quotations);
  }

  getOneQuotation(): BehaviorSubject<QuotationModel>{
    let services1 = new Set();
    services1.add(new ServiceModel(1, "service1", "description1", 100));
    services1.add(new ServiceModel(2, "service2", "description2", 200));

    const quotation = new QuotationModel(1, "label1", 100, 10, this.status1, new Date(2020,1,1),new Date(2020,1,2),
                            this.user1, this.equipment1, this.customer1, this.contacts1[0], this.user1, services1);

    return new BehaviorSubject<QuotationModel>(quotation);

  }

  downloadCsv() {
    return true;
  }

}

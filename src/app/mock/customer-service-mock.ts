import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerModel } from '../model/customer.model';
import { ContactModel } from '../model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceMock {

  getCustomers(): BehaviorSubject<CustomerModel[]> {

    const contacts1 = [
      new ContactModel(1, "name1", "email1@mail", "depto1"),
      new ContactModel(2, "name2", "email2@mail", "depto2"),
    ];

    const contacts2 = [
      new ContactModel(3, "name3", "email3@mail", "depto3"),
      new ContactModel(4, "name4", "email4@mail", "depto4"),
    ];

    const customers = [
      new CustomerModel(1, "name1", "fullName1", "cnpj1", contacts1),
      new CustomerModel(1, "name1", "fullName1", "cnpj2", contacts2)
    ];

    return new BehaviorSubject<CustomerModel[]>(customers);
  }

  getCustomer(): BehaviorSubject<CustomerModel> {

    const contacts1 = [
      new ContactModel(1, "name1", "email1@mail", "depto1"),
      new ContactModel(2, "name2", "email2@mail", "depto2"),
    ];

    const customer = new CustomerModel(1, "name1", "fullName1", "cnpj1", contacts1);

    return new BehaviorSubject<CustomerModel>(customer);
  }

  getContact(): BehaviorSubject<ContactModel>{

    const contact = new ContactModel(1, "name1", "email1@mail", "depto1");

    return new BehaviorSubject<ContactModel>(contact);
  }

}

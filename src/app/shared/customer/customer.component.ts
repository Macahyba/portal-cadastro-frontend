import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/model/customer.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QuotationService } from 'src/app/service/quotation.service';
import { ContactModel } from 'src/app/model/contact.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: CustomerModel[];
  customerName = new FormControl();
  customerFullName = new FormControl();
  customerCnpj = new FormControl();
  filteredCustomer: Observable<CustomerModel[]>;
  selectedCustomer: CustomerModel = new CustomerModel();

  contacts: ContactModel[];
  contactName = new FormControl();
  contactDept = new FormControl();
  contactEmail = new FormControl();
  filteredContact: Observable<ContactModel[]>;
  selectedContact: ContactModel = new ContactModel();

  constructor(private _http: QuotationService) { }

  ngOnInit() {

    this._http.getCustomers().subscribe(data =>{
      this.customers = <CustomerModel[]>data;

      this.filteredCustomer = this.customerName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ); 

    })         

  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? customer.name : '';
  }

  private _filter(name: any): CustomerModel[] {
    const filterValue = name.name ? name.name.toLowerCase() : name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }  

  selectCustomer(customer){
    if (customer instanceof Object){
      this.selectedCustomer = customer;

      this.filteredContact = customer.contacts;      
      this.customerFullName.disable();
      this.customerCnpj.disable();

    } else {

      this.selectedCustomer = new CustomerModel();
      this.selectedContact = new ContactModel();
      this.customerFullName.disable();
      this.customerCnpj.disable();
      this.contactName.setValue("");

    }
    
  }

  selectContact(contact){

    if(contact instanceof Object){

      this.selectedContact = contact;
      this.contactDept.disable();
      this.contactEmail.disable();
    } else {

      this.selectedContact = new ContactModel();   
      this.contactDept.enable();
      this.contactEmail.enable();
    }

  }

}

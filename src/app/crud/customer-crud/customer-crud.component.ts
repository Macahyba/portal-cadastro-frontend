import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerModel } from 'src/app/model/customer.model';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContactModel } from 'src/app/model/contact.model';
import { CustomerService } from 'src/app/service/customer.service';
import { Router } from '@angular/router';
import { GenericFormService } from '../../service/generic-form.service';

@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.scss']
})
export class CustomerCrudComponent extends GenericFormService implements OnInit, OnDestroy {

  private _subscription: Subscription;

  HTTP_HOST = environment.http_host;

  customerForm = this._fb.group({});

  customers: CustomerModel[];
  contacts: ContactModel[];

  selectedCustomer$ = new BehaviorSubject<CustomerModel>(new CustomerModel());
  selectedContact$ = new BehaviorSubject<ContactModel>(new ContactModel());

  path: string = 'clientes';

  constructor(
    _fb: FormBuilder,
    private _customerService: CustomerService,
    _router: Router,
    private _cdr: ChangeDetectorRef) {
      super( _fb, _customerService, _router)
    }

  ngOnInit() {
    this._subscription = this._customerService.getAll().subscribe(data =>{
      this.customers = <CustomerModel[]>data;
      this.barFetch = false;
    })
    this.barFetch = true;
    this.selectControl.disable();
    this._cdr.detectChanges();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  customerSelect(event){
    const customer = this.getCustomerById(parseInt(event.value));
    this.contacts = customer.contacts;
    this.selectedCustomer$.next(customer);
    if (this.contacts.length > 0) this.selectedContact$.next(this.contacts[0]);
  }

  contactSelect(event){
    if (this.selectedCustomer$) this.selectedContact$.next(this.getContactById(parseInt(event.value)));
  }

  getCustomerById(id: number): CustomerModel{
    return this.customers.find(cs => cs.id === id)
  }

  getContactById(id: number): ContactModel{
    return this.contacts.find(co => co.id === id)
  }

  checkButton(): boolean {
    if (this.operacao === 'inserir'){
      return this.customerForm.valid ? false : true;
    } else {
      return (this.customerForm.valid
        && this.selectedCustomer$ && this.selectedContact$) ? false : true;
    }
  }

  submitForm(form){

    let sendForm: CustomerModel = form.value.customer;
    sendForm.contacts = [form.value.contact];

    this.isAtualizar() ? this.patchForm(sendForm) : this.postForm(sendForm)
  }
}

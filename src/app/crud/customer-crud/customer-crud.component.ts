import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuotationService } from 'src/app/service/quotation.service';
import { CustomerModel } from 'src/app/model/customer.model';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactModel } from 'src/app/model/contact.model';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.scss']
})
export class CustomerCrudComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  customerForm = this._fb.group({});

  operacao = this._fb.control('');
  selectControl = this._fb.control('');

  customers: CustomerModel[];
  contacts: ContactModel[];

  selectedCustomer: CustomerModel;
  selectedContact: ContactModel;
  message: string;
  bar: boolean;

  constructor(private _fb: FormBuilder, private _http: QuotationService, private _stor: StorageService) { }

  ngOnInit() {
    this._http.getCustomers().subscribe(data =>{
      this.customers = <CustomerModel[]>data;
    })
    this.operacao.setValue("inserir");
    this.selectControl.disable();
  }

  customerSelect(event){
    this.selectedCustomer = this.getCustomerById(parseInt(event.value));
    this.contacts = this.selectedCustomer.contacts;
  }

  contactSelect(event){
    this.selectedContact = this.getContactById(parseInt(event.value));
  }

  getCustomerById(id: number): CustomerModel{
    return this.customers.find(cs => cs.id === id)
  }

  getContactById(id: number): ContactModel{
    return this.contacts.find(co => co.id === id)
  }

  checkButton(): boolean {
    if (this.operacao.value === 'inserir'){
      return this.customerForm.valid ? false : true;
    } else {
      return (this.customerForm.valid
        && this.selectedCustomer && this.selectedContact) ? false : true;
    }
  }

  postSubscription: Subscription;

  submitForm(){

    let sendForm: CustomerModel = this.customerForm.value.customer;
    sendForm.contacts = [this.customerForm.value.contact];

    if (this.operacao.value === 'atualizar') {

      this.postSubscription =
        this._http.patchCustomer(sendForm)
        .subscribe(
          ((response) => {
            this.setMessage('sucesso');
            this.bar = false;
            setTimeout(() => {
              window.open(`${this.HTTP_HOST}/clientes`,"_self");
            }, 2000);
          }),
          ((error) => {
            console.error(error);
            this.setMessage('erro');
            this.bar = false;
          })
        )
    } else {

      this.postSubscription =
      this._http.setCustomer(sendForm)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/clientes`,"_self");
          }, 2000);
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
        })
      )
    }

    this.bar = true;
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 5000);
    this.message = m;
  }

  radioSelect(){
    if (this.operacao.value === 'inserir'){
      this.customerForm.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }
}

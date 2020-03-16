import { Component, OnInit, Input,  AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CustomerModel } from 'src/app/model/customer.model';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { QuotationService } from 'src/app/service/quotation.service';
import { ContactModel } from 'src/app/model/contact.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  @Input() disabled: string;
  @Input() injectedCustomer: CustomerModel;
  @Input() injectedContact: ContactModel;
  @Input() customerFormGroup: FormGroup;


  customerGroup : FormGroup;
  id = new FormControl('');
  name = new FormControl('', Validators.required);
  fullName = new FormControl('', Validators.required);
  cnpj = new FormControl('', Validators.required);

  cId = new FormControl('');
  cName = new FormControl('', Validators.required);
  contactGroup = new FormGroup({
    id : this.cId,
    name : this.cName,
    department : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required)
  })


  get customerForm() : FormGroup {
    return this.customerFormGroup.controls.customer as FormGroup;
  }

  get contactsForm() : FormGroup {
    return this.customerForm.controls.contacts as FormGroup;
  }

  contacts: ContactModel[];

  clientAutoComplete = new FormControl('');
  contactAutoComplete = new FormControl('');

  customers: CustomerModel[];

  filteredCustomer: Observable<CustomerModel[]>;

  filteredContact: Observable<ContactModel[]> =
    this.clientAutoComplete.valueChanges.pipe(
      filter(customer => customer.contacts !== undefined && customer.contacts !== null),
      map(customer => Array.from(customer.contacts))
    )


  constructor(private _http: QuotationService, private _ref: ChangeDetectorRef) {
    this._http.getCustomers().subscribe(data =>{
      this.customers = <CustomerModel[]>data;

      this.filteredCustomer =
        this.clientAutoComplete.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(<CustomerModel[]>data, value))
        );
    })
  }

  ngOnInit() {

    this.customerGroup = new FormGroup({
        id : this.id,
        name: this.name,
        fullName: this.fullName,
        cnpj: this.cnpj
    })

    this.customerFormGroup.registerControl('customer', this.customerGroup);
    this.customerFormGroup.registerControl('contact', this.contactGroup);
    this._ref.detectChanges();
  }

  ngAfterViewInit(){
    setTimeout(() => {

      if (this.injectedCustomer){
        this.customerForm.controls.id.setValue(this.injectedCustomer.id);
        this.customerForm.controls.name.setValue(this.injectedCustomer.name);
        this.customerForm.controls.fullName.setValue(this.injectedCustomer.fullName);
        this.customerForm.controls.cnpj.setValue(this.injectedCustomer.cnpj);
      }

      if(this.injectedContact){
        this.contactGroup.controls.id.setValue(this.injectedContact.id);
        this.contactGroup.controls.name.setValue(this.injectedContact.name);
        this.contactGroup.controls.department.setValue(this.injectedContact.department);
        this.contactGroup.controls.email.setValue(this.injectedContact.email);
      }

      if(this.disabled === "disabled"){
        this.customerForm.controls.name.disable();
        this.customerForm.controls.fullName.disable();
        this.customerForm.controls.cnpj.disable();
        this.contactGroup.controls.name.disable();
        this.contactGroup.controls.department.disable();
        this.contactGroup.controls.email.disable();
        this.customerFormGroup.removeControl('contact');
        this.customerFormGroup.removeControl('customer');
      }
    }, 0);
  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? customer.name : '';
  }

  private _filter(data: CustomerModel[], name: any): CustomerModel[] {
    const filterValue = name.name ? name.name.toLowerCase() : name.toLowerCase();
    return data.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectCustomer(customer: CustomerModel){
    if (customer instanceof Object){

      this.customerForm.controls.fullName.disable();
      this.customerForm.controls.cnpj.disable();

      this.customerForm.controls.name.setValue(customer.name);
      this.customerForm.controls.fullName.setValue(customer.fullName);
      this.customerForm.controls.cnpj.setValue(customer.cnpj);

    } else {

      this.customerForm.controls.fullName.enable();
      this.customerForm.controls.cnpj.enable();

      this.customerForm.controls.name.setValue(this.clientAutoComplete.value);
      this.customerForm.controls.fullName.setValue("");
      this.customerForm.controls.cnpj.setValue("");

    }

    this.contactAutoComplete.setValue("");
    this.contactGroup.controls.name.setValue("");
    this.contactGroup.controls.department.setValue("");
    this.contactGroup.controls.email.setValue("");
  }

  selectContact(contact: ContactModel){

    if(contact instanceof Object){

      this.contactGroup.controls.department.disable();
      this.contactGroup.controls.email.disable();

      this.contactGroup.controls.name.setValue(contact.name);
      this.contactGroup.controls.department.setValue(contact.department);
      this.contactGroup.controls.email.setValue(contact.email);

    } else {

      this.contactGroup.controls.department.enable();
      this.contactGroup.controls.email.enable();

      this.contactGroup.controls.name.setValue(this.contactAutoComplete.value);
      this.contactGroup.controls.department.setValue("");
      this.contactGroup.controls.email.setValue("");
    }

  }
}

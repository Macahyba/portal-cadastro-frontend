import { Component, OnInit, Input,  AfterViewInit } from '@angular/core';
import { CustomerModel } from 'src/app/model/customer.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  @Input() parentFormGroup: FormGroup;

  customerGroup = this._fb.group({
    id: [''],
    name: ['', Validators.required],
    fullName: ['', Validators.required],
    cnpj: ['', Validators.required],
  });

  contactGroup = this._fb.group({
    id: [''],
    name: ['', Validators.required],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

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


  constructor(private _http: QuotationService, private _fb: FormBuilder) {
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
    this.parentFormGroup.registerControl('customer', this.customerGroup);
    this.parentFormGroup.registerControl('contact', this.contactGroup);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      if (this.injectedCustomer){
        this.customerGroup.patchValue(this.injectedCustomer);
      }

      if(this.injectedContact){
        this.contactGroup.patchValue(this.injectedContact);
      }

      if(this.disabled === "disabled"){
        this.customerGroup.disable();
        this.contactGroup.disable();
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

      this.customerGroup.controls.fullName.disable();
      this.customerGroup.controls.cnpj.disable();

      this.customerGroup.controls.name.setValue(customer.name);
      this.customerGroup.controls.fullName.setValue(customer.fullName);
      this.customerGroup.controls.cnpj.setValue(customer.cnpj);

    } else {

      this.customerGroup.controls.fullName.enable();
      this.customerGroup.controls.cnpj.enable();

      this.customerGroup.controls.name.setValue(this.clientAutoComplete.value);
      this.customerGroup.controls.fullName.setValue("");
      this.customerGroup.controls.cnpj.setValue("");

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

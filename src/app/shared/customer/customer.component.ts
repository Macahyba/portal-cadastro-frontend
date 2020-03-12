import { Component, OnInit, Input,  AfterViewInit, OnChanges } from '@angular/core';
import { CustomerModel } from 'src/app/model/customer.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { QuotationService } from 'src/app/service/quotation.service';
import { ContactModel } from 'src/app/model/contact.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnChanges {
 
  @Input() disabled: string;
  @Input() injectedCustomer: CustomerModel;
  @Input() injectedContact: ContactModel;
  @Input() customerFormGroup: FormGroup;

  get customerName(): FormControl {
    return this.customerFormGroup.controls.customerName as FormControl;
  }
  get customerFullName(): FormControl {
    return this.customerFormGroup.controls.customerFullName as FormControl;
  }
  get customerCnpj(): FormControl {
    return this.customerFormGroup.controls.customerCnpj as FormControl;
  }
  get contactName(): FormControl {
    return this.customerFormGroup.controls.contactName as FormControl;
  }
  get contactDept(): FormControl {
    return this.customerFormGroup.controls.contactDept as FormControl;
  }
  get contactEmail(): FormControl {
    return this.customerFormGroup.controls.contactEmail as FormControl;
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


  constructor(private _http: QuotationService) { }

  ngOnInit() {

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

  ngOnChanges(){
    
    // if(this.disabled === "disabled"){
    //   this.clientAutoComplete.disable();
    //   this.customerFullName.disable();
    //   this.customerCnpj.disable();
    //   this.contactAutoComplete.disable();
    //   this.contactDept.disable();
    //   this.contactEmail.disable();
    // }  

    if (this.injectedCustomer){
      this.clientAutoComplete.setValue(this.injectedCustomer.name);  
      this.customerFullName.setValue(this.injectedCustomer.fullName);
      this.customerCnpj.setValue(this.injectedCustomer.cnpj);
    }

    if(this.injectedContact){
      this.contactName.setValue(this.injectedContact.name);
      this.contactDept.setValue(this.injectedContact.department);
      this.contactEmail.setValue(this.injectedContact.email);      
    }  
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

      this.customerFullName.disable();
      this.customerCnpj.disable();

      this.customerName.setValue(customer.name);
      this.customerFullName.setValue(customer.fullName);
      this.customerCnpj.setValue(customer.cnpj);
    } else {

      this.customerFullName.enable();
      this.customerCnpj.enable();

      this.customerName.setValue(this.clientAutoComplete.value);
      this.customerFullName.setValue("");
      this.customerCnpj.setValue("");

      this.contactAutoComplete.setValue("");
      this.contactName.setValue("");
      this.contactDept.setValue("");
      this.contactEmail.setValue("");
    }    
  }

  selectContact(contact: ContactModel){

    if(contact instanceof Object){

      this.contactDept.disable();
      this.contactEmail.disable();

      this.contactName.setValue(contact.name);
      this.contactDept.setValue(contact.department);
      this.contactEmail.setValue(contact.email);
    } else {

      this.contactDept.enable();
      this.contactEmail.enable();
      
      this.contactName.setValue(this.contactAutoComplete.value);
      this.contactDept.setValue("");
      this.contactEmail.setValue("");
    }

  }
}

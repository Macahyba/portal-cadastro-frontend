import { Component, OnInit, NgModule, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';

export interface User {
  name: string;
}
@Component({
  selector: 'app-orcamento-insert',
  templateUrl: './orcamento-insert.component.html',
  styleUrls: ['./orcamento-insert.component.scss']
})
export class OrcamentoInsertComponent implements OnInit{

  orcamentoFormGroup = this.fb.group({
    customer: this.fb.group({
      customerName: this.fb.control(['']),
      customerFullName: this.fb.control(['']),
      customerCnpj: this.fb.control(['']),
      contactName:this.fb.control(['']),
      contactDept:this.fb.control(['']),
      contactEmail: this.fb.control(['']),
    })
  });

  selectedService: ServiceModel = new ServiceModel();
  desconto = new FormControl('');
  totalPrice: number = 0;
  services: ServiceModel[];
  creationDate: Date;
  
  get customerFormGroup() {
    return this.orcamentoFormGroup.controls.customer;
  }

  constructor(private _http: QuotationService, private fb: FormBuilder) {
   
  }

  ngOnInit() {  

     
    this._http.getServices().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.totalPrice = this.selectedService.price;
    })           

  }

  selectService(service){
    this.selectedService = service;
    this.totalPrice = this.selectedService.price;
  }

  mariolar(e) {
    console.log(this.orcamentoFormGroup.getRawValue());
  }

}

import { Component, OnInit, NgModule, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  selectedService: ServiceModel = new ServiceModel();
  desconto = new FormControl('');
  totalPrice: number = 0;
  services: ServiceModel[];
  creationDate: Date;
  
  constructor(private _http: QuotationService) {
   
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

}

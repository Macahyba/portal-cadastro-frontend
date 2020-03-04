import { Component, OnInit, NgModule, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { QuotationModel } from 'src/app/model/quotation.model';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';
import { CustomerModel } from 'src/app/model/customer.model';

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
  
  constructor(private _http: QuotationService) {
   
  }

  ngOnInit() {  

     
    this._http.getServices().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.selectedService = this.services[0];
      this.totalPrice = this.selectedService.price;
    })    

         

  }


  returnTotal(){
    return this.totalPrice*(1-this.desconto.value/100);
  }

  selectService(service){
    this.selectedService = service;
    this.totalPrice = this.selectedService.price;
  }


}

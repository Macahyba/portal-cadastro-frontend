import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnChanges {

  @Input() disabled: string;
  @Input() injectedServices: ServiceModel[];
  @Output() servicesToInsert = new EventEmitter<number>();

  displayedColumns: string[] = ['name', 'desc', 'price'];
  dataSource: MatTableDataSource<ServiceModel>;

  prices: number[] = [0];

  constructor(private _http: QuotationService) { 
    this._http.getServices().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.dataSource = new MatTableDataSource(this.services);
    })
  }

  services: ServiceModel[];  

  ngOnInit() {
  }

  ngOnChanges(){

    if(this.injectedServices && this.injectedServices.length > 0){
      const injectedPrices = this.injectedServices.reduce((sum, s) =>{
        return sum + s.price;
      }, 0);
      this.servicesToInsert.emit(injectedPrices);
    }

  }

  serviceChosen(event, price){

    event.checked ? price : price = price * -1;
    this.prices.push(price);
    this.servicesToInsert.emit(this.prices.reduce((a, b) => a + b, 0));
    
  }

  isSelected(id: number){
    
    if (this.injectedServices){
      let check: boolean;
      for (let i = 0; i < this.injectedServices.length; i++) {
        if (id === this.injectedServices[i].id) {
          check = true;
          break;
        }      
      }
      return check
    }
  }

  disableChk(){
    if (this.disabled) return "disabled";
  }
}

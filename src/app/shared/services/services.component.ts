import { Component, OnInit, EventEmitter, Output, Input, OnChanges, ɵConsole, AfterViewInit } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit {

  @Input() disabled: string;
  @Input() injectedServices: ServiceModel[];
  @Output() servicesToInsert = new EventEmitter<number>();
  @Input () parentFormGroup: FormGroup;

  services: ServiceModel[];

  displayedColumns: string[] = ['name', 'desc', 'price'];
  dataSource: MatTableDataSource<ServiceModel>;

  prices: number[] = [0];

  serviceArray = this._fb.array([]);

  constructor(private _http: QuotationService,  private _fb: FormBuilder) {

    this._http.getServices().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.dataSource = new MatTableDataSource(this.services);

    })

  }

  ngOnInit() {
    this.parentFormGroup.registerControl('services', this.serviceArray)
  }

  ngAfterViewInit(){

    setTimeout(() => {
      if(this.injectedServices && this.injectedServices.length > 0){
        const injectedPrices = this.injectedServices.reduce((sum, s) =>{
          return sum + s.price;
        }, 0);
        this.servicesToInsert.emit(injectedPrices);
      }
    }, 0);
  }

  serviceChosen(event, price, id){



    if (event.checked) {

      this.serviceArray.push(this._fb.group({ id: this._fb.control(id) }));

      const index = this.serviceArray.controls.length-1;

      this.serviceArray.controls[index].get('id').setValue(id);

    } else {


      for (let index = 0; index < this.serviceArray.controls.length; index++) {

        if (this.serviceArray.controls[index].get('id').value === id) {
          this.serviceArray.removeAt(index);
        }

      }

      price = price * -1;

    }

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
    if (this.disabled) {
      this.parentFormGroup.removeControl('services');
      return "disabled";
    }
  }
}

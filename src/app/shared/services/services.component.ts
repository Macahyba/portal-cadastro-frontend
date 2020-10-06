import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { ServiceModel } from 'src/app/model/service.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  @Input() disabled: boolean;
  @Input() injectedServices$ = new BehaviorSubject<ServiceModel[]>([new ServiceModel()]);
  @Output() servicesToInsert = new EventEmitter<number>();
  @Input () parentFormGroup: FormGroup;

  services: ServiceModel[];
  ckdServices: ServiceModel[];

  displayedColumns: string[] = ['name', 'desc', 'price'];
  dataSource: MatTableDataSource<ServiceModel>;

  prices: number[] = [0];

  serviceArray = this._fb.array([]);

  constructor(private _http: ServiceService,  private _fb: FormBuilder) {

    this._subscription = this._http.getAll().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.dataSource = new MatTableDataSource(this.services);
    })
  }

  ngOnInit() {
    this.parentFormGroup.registerControl('services', this.serviceArray);
    this.injectedServices$.subscribe(services =>{
      const injectedPrices = services.reduce((sum, s) =>{
        return sum + s.price;
      }, 0);
      this.servicesToInsert.emit(injectedPrices);
      this.ckdServices = services;

    })

  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
    this.servicesToInsert.complete();
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

    if (this.ckdServices){
      let check: boolean;
      for (let i = 0; i < this.ckdServices.length; i++) {
        if (id === this.ckdServices[i].id) {
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
      return true;
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';
import { Subscription } from 'rxjs';
import { StatusModel } from 'src/app/model/status.model';
import { UserModel } from 'src/app/model/user.model';
import { CustomerModel } from 'src/app/model/customer.model';

@Component({
  selector: 'app-orcamento-insert',
  templateUrl: './orcamento-insert.component.html',
  styleUrls: ['./orcamento-insert.component.scss']
})
export class OrcamentoInsertComponent implements OnInit{

  orcamentoFormGroup : FormGroup;

  selectedService: ServiceModel = new ServiceModel();
  desconto = new FormControl('');
  totalPrice: number = 0;
  services: ServiceModel[];
  creationDate: Date;
  status : StatusModel = new StatusModel(1);
  user : UserModel = new UserModel(1);
  message: string;
  bar: boolean;

  get customerFormGroup() {
    return this.orcamentoFormGroup;
  }

  get equipmentFormGroup() {
    return this.orcamentoFormGroup;
  }

  get serviceFormGroup(){
    return this.orcamentoFormGroup;
  }

  get serviceSubGroup(){
    return this.serviceFormGroup.controls.services;
  }

  get valorFormGroup(){
    return this.orcamentoFormGroup;
  }

  get dateFormGroup(){
    return this.orcamentoFormGroup;
  }

  constructor(private _http: QuotationService, private _ref: ChangeDetectorRef) {
    this.orcamentoFormGroup = new FormGroup({
      user : new FormControl(this.user),
      status : new FormControl(this.status)
    });
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

  postSubscription: Subscription;

  submitForm() {
    console.log(this.orcamentoFormGroup.getRawValue());
    this.postSubscription =
      this._http.setQuotation(this.orcamentoFormGroup.getRawValue())
      .subscribe(
        ((response) => {
          console.log(response);
          this.setMessage('sucesso');
          this.bar = false;
          window.open('http://localhost:4200/orcamentos',"_self");
          this._ref.detectChanges();
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
          this._ref.detectChanges();
        })
      )
      this.bar = true;

  }

  checkValid(){
    return this.serviceSubGroup.value.length > 0  && this.orcamentoFormGroup.valid ? false : true;
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 5000);
    this.message = m;
  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';
import { Subscription } from 'rxjs';
import { StatusModel } from 'src/app/model/status.model';
import { UserModel } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-orcamento-insert',
  templateUrl: './orcamento-insert.component.html',
  styleUrls: ['./orcamento-insert.component.scss']
})
export class OrcamentoInsertComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  orcamentoFormGroup : FormGroup;

  selectedService: ServiceModel = new ServiceModel();
  desconto = new FormControl('');
  totalPrice: number = 0;
  services: ServiceModel[];
  status : StatusModel = new StatusModel(1);
  user : UserModel = new UserModel(this._auth.getId());
  message: string;
  bar: boolean;

  get serviceSubGroup(){
    return this.orcamentoFormGroup.controls.services;
  }

  constructor(private _http: QuotationService, private _auth: AuthenticationService) {
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
    this.postSubscription =
      this._http.setQuotation(this.orcamentoFormGroup.value)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/orcamentos`,"_self");
          }, 2000);
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
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

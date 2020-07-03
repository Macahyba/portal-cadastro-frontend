import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { QuotationService } from 'src/app/service/quotation.service';
import { ServiceModel } from 'src/app/model/service.model';
import { StatusModel } from 'src/app/model/status.model';
import { UserModel } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ServiceService } from 'src/app/service/service.service';
import { GenericFormService } from 'src/app/service/generic-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento-insert',
  templateUrl: './orcamento-insert.component.html',
  styleUrls: ['./orcamento-insert.component.scss']
})
export class OrcamentoInsertComponent extends GenericFormService implements OnInit {

  HTTP_HOST = environment.http_host;

  orcamentoFormGroup : FormGroup;

  selectedService: ServiceModel = new ServiceModel();
  desconto = new FormControl('');
  totalPrice: number = 0;
  services: ServiceModel[];
  status : StatusModel = new StatusModel(1);
  user : UserModel = new UserModel(this._authenticationService.getId());

  path: string = 'orcamentos';

  get serviceSubGroup(){
    return this.orcamentoFormGroup.controls.services;
  }

  constructor(
      private _quotationService: QuotationService,
      private _services: ServiceService,
      private _authenticationService: AuthenticationService,
      _fb: FormBuilder,
      _router: Router) {
        super(_fb, _quotationService, _router);
        this.orcamentoFormGroup = this._fb.group({
          user : this._fb.control(this.user),
          status : this._fb.control(this.status),
          active: this._fb.control(true)
        });
      }

  ngOnInit() {

    this._services.getAll().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.totalPrice = this.selectedService.price;
      this.barFetch = false;
    });
    this.barFetch = true;

  }

  selectService(service){
    this.selectedService = service;
    this.totalPrice = this.selectedService.price;
  }

  submitForm(form) {

    this.postForm(form.value);
  }

  checkValid(){
    return this.serviceSubGroup && this.serviceSubGroup.value.length > 0  && this.orcamentoFormGroup.valid ? false : true;
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { ActivatedRoute } from '@angular/router';
import { QuotationModel } from 'src/app/model/quotation.model';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { ServiceModel } from 'src/app/model/service.model';
import { FormBuilder } from '@angular/forms';
import { StatusModel } from 'src/app/model/status.model';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-orcamento-detail',
  templateUrl: './orcamento-detail.component.html',
  styleUrls: ['./orcamento-detail.component.scss']
})
export class OrcamentoDetailComponent implements OnInit {

  totalPrice: number = 0;

  id: string;
  quotation: QuotationModel;
  customer: CustomerModel;
  contact: ContactModel;
  equipment: EquipmentModel;
  services: ServiceModel[];
  totalDiscount: number;
  status: StatusModel;
  message: string;
  bar: boolean;
  creationDate: Date;

  role: string;

  approvalUser : UserModel = new UserModel(this._auth.getId());

  orcamentoFormGroup;

  constructor(
            private _http: QuotationService,
            private _route: ActivatedRoute,
            private _auth: AuthenticationService,
            private _fb: FormBuilder) {
    this._route.params.subscribe( params => this.id = params.id );
    this._http.getOneQuotation(this.id).subscribe(data =>{
      this.quotation = <QuotationModel>data;
      this.customer = this.quotation.customer;
      this.contact = this.quotation.contact;
      this.equipment = this.quotation.equipment;
      this.services = Array.from(this.quotation.services);
      this.totalDiscount = this.quotation.totalDiscount;
      this.status = this.quotation.status;
      this.creationDate = this.quotation.creationDate;
    })
  }

  ngOnInit() {
    this.orcamentoFormGroup = this._fb.group({
      id : this._fb.control(this.id),
      approvalUser : this._fb.control(this.approvalUser),
      approvalDate : this._fb.control(new Date())
    });
    this.role = this._auth.getRole();
  }

  postSubscription: Subscription;

  submitForm(){
    this.postSubscription =
      this._http.patchQuotation(this.orcamentoFormGroup.value)
      .subscribe(
        ((response) => {
          const quo = <QuotationModel>response;
          this.status = quo.status;
          this.setMessage('sucesso');
          this.bar = false;
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
        })
      )
      this.bar = true;
  }

  downloadPdf(){
    return this._http.downloadPdf(this.id);
  }

  checkStatus(){
    return this.status && this.status.status === 'APROVADO';
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 5000);
    this.message = m;
  }

}

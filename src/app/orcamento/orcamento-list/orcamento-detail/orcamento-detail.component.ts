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
import { Subscription, BehaviorSubject } from 'rxjs';
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
  label: string;
  quotation: QuotationModel;
  customer$ = new BehaviorSubject<CustomerModel>(new CustomerModel());
  contact$ = new BehaviorSubject<ContactModel>(new ContactModel());
  equipment$ = new BehaviorSubject<EquipmentModel>(new EquipmentModel());
  services$ = new BehaviorSubject<ServiceModel[]>([new ServiceModel()]);
  totalDiscount$ = new BehaviorSubject<number>(0);
  status$ = new BehaviorSubject<StatusModel>(new StatusModel());
  message: string;
  bar: boolean;
  barFetch: boolean;
  creationDate: Date;
  error: string;

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
      this.customer$.next(this.quotation.customer);
      this.contact$.next(this.quotation.contact);
      this.equipment$.next(this.quotation.equipment);
      this.services$.next(Array.from(this.quotation.services));
      this.totalDiscount$.next(this.quotation.totalDiscount);
      this.status$.next(this.quotation.status);
      this.creationDate = this.quotation.creationDate;
      this.label = this.quotation.label;
      this.barFetch = false;
    })
    this.barFetch = true;
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
          // this.status = quo.status;
          this.setMessage('sucesso');
          this.bar = false;
          location.reload();
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.error = error;
          this.bar = false;
        })
      )
      this.bar = true;
  }

  checkStatus(){
    return (this.status$.value.status === 'APROVADO' || this.status$.value.status === 'FINALIZADO')
  }

  downloadPdf(){
    return this._http.downloadPdf(this.id, this.label);
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 3000);
    this.message = m;
  }

}

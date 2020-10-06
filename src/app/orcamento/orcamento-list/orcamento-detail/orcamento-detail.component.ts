import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationModel } from 'src/app/model/quotation.model';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { ServiceModel } from 'src/app/model/service.model';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusModel } from 'src/app/model/status.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { GenericFormService } from 'src/app/service/generic-form.service';

@Component({
  selector: 'app-orcamento-detail',
  templateUrl: './orcamento-detail.component.html',
  styleUrls: ['./orcamento-detail.component.scss']
})
export class OrcamentoDetailComponent extends GenericFormService implements OnInit, OnDestroy {

  private _subscription: Subscription;

  totalPrice: number = 0;

  id: number;
  label: string;
  quotation: QuotationModel;
  customer$ = new BehaviorSubject<CustomerModel>(new CustomerModel());
  contact$ = new BehaviorSubject<ContactModel>(new ContactModel());
  equipment$ = new BehaviorSubject<EquipmentModel>(new EquipmentModel());
  services$ = new BehaviorSubject<ServiceModel[]>([new ServiceModel()]);
  totalDiscount$ = new BehaviorSubject<number>(0);
  status$ = new BehaviorSubject<StatusModel>(new StatusModel());

  creationDate$ = new BehaviorSubject<Date>(new Date());

  role: string;

  path: string = 'orcamentos';

  approvalUser : UserModel = new UserModel(this._auth.getId());

  orcamentoFormGroup;

  constructor(
      private _quotationService: QuotationService,
      private _activatedRouter: ActivatedRoute,
      _router: Router,
      private _auth: AuthenticationService,
      _fb: FormBuilder) {

        super( _fb, _quotationService, _router);
        this._activatedRouter.params.subscribe( params => this.id = params.id );
        this._subscription = this._quotationService.get(this.id).subscribe(data =>{
          this.quotation = <QuotationModel>data;
          this.customer$.next(this.quotation.customer);
          this.contact$.next(this.quotation.contact);
          this.equipment$.next(this.quotation.equipment);
          this.services$.next(Array.from(this.quotation.services));
          this.totalDiscount$.next(this.quotation.totalDiscount);
          this.status$.next(this.quotation.status);
          this.creationDate$.next(this.quotation.creationDate);
          this.label = this.quotation.label;
          this.barFetch = false;
        })
        this.barFetch = true;
     }

  ngOnInit() {
    this.orcamentoFormGroup = this._fb.group({
      id : this._fb.control(this.id, Validators.required),
      approvalUser : this._fb.control(this.approvalUser, Validators.required),
      approvalDate : this._fb.control(new Date(), Validators.required)
    });
    this.role = this._auth.getRole();

  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  submitForm(form){

    this.path = `orcamentos/${this.id}`;
    this.patchForm(form.value);
  }

  checkStatus(){
    return (this.status$.value.status === 'APROVADO' || this.status$.value.status === 'FINALIZADO')
  }

  downloadPdf(){
    return this._quotationService.downloadPdf(this.id, this.label);
  }

}

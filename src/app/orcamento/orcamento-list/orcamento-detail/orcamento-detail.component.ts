import { Component, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { ActivatedRoute } from '@angular/router';
import { QuotationModel } from 'src/app/model/quotation.model';
import { CustomerModel } from 'src/app/model/customer.model';
import { ContactModel } from 'src/app/model/contact.model';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { ServiceModel } from 'src/app/model/service.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-orcamento-detail',
  templateUrl: './orcamento-detail.component.html',
  styleUrls: ['./orcamento-detail.component.scss']
})
export class OrcamentoDetailComponent implements OnInit {

  orcamentoFormGroup = this.fb.group({
    customer: this.fb.group({
      customerName: this.fb.control(''),
      customerFullName: this.fb.control('', Validators.required),
      customerCnpj: this.fb.control(''),
      contactName:this.fb.control(''),
      contactDept:this.fb.control(''),
      contactEmail: this.fb.control(''),
    }),
    equipment: this.fb.group({
      equipmentName: this.fb.control({value:'', disabled: true}),
      equipmentSerialNumber: this.fb.control({value:'', disabled: true}),
    })
  });
  
  get customerFormGroup() {
    return this.orcamentoFormGroup.controls.customer;
  }

  get equipmentFormGroup() {
    return this.orcamentoFormGroup.controls.equipment;
  }

  constructor(private _http: QuotationService, private route: ActivatedRoute, private fb: FormBuilder) { 
    this.route.params.subscribe( params => this.id = params.id );
    this._http.getOneQuotation(this.id).subscribe(data =>{
      this.quotation = <QuotationModel>data;
      this.customer = this.quotation.customer;
      this.contact = this.quotation.contact;
      this.equipment = this.quotation.equipments[0];
      this.services = Array.from(this.quotation.services);
    })    
  }

  id: string;
  quotation: QuotationModel;
  customer: CustomerModel;
  contact: ContactModel;
  equipment: EquipmentModel;
  services: ServiceModel[];

  ngOnInit() {
  }

}

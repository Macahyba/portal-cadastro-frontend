import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceModel } from 'src/app/model/service.model';
import { ServiceService } from 'src/app/service/service.service';
import { GenericFormService } from '../../service/generic-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-crud',
  templateUrl: './service-crud.component.html',
  styleUrls: ['./service-crud.component.scss']
})
export class ServiceCrudComponent extends GenericFormService implements OnInit {

  HTTP_HOST = environment.http_host;

  serviceForm = this._fb.group({});

  id = this._fb.control('');
  name = this._fb.control('', Validators.required);
  description = this._fb.control('', Validators.required);
  price = this._fb.control('', [Validators.required, Validators.pattern('[0-9]{0,10}')]);

  services: ServiceModel[];
  selectedService: ServiceModel;

  path: string = 'servicos';

  constructor(
    _fb: FormBuilder,
    private _serviceService: ServiceService,
    _router: Router, ) {
      super(_fb, _serviceService, _router)
      this._serviceService.getAll().subscribe(data =>{
      this.services = <ServiceModel[]>data;
      this.barFetch = false;
    });
    this.barFetch = true;
   }

  ngOnInit() {
    this.serviceForm = this._fb.group({
      id: this.id,
      name: this.name,
      description : this.description,
      price: this.price
    })
    this.selectControl.disable();
  }

  selected(event){
    this.selectedService = this.getServiceById(parseInt(event.value));
    this.serviceForm.controls.id.setValue(this.selectedService.id);
    this.serviceForm.controls.name.setValue(this.selectedService.name);
    this.serviceForm.controls.description.setValue(this.selectedService.description);
    this.serviceForm.controls.price.setValue(this.selectedService.price);
  }

  getServiceById(id: number){
    return this.services.find(eq => eq.id === id)
  }

  checkButton(): boolean {
    if (this.operacao === 'inserir'){
      return this.serviceForm.valid ? false : true;
    } else {
      return (this.serviceForm.valid && this.selectedService) ? false : true;
    }
  }

  submitForm(form){

    this.isAtualizar() ? this.patchForm(form.value) : this.postForm(form.value)
  }
}

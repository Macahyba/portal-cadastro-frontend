import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceModel } from 'src/app/model/service.model';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-service-crud',
  templateUrl: './service-crud.component.html',
  styleUrls: ['./service-crud.component.scss']
})
export class ServiceCrudComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  serviceForm = this._fb.group({});

  operacao = this._fb.control('');
  selectControl = this._fb.control('');

  id = this._fb.control('');
  name = this._fb.control('', Validators.required);
  description = this._fb.control('', Validators.required);
  price = this._fb.control('', [Validators.required, Validators.pattern('[0-9]{0,10}')]);

  services: ServiceModel[];
  selectedService: ServiceModel;
  message: string;
  bar: boolean;

  constructor(private _http: ServiceService, private _fb: FormBuilder) {
    this._http.getServices().subscribe(data =>{
      this.services = <ServiceModel[]>data;
    })
   }

  ngOnInit() {
    this.serviceForm = this._fb.group({
      id: this.id,
      name: this.name,
      description : this.description,
      price: this.price
    })
    this.operacao.setValue("inserir");
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
    if (this.operacao.value === 'inserir'){
      return this.serviceForm.valid ? false : true;
    } else {
      return (this.serviceForm.valid && this.selectedService) ? false : true;
    }
  }

  postSubscription: Subscription;

  submitForm(){

    if (this.operacao.value === 'atualizar') {

      this.postSubscription =
        this._http.patchService(this.serviceForm.value)
        .subscribe(
          ((response) => {
            this.setMessage('sucesso');
            this.bar = false;
            setTimeout(() => {
              window.open(`${this.HTTP_HOST}/servicos`,"_self");
            }, 2000);
          }),
          ((error) => {
            console.error(error);
            this.setMessage('erro');
            this.bar = false;
          })
        )
    } else {

      this.postSubscription =
      this._http.postService(this.serviceForm.value)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/servicos`,"_self");
          }, 2000);
        }),
        ((error) => {
          console.error(error);
          this.setMessage('erro');
          this.bar = false;
        })
      )
    }

    this.bar = true;
  }

  setMessage(m: string){

    setTimeout(() => {
      this.message = "";
    }, 3000);
    this.message = m;
  }

  radioSelect(){
    if (this.operacao.value === 'inserir'){
      this.serviceForm.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }
}

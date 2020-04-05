import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { QuotationService } from 'src/app/service/quotation.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipment-crud',
  templateUrl: './equipment-crud.component.html',
  styleUrls: ['./equipment-crud.component.scss']
})
export class EquipmentCrudComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  equipmentForm = this._fb.group({});

  operacao = this._fb.control('');
  selectControl = this._fb.control('');

  equipments: EquipmentModel[];
  selectedEquipment: EquipmentModel;
  message: string;
  bar: boolean;

  constructor(private _fb: FormBuilder, private _http: QuotationService) { }

  ngOnInit() {
    this._http.getEquipments().subscribe(data =>{
      this.equipments = <EquipmentModel[]>data;
    })
    this.operacao.setValue("inserir");
    this.selectControl.disable();
  }

  checkButton(): boolean {
    if (this.operacao.value === 'inserir'){
      return this.equipmentForm.valid ? false : true;
    } else {
      return (this.equipmentForm.valid && this.selectedEquipment) ? false : true;
    }
  }

  radioSelect(){
    if (this.operacao.value === 'inserir'){
      this.equipmentForm.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }

  selected(event){
    this.selectedEquipment = this.getEquipmentById(parseInt(event.value));
  }

  getEquipmentById(id: number){
    return this.equipments.find(eq => eq.id === id)
  }

  postSubscription: Subscription;

  submitForm(){

    if (this.operacao.value === 'atualizar') {

      this.postSubscription =
        this._http.patchEquipment(this.equipmentForm.value.equipment)
        .subscribe(
          ((response) => {
            this.setMessage('sucesso');
            this.bar = false;
            setTimeout(() => {
              window.open(`${this.HTTP_HOST}/equipamentos`,"_self");
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
      this._http.setEquipment(this.equipmentForm.value.equipment)
      .subscribe(
        ((response) => {
          this.setMessage('sucesso');
          this.bar = false;
          setTimeout(() => {
            window.open(`${this.HTTP_HOST}/equipamentos`,"_self");
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
    }, 5000);
    this.message = m;
  }
}

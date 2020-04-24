import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentService } from 'src/app/service/equipment.service';

@Component({
  selector: 'app-equipment-crud',
  templateUrl: './equipment-crud.component.html',
  styleUrls: ['./equipment-crud.component.scss']
})
export class EquipmentCrudComponent implements OnInit {

  HTTP_HOST = environment.http_host;

  equipmentForm = this._fb.group({});

  operacao: string = "inserir";
  selectControl = this._fb.control('');

  equipments: EquipmentModel[];
  selectedEquipment$ = new BehaviorSubject<EquipmentModel>(new EquipmentModel());
  message: string;
  bar: boolean;
  barFetch: boolean;
  error: string;

  constructor(
        private _fb: FormBuilder,
        private _http: EquipmentService,
        private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._http.getEquipments().subscribe(data =>{
      this.equipments = <EquipmentModel[]>data;
      this.barFetch = false;
    })
    this.barFetch = true;
    this.selectControl.disable();
    this._cdr.detectChanges();
  }

  checkButton(): boolean {
    if (this.operacao === 'inserir'){
      return this.equipmentForm.valid ? false : true;
    } else {
      return (this.equipmentForm.valid && this.selectedEquipment$) ? false : true;
    }
  }

  radioSelect(){
    if (this.operacao === 'inserir'){
      this.equipmentForm.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }

  selected(event){
    this.selectedEquipment$.next(this.getEquipmentById(parseInt(event.value)));
  }

  getEquipmentById(id: number){
    return this.equipments.find(eq => eq.id === id)
  }

  postSubscription: Subscription;

  submitForm(){

    if (this.operacao === 'atualizar') {

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
      this._http.postEquipment(this.equipmentForm.value.equipment)
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
          this.error = error;
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
}

import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentService } from 'src/app/service/equipment.service';
import { Router } from '@angular/router';
import { GenericFormService } from '../../service/generic-form.service';

@Component({
  selector: 'app-equipment-crud',
  templateUrl: './equipment-crud.component.html',
  styleUrls: ['./equipment-crud.component.scss']
})
export class EquipmentCrudComponent extends GenericFormService implements OnInit, OnDestroy  {

  private _subscription: Subscription;

  HTTP_HOST = environment.http_host;

  equipmentForm = this._fb.group({});

  equipments: EquipmentModel[];
  selectedEquipment$ = new BehaviorSubject<EquipmentModel>(new EquipmentModel());

  path: string = 'equipamentos';

  constructor(
        _fb: FormBuilder,
        private _equipmentService: EquipmentService,
        _router: Router,
        private _cdr: ChangeDetectorRef) {
          super( _fb, _equipmentService, _router)
        }

  ngOnInit() {
    this._subscription = this._equipmentService.getAll().subscribe(data =>{
      this.equipments = <EquipmentModel[]>data;
      this.barFetch = false;
    })
    this.barFetch = true;
    this.selectControl.disable();
    this._cdr.detectChanges();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  checkButton(): boolean {
    if (this.operacao === 'inserir'){
      return this.equipmentForm.valid ? false : true;
    } else {
      return (this.equipmentForm.valid && this.selectedEquipment$) ? false : true;
    }
  }

  selected(event){
    this.selectedEquipment$.next(this.getEquipmentById(parseInt(event.value)));
  }

  getEquipmentById(id: number){
    return this.equipments.find(eq => eq.id === id)
  }

  submitForm(form){

    this.isAtualizar() ? this.patchForm(form.value.equipment) : this.postForm(form.value.equipment)
  }

}

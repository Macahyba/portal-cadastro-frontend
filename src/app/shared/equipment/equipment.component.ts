import { Component, OnInit, Input } from '@angular/core';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EquipmentService } from 'src/app/service/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() injectedEquipment$: Observable<EquipmentModel>;
  @Input() parentFormGroup: FormGroup;

  equipmentGroup : FormGroup;
  id = this._fb.control('');
  name = this._fb.control('', Validators.required);
  serialNumber = this._fb.control('', Validators.required);

  equipmentAutoComplete = new FormControl('');

  equipments: EquipmentModel[];
  filteredEquipment: Observable<EquipmentModel[]>;

  constructor(private _http: EquipmentService, private _fb: FormBuilder) {
    this._http.getEquipments().subscribe(data =>{
      this.equipments = <EquipmentModel[]>data;

      this.filteredEquipment = this.equipmentAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(<EquipmentModel[]>data, value)),
        map(value => this._uniqueName(value)),
      );

    })
   }

  ngOnInit() {
    this.equipmentGroup = this._fb.group({
      id: this.id,
      name: this.name,
      serialNumber: this.serialNumber
    });
    this.parentFormGroup.registerControl('equipment', this.equipmentGroup);

    if (this.injectedEquipment$) this.injectedEquipment$.subscribe(data =>{
      this.equipmentGroup.controls.id.setValue(data.id);
      this.equipmentGroup.controls.name.setValue(data.name);
      this.equipmentGroup.controls.serialNumber.setValue(data.serialNumber);
    })

    if (this.disabled){
      this.equipmentGroup.controls.name.disable();
      this.equipmentGroup.controls.serialNumber.disable();
      this.parentFormGroup.removeControl('equipment');
    }
  }

  private _filter(data: EquipmentModel[], name: any): EquipmentModel[] {

    const filterValue = name.name ? name.name.toLowerCase() : name.toLowerCase();
    return data.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _uniqueName(array: any): EquipmentModel[]{

    const result = [];
    const map = new Map();
    for (const item of array) {
        if(!map.has(item.name)){
            map.set(item.name, true);
            result.push({name: item.name});
        }
    }
    return result;
  }

  displayFn(equipment: EquipmentModel): string {
    return equipment && equipment.name ? equipment.name : '';
  }

  selectEquipment(equipment){

    if (equipment instanceof Object) {

      this.equipmentGroup.controls.name.setValue(equipment.name);

    } else {

      this.equipmentGroup.controls.name.setValue(this.equipmentAutoComplete.value);
    }

  }
}

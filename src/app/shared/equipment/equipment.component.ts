import { Component, OnInit, Input, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, AfterViewInit {

  @Input() disabled: string;
  @Input() injectedEquipment: EquipmentModel;
  @Input() parentFormGroup: FormGroup;

  equipmentGroup = this._fb.group({
    id: [''],
    name: ['', Validators.required],
    serialNumber: ['', Validators.required]
  });

  equipmentAutoComplete = new FormControl('');

  equipments: EquipmentModel[];
  filteredEquipment: Observable<EquipmentModel[]>;

  constructor(private _http: QuotationService, private _fb: FormBuilder) {
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
    this.parentFormGroup.registerControl('equipment', this.equipmentGroup);
  }

  ngAfterViewInit(){
    setTimeout(() => {

      if(this.injectedEquipment){
        this.equipmentGroup.controls.id.setValue(this.injectedEquipment.id);
        this.equipmentGroup.controls.name.setValue(this.injectedEquipment.name);
        this.equipmentGroup.controls.serialNumber.setValue(this.injectedEquipment.serialNumber);
      }

      if (this.disabled === "disabled"){
        this.equipmentGroup.controls.name.disable();
        this.equipmentGroup.controls.serialNumber.disable();
        this.parentFormGroup.removeControl('equipment');
      }
    }, 0);
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

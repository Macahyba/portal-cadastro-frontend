import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, AfterViewInit {

  @Input() disabled: string;
  @Input() injectedEquipment: EquipmentModel;
  @Input() equipmentFormGroup: FormGroup;

  get equipmentName() : FormControl {
    return this.equipmentFormGroup.controls.equipmentName as FormControl;
  }

  get equipmentSerialNumber() : FormControl{
    return this.equipmentFormGroup.controls.equipmentSerialNumber as FormControl;
  }

  equipmentAutoComplete = new FormControl('');

  equipments: EquipmentModel[];
  filteredEquipment: Observable<EquipmentModel[]>;

  constructor(private _http: QuotationService) { }

  ngOnInit() {

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

  ngAfterViewInit(){
    // if (this.disabled === "disabled"){
    //   this.equipmentName.disable();
    //   this.equipmentSerialNumber.disable();
    // }

    // if(this.injectedEquipment){
    //   this.equipmentName.setValue(this.injectedEquipment.name);
    //   this.equipmentSerialNumber.setValue(this.injectedEquipment.serialNumber);
    // }
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

  selectCustomer(equipment: EquipmentModel){
    
    if (equipment instanceof Object) {
    
      this.equipmentName.setValue(equipment.name);
    
    } else {
      
      this.equipmentName.setValue(this.equipmentAutoComplete.value);
    }
    
  }

}

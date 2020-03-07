import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuotationService } from 'src/app/service/quotation.service';
import { EquipmentModel } from 'src/app/model/equipament.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnChanges {

  @Input() disabled: string;
  @Input() injectedEquipment: EquipmentModel;

  equipments: EquipmentModel[];
  equipmentName = new FormControl();
  equipmentSerialNumber = new FormControl();
  filteredEquipment: Observable<string[]>;
  selectedEquipment: EquipmentModel = new EquipmentModel();

  constructor(private _http: QuotationService) { }

  ngOnInit() {

    this._http.getEquipments().subscribe(data =>{
      this.equipments = <EquipmentModel[]>data;

      this.filteredEquipment = this.equipmentName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
        map(value => this._uniqueName(value)),
      ); 

    })      
  }

  ngOnChanges(){
    if (this.disabled === "disabled"){
      this.equipmentName.disable();
      this.equipmentSerialNumber.disable();
    }

    if(this.injectedEquipment){
      this.equipmentName.setValue(this.injectedEquipment.name);
      this.equipmentSerialNumber.setValue(this.injectedEquipment.serialNumber);
    }
  }

  private _filter(name: any): EquipmentModel[] {

    const filterValue = name.name ? name.name.toLowerCase() : name.toLowerCase();
    return this.equipments.filter(option => option.name.toLowerCase().includes(filterValue));
  } 

  private _uniqueName(array: any): string[]{

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

}

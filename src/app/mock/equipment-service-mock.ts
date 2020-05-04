import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipmentModel } from '../model/equipament.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentServiceMock {

  getEquipments(): BehaviorSubject<EquipmentModel[]> {

    const equipments = [
      new EquipmentModel(1, "name1", "serialNumber1"),
      new EquipmentModel(2, "name2", "serialNumber2")
    ]

    return new BehaviorSubject<EquipmentModel[]>(equipments);
  }

  getEquipment(): BehaviorSubject<EquipmentModel> {

    const equipment = new EquipmentModel(1, "name", "serialNumber")

    return new BehaviorSubject<EquipmentModel>(equipment);
  }

}

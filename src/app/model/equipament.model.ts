import { SparePartModel } from './spare-part.model';

export class EquipmentModel {
    constructor(
        public id: number,
        public name: string,
        public serialNumber: string,
        public spareParts: SparePartModel
    ){}
}
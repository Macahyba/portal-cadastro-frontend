import { SparePartModel } from './spare-part.model';

export class EquipmentModel {
    constructor(
        public id?: number,
        public name?: string,
        public serialNumber?: string,
        public spareParts?: SparePartModel
    ){
        this.id = id || null
        this.name = name || null
        this.serialNumber = serialNumber || null
        this.spareParts = spareParts || null
    }
}

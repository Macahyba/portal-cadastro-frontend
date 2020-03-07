import { UserModel } from './user.model';
import { RepairModel } from './repair.model';
import { SparePartModel } from './spare-part.model';
import { EquipmentModel } from './equipament.model';

export class RepairFupModel {
    constructor(
        public id: number,
        public updateDate: Date,
        public description: string,
        public user: UserModel,
        public repair: RepairModel,
        public spareParts: Set<SparePartModel>,
        public equipment: EquipmentModel
    ){
        this.id = id || null
        this.updateDate = updateDate || null
        this.user = user || null
        this.repair = repair || null
        this.spareParts = spareParts || null
        this.equipment = equipment || null
    }
}
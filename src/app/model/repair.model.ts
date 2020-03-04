import { StatusModel } from './status.model';
import { RepairFupModel } from './repair-fup.model';
import { UserModel } from './user.model';
import { EquipmentModel } from './equipament.model';
import { CustomerModel } from './customer.model';
import { ContactModel } from './contact.model';

export class RepairModel {
    constructor(
        public id: number,
        public creationDate: Date,
        public endDate: Date,
        public sapNotification: string,
        public warranty: boolean,
        public notaFiscal: string,
        public tat: number,
        public status: StatusModel,
        public notadeEntrada: string,
        public repairFups: Set<RepairFupModel>,
        public user: UserModel,
        public equipment: EquipmentModel,
        public customer: CustomerModel,
        public contact: ContactModel        
    ){}
}
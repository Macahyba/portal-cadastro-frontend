import { StatusModel } from './status.model';
import { RepairFupModel } from './repair-fup.model';
import { UserModel } from './user.model';
import { EquipmentModel } from './equipament.model';
import { CustomerModel } from './customer.model';
import { ContactModel } from './contact.model';

export class RepairModel {
      constructor(
        public id?: number,
        public creationDate?: Date,
        public endDate?: Date,
        public sapNotification?: string,
        public warranty?: boolean,
        public notaFiscal?: string,
        public tat?: number,
        public active?: boolean,
        public status?: StatusModel,
        public notaDeEntrada?: string,
        public repairFups?: RepairFupModel[],
        public user?: UserModel,
        public equipment?: EquipmentModel,
        public customer?: CustomerModel,
        public contact?: ContactModel
    ){
        this.id = id || null
        this.creationDate = creationDate || null
        this.endDate = endDate || null
        this.sapNotification = sapNotification || null
        this.warranty = warranty || null
        this.notaFiscal = notaFiscal || null
        this.tat = tat || null
        this.active = active || null
        this.status = status || null
        this.notaDeEntrada = notaDeEntrada || null
        this.repairFups = repairFups || null
        this.user = user || null
        this.equipment = equipment || null
        this.customer = customer || null
        this.contact = contact || null
    }
}

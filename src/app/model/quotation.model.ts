import { StatusModel } from './status.model';
import { UserModel } from './user.model';
import { EquipmentModel } from './equipament.model';
import { CustomerModel } from './customer.model';
import { ContactModel } from './contact.model';
import { ServiceModel } from './service.model';

export class QuotationModel {
    constructor(
        public id?: number,
        public label?: string,
        public totalPrice?: number,
        public totalDiscount?: number,
        public status?: StatusModel,
        public creationDate?: Date,
        public approvalDate?: Date,
        public user?: UserModel,
        public equipment?: EquipmentModel,
        public customer?: CustomerModel,
        public contact?: ContactModel,
        public aprovalUser?: UserModel,
        public services?: Set<ServiceModel>
    ){
        this.id = id || null
        this.label = label || null
        this.totalPrice = totalPrice || null
        this.totalDiscount = totalDiscount || null
        this.status = status || null
        this.creationDate = creationDate || null
        this.approvalDate = approvalDate || null
        this.user = user || null
        this.equipment = equipment || null
        this.customer = customer || null
        this.contact = contact || null
        this.aprovalUser = aprovalUser || null
        this.services = services || null
    }
}

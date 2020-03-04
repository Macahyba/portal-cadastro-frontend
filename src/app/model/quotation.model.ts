import { StatusModel } from './status.model';
import { UserModel } from './user.model';
import { EquipmentModel } from './equipament.model';
import { CustomerModel } from './customer.model';
import { ContactModel } from './contact.model';
import { ServiceModel } from './service.model';

export class QuotationModel {
    constructor(
        public id: number,
        public label: string,
        public totalPrice: number,
        public totalDiscount: number,
        public status: StatusModel,
        public creationDate: Date,
        public approvalDate: Date,
        public user: UserModel,
        public equipments: Set<EquipmentModel>,
        public customer: CustomerModel,
        public contact: ContactModel,
        public aprovalUser: UserModel,
        public services: Set<ServiceModel>
    ){}
}
import { CustomerModel } from './customer.model';

export class ContactModel {
    constructor();
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public department?: string,
        public customer?: CustomerModel
    ){}
}
import { ContactModel } from './contact.model';

export class CustomerModel {
    constructor();
    constructor(
        public id?: number,
        public name?: string,
        public fullName?: string,
        public cnpj?: string,
        public contacts?: Set<ContactModel>
    ){}
}
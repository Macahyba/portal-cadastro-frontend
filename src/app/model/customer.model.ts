import { ContactModel } from './contact.model';

export class CustomerModel {
    constructor(
        public id?: number,
        public name?: string,
        public fullName?: string,
        public cnpj?: string,
        public contacts?: Set<ContactModel>
    ){
        this.id = id || null
        this.name = name || null
        this.fullName = fullName || null
        this.cnpj = cnpj || null
        this.contacts = contacts || null
    }
}

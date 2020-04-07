export class UserModel {
    constructor(
        public id?: number,
        public username?: string,
        public fullName?: string,
        public email?: string,
        public role?: string,
        public phone?: string,
        ){
            this.id = id || null
            this.username = username || null
            this.fullName = fullName || null
            this.email = email || null
            this.role = role || null
            this.phone = phone || null
        }
}

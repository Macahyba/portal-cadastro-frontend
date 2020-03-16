export class UserModel {
    constructor(
        public id?: number,
        public login?: string,
        public name?: string,
        public email?: string,
        public profile?: string,
        public role?: string,
        public phone?: string,
        public password?: string
        ){
            this.id = id || null
            this.login = login || null
            this.name = name || null
            this.email = email || null
            this.profile = profile || null
            this.role = role || null
            this.phone = phone || null
            this.password = password || null
        }
}

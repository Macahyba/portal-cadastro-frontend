export class UserModel {
    constructor(
        public id: number,
        public login: string,
        public name: string,
        public email: string,
        public profile: string,
        public role: string,
        public phone: string,
        public password: string
        ){}
}
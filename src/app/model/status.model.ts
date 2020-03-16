export class StatusModel {
    constructor(
        public id?: number,
        public status?: string
    ){
        this.id = id || null
        this.status = status || null
    }
}

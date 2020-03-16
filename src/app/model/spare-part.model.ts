export class SparePartModel {
    constructor(
        public id?: number,
        public partNumber? : string
    ){
        this.id = id || null
        this.partNumber = partNumber || null
    }
}

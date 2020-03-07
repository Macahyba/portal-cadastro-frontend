export class SparePartModel {
    constructor(
        public id: number,
        public partNumber
    ){
        this.id = id || null
        this.partNumber = partNumber || null
    }
}
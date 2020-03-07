export class ServiceModel {
    
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number
    ){
        this.id = id || null
        this.name = name || null
        this.description = description || null
        this.price = price || null
    }
}
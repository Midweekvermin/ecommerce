// made using: ng generate class folder/name

export class Product {
    //constructors are called when an instance of the class is created to initialize its fields.
    //the below states that each product created will have all of the fields listed.
    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public description: string,
        public unitPrice: number,
        public imageUrl: string,
        public active: boolean,
        public unitsInStock: number,
        public dateCreated: Date,
        public lastUpdated: Date
    ){

    }
}

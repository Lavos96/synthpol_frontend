export class Product{
    name: string;
    image: string;
    description: string;
    price: number;

    constructor(name:string,image:string,desc:string, price:number){
        this.name = name;
        this.image = image;
        this.description = desc;
        this.price = price;
    }
}
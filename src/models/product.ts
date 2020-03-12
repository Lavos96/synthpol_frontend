export class Product{
    
    productId:number;
    name: string;
    vat: number;
    nettoPrice: number;
    description: string;
    photoString: string;
    providerId: number;
    provider: any;
    orderItems: any;
    
    constructor(name:string,image:string,desc:string, price:number,vat:number, providerId:number,productId:number,provider:any,orderedItems:any){
        this.name = name;
        this.photoString = image;
        this.description = desc;
        this.nettoPrice = price;
        this.vat = vat;
        this.productId = productId;
        this.providerId = providerId;
        this.provider = provider;
        this.orderItems = orderedItems;
    }
}
import { Injectable } from "@angular/core";
import { DataService } from './data/data.service';

@Injectable({providedIn:'root'})
export class ReduceCartCookieSize {
    constructor(private dataService: DataService){}

    reduceSizeOfCookie():string{
        let cookie = this.dataService.shoppingCart.map((product)=>{
            //let cookieProduct: number = product.productId;
            let cookieProduct: {productId:number,quantityOfProducts:number} = {productId:-1,quantityOfProducts:-1};
            cookieProduct.productId = product.productId;
            cookieProduct.quantityOfProducts = 0;
            this.dataService.shoppingCart.forEach((product)=>{
                if(product.productId === cookieProduct.productId){
                    cookieProduct.quantityOfProducts+=1;
                }
            })
            return cookieProduct;
        })
        
        const uniqueArray = cookie.filter((element, index) => {
            const _thing = JSON.stringify(element);
            return index === cookie.findIndex(obj => {
              return JSON.stringify(obj) === _thing;
            });
          });

        return JSON.stringify(uniqueArray);
    }

}
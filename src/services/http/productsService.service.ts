import { Injectable } from "@angular/core";
import { RequestSend } from '../requestSend.service';
import { of } from 'rxjs';
import { Product } from 'src/models/product';

@Injectable({providedIn:"root"})
export class ProductsService {
    constructor(private requestSend: RequestSend){

    }

    public getProductsList(params:any, mock: boolean){
        const thisApiEndpoint = "";
        const baseUrl = "";
        if(mock){
            const products = [
                new Product('Odżywka','assets/odzywka-biotech.jpg','Opis produktu fajnego he he',50.99),
                new Product('Odżywka 1','assets/odzywka-biotech.jpg','Opis produktu numer 1 fajnego he he',69.99),
                new Product('Odżywka 2','assets/odzywka-biotech.jpg','Opis produktu numer 2 fajnego he he. Przesyłam info.',45.99),
              ];
            return of(products);
        } else {
        return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }

    public getProductById(params:any, id: number, mock: boolean){
        const thisApiEndpoint = "";
        const baseUrl = "";
        if(mock){
            const product = new Product('Odżywka 3','assets/odzywka-biotech.jpg','Opis produktu numer 3 fajnego he he. Przesyłam info.',40.99);
            return of(product);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}
import { Injectable } from "@angular/core";
import { RequestSend } from '../requestSend.service';
import { of } from 'rxjs';
import { Product } from 'src/models/product';
import { EndpointsEnum } from '../endpointsEnum';

@Injectable({providedIn:"root"})
export class ProductsService {
    constructor(private requestSend: RequestSend){

    }

    public getProductsList(params:any, mock: boolean){
        const thisApiEndpoint = EndpointsEnum.PRODUCTS_LIST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            /*const products = [
                new Product('Odżywka','assets/odzywka-biotech.jpg','Opis produktu fajnego he he',50.99),
                new Product('Odżywka 1','assets/odzywka-biotech.jpg','Opis produktu numer 1 fajnego he he',69.99),
                new Product('Odżywka 2','assets/odzywka-biotech.jpg','Opis produktu numer 2 fajnego he he. Przesyłam info.',45.99),
              ];*/
              const products = [
                  new Product('Odżywka','assets/odzywka-biotech.jpg','Opis',40.99,18,-1,-1,0,0),
                  new Product('Odżywka 1','assets/odzywka-biotech.jpg','Opis 1',40.99,18,-1,-1,0,0),
                  new Product('Odżywka 2','assets/odzywka-biotech.jpg','Opis 2',40.99,18,-1,-1,0,0)
              ]
            return of(products);
        } else {
        return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }

    public getProductById(params:any, id: number, mock: boolean){
        const thisApiEndpoint = EndpointsEnum.PRODUCTS_BY_ID+id.toString();
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const product = new Product('Odżywka','assets/odzywka-biotech.jpg','Opis',40.99,18,-1,-1,0,0);
            return of(product);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}
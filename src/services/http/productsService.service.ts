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
        // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

        // adres endpointa
        const thisApiEndpoint = EndpointsEnum.PRODUCTS_LIST;
        // adres bazowy
        const baseUrl = EndpointsEnum.BASE_URL;
        // jesli flaga mock jest ustawiona na true to wyslij fakowe dane
        // w przecciwnym razie wykonaj zapytanie do backendu
        if(mock){
              const products = [
                  new Product('Odżywka','assets/odzywka-biotech.jpg','Opis',40.99,18,-1,-1,0,0,-1),
                  new Product('Odżywka 1','assets/odzywka-biotech.jpg','Opis 1',40.99,18,-1,-1,0,0,-1),
                  new Product('Odżywka 2','assets/odzywka-biotech.jpg','Opis 2',40.99,18,-1,-1,0,0,-1)
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
            const product = new Product('Odżywka','assets/odzywka-biotech.jpg','Opis',40.99,18,-1,-1,0,0,-1);
            return of(product);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}
import { Injectable } from "@angular/core";
import { RequestSend } from '../requestSend.service';
import { EndpointsEnum } from '../endpointsEnum';
import { Invoice } from 'src/models/invoice';
import { InvoicePersonalInfo } from 'src/models/invoicePersonalInfo';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrdersService {

    constructor(private requestSend: RequestSend){

    }

    public getOrdersList(params:any, mock: boolean){
        // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

        // adres endpointa
        const thisApiEndpoint = EndpointsEnum.ORDERS;
        // adres bazowy
        const baseUrl = EndpointsEnum.BASE_URL;
        // jesli flaga mock jest ustawiona na true to wyslij fakowe dane
        // w przecciwnym razie wykonaj zapytanie do backendu
        if(mock){
              const products = [
                  new Invoice(new InvoicePersonalInfo('Michał','Kowalczyk','Częstochowa','Wieniawskieo 24','42-202','','test'),[{productId:10,quantityOfProducts:4},{productId:3,quantityOfProducts:2}]),
                  new Invoice(new InvoicePersonalInfo('Agnieszka','Nowacka','Warszawa','Słowackiego 12','27-500','','test'),[{productId:15,quantityOfProducts:1}]),
                  new Invoice(new InvoicePersonalInfo('Martyna','Bies','Szczecin','Chopina 56','56-230','','test123'),[{productId:5,quantityOfProducts:2},{productId:7,quantityOfProducts:1}])
              ]
            return of(products);
        } else {
        return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }

    public postOrder(params:any,mock:boolean, invoice: Invoice){
         // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

        // adres endpointa
        const thisApiEndpoint = EndpointsEnum.ORDERS;
        // adres bazowy
        const baseUrl = EndpointsEnum.BASE_URL;
        // jesli flaga mock jest ustawiona na true to wyslij fakowe dane
        // w przecciwnym razie wykonaj zapytanie do backendu
        if(mock){
            return of(invoice);
        } else {
            return this.requestSend.postRequest(params,thisApiEndpoint,baseUrl,invoice);
        }
    }


    public getOrdersListWithProducts(params:any, mock: boolean){
        // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

        // adres endpointa
        const thisApiEndpoint = EndpointsEnum.ORDERS_WITH_PRODUCTS;
        // adres bazowy
        const baseUrl = EndpointsEnum.BASE_URL;
        // jesli flaga mock jest ustawiona na true to wyslij fakowe dane
        // w przecciwnym razie wykonaj zapytanie do backendu
        if(mock){
              const products = [
                  new Invoice(new InvoicePersonalInfo('Michał','Kowalczyk','Częstochowa','Wieniawskieo 24','42-202','','test'),[{productId:10,quantityOfProducts:4},{productId:3,quantityOfProducts:2}]),
                  new Invoice(new InvoicePersonalInfo('Agnieszka','Nowacka','Warszawa','Słowackiego 12','27-500','','test'),[{productId:15,quantityOfProducts:1}]),
                  new Invoice(new InvoicePersonalInfo('Martyna','Bies','Szczecin','Chopina 56','56-230','','test123'),[{productId:5,quantityOfProducts:2},{productId:7,quantityOfProducts:1}])
              ]
            return of(products);
        } else {
        return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }

}
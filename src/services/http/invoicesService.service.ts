import { Injectable } from "@angular/core";
import { RequestSend } from '../requestSend.service';
import { EndpointsEnum } from '../endpointsEnum';
import { Invoice } from 'src/models/invoice';
import { InvoicePersonalInfo } from 'src/models/invoicePersonalInfo';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InvoicesService {
    constructor(private requestSend: RequestSend){

    }

    public getInvoicesList(params:any, mock: boolean){
        // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

        // adres endpointa
        const thisApiEndpoint = EndpointsEnum.INVOICES;
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

    public getInvoiceEdiById(params:any, id: number,mock:boolean){
         // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

        // adres endpointa
        const thisApiEndpoint = EndpointsEnum.INVOICE_EDI_BY_ID+id.toString();
        // adres bazowy
        const baseUrl = EndpointsEnum.BASE_URL;
        // jesli flaga mock jest ustawiona na true to wyslij fakowe dane
        // w przecciwnym razie wykonaj zapytanie do backendu
        if(mock){
            return of('Zamockowane EDI');
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }

    }

    public getInvoiceXmlById(params:any, id: number,mock:boolean){
        // argument params zazwyczaj będzie nullem ale w przyszłości zapytanie mogłoby przyjmować jakieś dodatkowe parametry

       // adres endpointa
       const thisApiEndpoint = EndpointsEnum.INVOICE_XML_BY_ID+id.toString();
       // adres bazowy
       const baseUrl = EndpointsEnum.BASE_URL;
       // jesli flaga mock jest ustawiona na true to wyslij fakowe dane
       // w przecciwnym razie wykonaj zapytanie do backendu
       if(mock){
           return of('Zamockowane Xml');
       } else {
           return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
       }

   }

    public editInvoice(params: any, body: any,invoiceId: number, mock: boolean){
        const thisApiEndpoint = EndpointsEnum.INVOICES_BY_ID+invoiceId.toString();
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            return of(body);
        } else {
            return this.requestSend.putRequest(params,thisApiEndpoint,baseUrl,body);
        }
    }

    public deleteInvoice(params: any, invoiceId: number, mock: boolean){
        const thisApiEndpoint = EndpointsEnum.INVOICES_BY_ID+invoiceId.toString();
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            return of(`deleted invoice with id: ${invoiceId}`);
        } else {
            return this.requestSend.deleteRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}
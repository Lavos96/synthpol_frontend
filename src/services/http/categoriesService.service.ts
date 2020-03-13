import { Injectable } from "@angular/core";
import { RequestSend } from '../requestSend.service';
import { EndpointsEnum } from '../endpointsEnum';
import { Category } from 'src/models/category';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})

export class CategoriesService {

    constructor(private requestSend: RequestSend){
    }

    public getCategoriesList(params:any ,mock: boolean){
        const thisApiEndpoint = EndpointsEnum.CATEGORIES_LIST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const categories = [new Category(-1,'Kategoria',[]),
            new Category(-2,'Kategoria 2',[])];
            return of(categories);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}
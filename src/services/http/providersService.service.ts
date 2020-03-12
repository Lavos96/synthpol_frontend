import { Injectable } from "@angular/core";
import { RequestSend } from '../requestSend.service';
import { of } from 'rxjs';
import { EndpointsEnum } from '../endpointsEnum';

@Injectable({ providedIn: "root" })
export class ProvidersService {
    constructor(private requestSend: RequestSend) {

    }

    public getProvidersList(params:any,mock:boolean){
        const thisApiEndpoint = EndpointsEnum.PROVIDERS_LIST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const providers = ["All","Super Caps","Strong Caps","Xplode"];
            return of(providers);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }

    public getProviderById(params:any,id:number,mock:boolean){
        const thisApiEndpoint = EndpointsEnum.PROVIDERS_BY_ID+id.toString();
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const provider = ["Super Caps"]
            return of(provider);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class RequestSend {
    constructor(private http: HttpClient){
    }

    public getRequest(params:any,thisApiID:string,basePath:string){
        const url = basePath+thisApiID;
        if(params!==null){
        //return this.http.get<any>(url,{observe: 'response', headers: params.headers, params: params.queryParams});
            return this.http.get<any>(url,params);
        } else {
            return this.http.get<any>(url);
        }
    }

    public postRequest(params:any,thisApiID:string,basePath:string,body:any){
        const url = basePath+thisApiID;
        if(params!==null){
        return this.http.post<any>(url,{observe: 'response',body, headers: params.headers, params: params.queryParams});
        } else {
            return this.http.post<any>(url,body);
        }
    }

    public putRequest(params:any,thisApiID:string,basePath:string,body:any){
        const url = basePath+thisApiID;
        if(params!==null){
        return this.http.put<any>(url,{observe: 'response',body, headers: params.headers, params: params.queryParams});
        } else {
            return this.http.put<any>(url,body);
        }
    }

    public deleteRequest(params:any,thisApiID:string,basePath:string){
        const url = basePath+thisApiID;
        if(params!==null){
        return this.http.delete<any>(url,params);
        } else {
            console.log('URL: ', url);
            return this.http.delete<any>(url);
        }
    }
    
}
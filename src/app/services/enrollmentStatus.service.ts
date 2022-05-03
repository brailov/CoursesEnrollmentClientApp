import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICourse } from '../containers/interfaces/GeneralInterfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpAction } from '../containers/Enums/Enums';
import { Course, EnrollmentCourseFKey } from '../containers/classes/GeneralClasses';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentStatusService 
{
    private _baseUrl: string = undefined;
    constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
    
    ) { this._baseUrl = baseUrl; }
  
    public getEnrollmentStatus() :any {  
      return this.sendWebAPIRequest('/EnrollmentStatus', JSON.stringify(''), undefined, undefined, HttpAction.GET)
      .then((data:any) => { data as Course[]; return data;
      }).catch(err => {
        return `Error in communucation service: ${err}`;
      });  
    }
  
    public PostEnrollmentStatus(_key: EnrollmentCourseFKey) : any{
        return this.sendWebAPIRequest('/EnrollmentStatus', JSON.stringify(_key), undefined, undefined, HttpAction.POST)
        .then((data:any) => { return data;
        }).catch(err => {
            return `Error in communucation service: ${err}`;
        });        
    }     
    
    sendWebAPIRequest(urlRelativePath: string, dataObject: any, requestHeaders?: any, baseUrl?: string, action?: HttpAction) {
        
      let headers :HttpHeaders = new HttpHeaders();      
      headers = headers.set('Access-Control-Allow-Origin' , '*');
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      
      if(requestHeaders !== undefined ){   
        headers = requestHeaders;
      }
      if(action==null || action== undefined)
        action = HttpAction.GET;
  
      switch(action.toUpperCase()) { 
        case HttpAction.GET: { 
          return this.http
          .get(this._baseUrl + urlRelativePath,{ headers: headers})
          .toPromise(); 
           break; 
        } 
        case HttpAction.POST: { 
          return this.http
          .post(this._baseUrl + urlRelativePath, dataObject,{ headers: headers})
          .toPromise();
           break; 
        } 
        default: { 
          return this.http
          .post(this._baseUrl + urlRelativePath, dataObject,{ headers: headers})
          .toPromise();
           break; 
        } 
      }
    }
}
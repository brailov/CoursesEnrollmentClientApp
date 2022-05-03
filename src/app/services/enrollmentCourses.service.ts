import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICourse, IEnrollment } from '../containers/interfaces/GeneralInterfaces';
import { Course, EnrollmentCourseFKey } from '../containers/classes/GeneralClasses';
import { HttpAction } from '../containers/Enums/Enums';

@Injectable()
export class EnrollmentCoursesService {

    private _baseUrl: string = undefined;
    constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
    
    ) { this._baseUrl = baseUrl; }
  
    public GetEnrollmentCourses(_key: EnrollmentCourseFKey) :any {
      
      return this.sendWebAPIRequest('/EnrollmentCourses', JSON.stringify(''), undefined, undefined, HttpAction.GET)
      .then((data:any[]) => { 
        //if(!data)return [];
        //data = data.find(x=>x.studentID == studentID);
        return data;
      }).catch(err => {
        return `Error in communucation service: ${err}`;
      });
    }  

    public AddCourse(_key: EnrollmentCourseFKey) {

      return this.sendWebAPIRequest('/EnrollmentCourses', JSON.stringify(_key), undefined, undefined, HttpAction.POST)
      .then((data:any) => { return data; 
      }).catch(err => {
        return `Error in communucation service: ${err}`;
      });        
    }  

    public Delete(_key: EnrollmentCourseFKey) {           
        return this.sendWebAPIRequest('/EnrollmentCourses', _key, undefined, undefined, HttpAction.POST)
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
        case HttpAction.PUT: { 
          return this.http
          .put(this._baseUrl + urlRelativePath, dataObject,{ headers: headers})
          .toPromise();
           break; 
        } 
        case HttpAction.DELETE: { 
          return this.http
          .delete(this._baseUrl + urlRelativePath,{ headers: headers})
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
  
import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { IEmployeeDetailsDtos } from '../containers/interfaces/GeneralInterfaces';

@Injectable()
export class WorkerService {

  private _baseUrl: string = undefined;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  
  ) { this._baseUrl = baseUrl; }
/*
  public getEmployeeDetails(firstName, lastName, position) {
    return this.http.get<IEmployeeDetailsDtos>(this._baseUrl + 'Employee/byName?firstName=' + firstName + '&lastName=' + lastName + '&position=' + position + '');
  }

  public GetManager(firstName, lastName, position) {  
    return this.http.get<any>(this._baseUrl + 'Manager/byName?firstName=' + firstName + '&lastName=' + lastName + '&position=' + position + '');
  }

  public SaveManagerReportToEmployee(reportKeys) {
    return this.http.put<string>(this._baseUrl + 'Manager', reportKeys);
  }

  public SaveTaskToEmployee(taskKeys) {
    return this.http.put<string>(this._baseUrl + 'Employee/Task', taskKeys);
  }
*/
}

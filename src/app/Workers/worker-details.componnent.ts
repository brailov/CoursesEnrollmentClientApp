import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ManagerReportComponent } from './Dialog/managerreport.component';
import { WorkerService } from '../services/WorkerService';
import {
} from '../containers/classes/GeneralClasses';

import {
  IEmployeeDetailsDtos
} from '../containers/interfaces/GeneralInterfaces';
import { TaskReportComponent } from './Dialog/taskreport.component';

@Component({  // counter.component'
  selector: 'app-worker-details-component',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css'],
  providers: [MatDialog]
})
export class WorkerDetailsComponent implements OnInit {

  public _baseUrl: string = undefined;
 // public employeesDet: EmployeeDetailsDtos = new EmployeeDetailsDtos();
 //public tasks: Task[];
 // public manager: ManagerDtos;
  //public reports: Report[];
 // public employeeKey: EmployeeKey;

  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    public router: Router,
    public actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private workerService: WorkerService
  ) { this._baseUrl = baseUrl; }

  ngOnInit() {

    this.actRoute.params.subscribe(result => {
     // this.employeeKey = new EmployeeKey();
     // Object.assign(this.employeeKey, result);
      if (result)
        this.GetEmployeeDetails(result);
    }, error => console.error(error));
  }

  GetEmployeeDetails(data: Params) {

   /*  if (!data) return;
    this.workerService.getEmployeeDetails(data.firstName, data.lastName, data.position).subscribe((result: IEmployeeDetailsDtos) => {
      this.employeesDet = result;
      this.tasks = result.assignedTasks;
    }, error => console.error(error));

    this.workerService.GetManager(data.firstName, data.lastName, data.position).subscribe((result: any) => {

      if (result) {
        this.manager = new ManagerDtos();
        this.manager.FirstName = result.firstName;
        this.manager.LastName = result.lastName;
        this.manager.MyEmployees = result.myEmployees;
      }
    }, error => console.error(error));
 */
    // check if i (as a employee ) have subordinates
    //this.http.get<any>(this._baseUrl + 'Manager/byName?firstName=' + data.firstName + '&lastName=' + data.lastName + '').subscribe(result => {
    //  if (result) {
    //    this.manager = {
    //      FirstName: result.firstName,
    //      LastName: result.lastName,
    //      MyEmployees: result.myEmployees,
    //      SubReports: null //result.subReports
    //    }
    //  }
    //}, error => console.error(error));

  }

  PopUpTaskToEmployee() {
  /*   debugger
    if (this.employeeKey) {
      const dialogConfig2 = new MatDialogConfig();
      dialogConfig2.disableClose = true;
      dialogConfig2.autoFocus = true;
      dialogConfig2.data = {
        firstName: this.employeeKey.firstName,
        lastName: this.employeeKey.lastName,
        position: this.employeeKey.position
      };

      const dialogRef2 = this.dialog.open(TaskReportComponent, dialogConfig2);

      dialogRef2.afterClosed().subscribe(

        data => { if (data) alert(data) }
      );
    } */
  }

  PopUpReportToMananger() {

   /*  let text = this.employeeKey;
    if (this.employeeKey) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        firstName: this.employeeKey.firstName,
        lastName: this.employeeKey.lastName,
        position: this.employeeKey.position,
        mngrFirstName: this.manager.FirstName,
        mngrLastName: this.manager.LastName
      };

      const dialogRef = this.dialog.open(ManagerReportComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(

        data => { if (data) alert(data) }
      );
    } */
  }
}


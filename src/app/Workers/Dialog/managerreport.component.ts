import { Component, Inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
} from '../../containers/classes/GeneralClasses';
import { WorkerService } from '../../services/WorkerService';

@Component({  
  selector: 'app-managerreport-component',
  templateUrl: './managerreport.component.html'
})

export class ManagerReportComponent implements OnInit {
  public _baseUrl: string = undefined; 
  //public manager: ManagerDtos;
 // public employeeReport: MngrReportsDtos = new MngrReportsDtos();
  public mainform: FormGroup;
  public description: string;
 
  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ManagerReportComponent>,
    private workerService: WorkerService
  ) {
    this._baseUrl = baseUrl;
   /*  this.employeeReport.EmpFirstName = data.firstName;
    this.employeeReport.EmpLastName = data.lastName;
    this.employeeReport.EmpPosition = data.position;
    this.employeeReport.MngrFirstName = data.mngrFirstName;
    this.employeeReport.MngrLastName = data.mngrLastName; */
  }

  ngOnInit() {
    this.mainform = new FormGroup({
      text: new FormControl()
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    
    // this.employeeReport.date = "24/03/2022";
    // this.employeeReport.text = this.mainform.value.text;

    // this.workerService.SaveManagerReportToEmployee(this.employeeReport).subscribe((result) => {
    //    debugger
    //    //this.manager = result;
    //   if (result.toString() == 'Ok') alert("Saving report process ended with sucsses.");

    // }, error => {
        
    //     alert("Saving report process ended with failure; error: " + error.error.error.message);
    //     this.dialogRef.close();
    // });  
  }

}



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

export class TaskReportComponent implements OnInit {
  public _baseUrl: string = undefined;
  public mainform: FormGroup;
  public description: string;
//  newEmployeeTaskKey: EmployeeTaskKey = new EmployeeTaskKey();

  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskReportComponent>,
    private workerService: WorkerService
  ) {
    this._baseUrl = baseUrl;
    //this.newEmployeeTaskKey.firstName = data.firstName;
    //this.newEmployeeTaskKey.lastName = data.lastName;
    //this.newEmployeeTaskKey.position = data.position;

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

    //this.newEmployeeTaskKey.assignDate = this.mainform.value.text;
   // this.newEmployeeTaskKey.text = this.mainform.value.text;
  
   // this.workerService.SaveTaskToEmployee(this.newEmployeeTaskKey).subscribe((result: any) => {
 /*      debugger;
      //this.manager = result;
      if (result == 'Ok') alert("Saving task process ended with sucsses.");
    }, error => {
      debugger;
        alert("Saving task process ended with failure; error: " + error.error.error.message);
        this.dialogRef.close();
    });   */
  }

}

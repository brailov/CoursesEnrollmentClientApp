import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Console } from 'console';
import { Router } from '@angular/router';
import { Course, Enrollment, EnrollmentCourseFKey, EnrollmentIDStatus } from '../containers/classes/GeneralClasses';
import { ICourse } from '../containers/interfaces/GeneralInterfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/EnrollmentService';
import { EnrollmentCoursesService } from '../services/enrollmentCourses.service';
import { EnrollmentStatus } from '../containers/Enums/Enums';
import { EnrollmentStatusService } from '../services/enrollmentStatus.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']  
})
export class FetchDataComponent {
  
  public allCourses: Course[];
  public studentCourses: Course[];
  public enrollmentList: Enrollment[]=[];
  public enrollment: Enrollment;
  public enrollmentStatus: EnrollmentIDStatus;
  public enrollmentCourseFKey: EnrollmentCourseFKey;
  private _baseUrl: string = undefined;
  private _enrollmentStatus: string='';
  private staticStudendID: number = 1;
  private  intervals = [];

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              public router : Router,
              private courseService: CourseService,
              private enrollmentService: EnrollmentService,
              private enrollmentCoursesService: EnrollmentCoursesService,
              private enrollmentstatusService: EnrollmentStatusService
              ) {   
                
    this._baseUrl = baseUrl;   
  }

  ngOnInit() {
    
    this.GetAllCourse();
    this.GetEnrollmentStaus();   
  }
    
  public GetEnrollmentStaus() {
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.StudentID = this.staticStudendID; 

    this.enrollmentstatusService.PostEnrollmentStatus(this.enrollmentCourseFKey).then(data => {
      
      this.enrollmentStatus = Object.assign(new EnrollmentIDStatus(), data[0]);      
      this.UpdateEnrollmentStatus();
      console.log("Enrollment Status Service obj: " + this.enrollmentList);
    });
  }

  public GetEnrollmentDetails() {
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.StudentID = this.staticStudendID; 
    
    this.enrollmentService.GetEnrollmentDetails(this.staticStudendID).then(data => {
      this.SetEnrllmentList(data);
      console.log("Enrollment obj: " + this.enrollmentList)});
      
  }

  public GetAllCourse() {     
    this.courseService.getCourses().then(data => this.allCourses = data);     
  } 
  
  public UpdateEnrollmentStatus(){
    //const distinctEnrollmentType: any[] = [... new Set (this.enrollmentList.map(x=>x.Status))];        
     this._enrollmentStatus = EnrollmentStatus[this.enrollmentStatus.Status];
  }
  public isOverlapping(intervals, newInterval) {
    const a = this.convertTimeToNumber(newInterval[0]);
    const b = this.convertTimeToNumber(newInterval[1]);
   
    for (const interval of intervals) {
      const c = this.convertTimeToNumber(interval[0]);
      const d = this.convertTimeToNumber(interval[1]);
  
      if (a < d && b > c) {      
        alert("warning: there is a time ranges overlap"); return;
      }
    }    
  }
  public convertTimeToNumber(time) {
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]) / 60;
    return hours + minutes;
  }

  public AddCourseToEnrollment(_course: Course) {
        
    ///(Max(StartA, StartB) <= Min(EndA, EndB)
    if(this.studentCourses && this.studentCourses.length>0 && 
      this.studentCourses.find(x => x.Year == _course.Year && x.Semester == _course.Semester))
      {           
        let allIntervals:any[] = this.studentCourses.filter(x => x.Year == _course.Year && x.Semester == _course.Semester);
        if(allIntervals && allIntervals.length>0){
          allIntervals.forEach(element => {
            this.intervals.push([element.StartTime, '06:00']);            
          });  
          let interval =[_course.StartTime, '06:00'];
          //this.isOverlapping(this.intervals, interval);               
        }       
    }
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.CourseID = _course.CourseID;
    this.enrollmentCourseFKey.StudentID = this.enrollmentStatus.StudentID; 
    this.enrollmentCourseFKey.EnrollmentID = this.enrollmentStatus.EnrollmentID; 
    this.enrollmentCoursesService.AddCourse(this.enrollmentCourseFKey)
    .then(data => {if(!this.studentCourses || (this.studentCourses && this.studentCourses.length==0))
                    this.studentCourses=[];
                    this.studentCourses =[...data];
          //console.log("enrollmentCourses obj: " + data)
          this.GetEnrollmentStaus();        
          this.GetEnrollmentDetails();
    });
  
  }

  public AddEnrollment() {      
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.StudentID = 1;
              
    this.enrollmentService.GetEnrollmentDetails(this.enrollmentCourseFKey.StudentID)
    .then(data => {
      this.studentCourses = data;  console.log("studentCourses obj: " + this.studentCourses);
    });          
  }
  public SetEnrllmentList(data){
    
    if(data && data.length>0){
      data.forEach(element => {
        this.enrollmentList.push(Object.assign(new Enrollment(), element));
      });
    }
  }
  public DeleteEnrollment() {      
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.EnrollmentID = this.enrollmentStatus.EnrollmentID; 
    this.enrollmentCourseFKey.IsDelete = true;
   
    this.enrollmentService.PostEnrollment(this.enrollmentCourseFKey)
      .then( data => {
        console.log("DeleteEnrollment obj: " + data);
        this.studentCourses= undefined;
        this.enrollmentList = [];
        this.GetEnrollmentStaus();
        this.GetEnrollmentDetails();     
    });      
  }

  public DeleteEnrollmentCourses() {      
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.EnrollmentID = this.enrollmentStatus.EnrollmentID; 
    this.enrollmentCourseFKey.StudentID = this.enrollmentStatus.StudentID;
    this.enrollmentCourseFKey.IsDelete = true;
   
    this.enrollmentCoursesService.Delete(this.enrollmentCourseFKey)
      .then( data => { 
        if(data == null || data == undefined || data[0] == null) this.studentCourses =undefined;
        else this.studentCourses = [...data];     
        console.log("DeleteEnrollmentCourses obj: " + data);
        this.GetEnrollmentStaus();
        this.GetEnrollmentDetails();
      });   
  }

  public EndRegistration() {      
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.EnrollmentID = this.enrollmentStatus.EnrollmentID; 
    this.enrollmentCourseFKey.StudentID = this.enrollmentStatus.StudentID;
    this.enrollmentCourseFKey.IsEndRegistration = true;   
   
    this.enrollmentService.PostEnrollment(this.enrollmentCourseFKey)
      .then( data => {
        console.log("EndRegistration obj: " + data);
        this.GetEnrollmentStaus();
        this.GetEnrollmentDetails();
      });      
  }

  public Pay(){
    this.enrollmentCourseFKey = new EnrollmentCourseFKey();
    this.enrollmentCourseFKey.StudentID = this.enrollmentStatus.StudentID;
    this.enrollmentCourseFKey.IsPay = true;
   
    this.enrollmentService.PostEnrollment(this.enrollmentCourseFKey)
      .then( data => {
        console.log("DeleteEnrollment obj: " + data);
        this.GetEnrollmentStaus();
        this.GetEnrollmentDetails();
      });
  } 

}


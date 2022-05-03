import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from "@angular/material";
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WorkerDetailsComponent } from './Workers/worker-details.componnent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerReportComponent } from './Workers/Dialog/managerreport.component';
import { TaskReportComponent } from './Workers/Dialog/taskreport.component';

import { EnrollmentService } from './services/EnrollmentService';
import { CourseService } from './services/course.service';
import { EnrollmentCoursesService } from './services/enrollmentCourses.service';
import { EnrollmentStatusService } from './services/enrollmentStatus.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    WorkerDetailsComponent,
    ManagerReportComponent,
    TaskReportComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: FetchDataComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },    
      { path: 'workerdetails', component: WorkerDetailsComponent },
      // { path: '**', component: FetchDataComponent },     
    ]),
    BrowserAnimationsModule
  ],
  providers: [ EnrollmentService,CourseService,EnrollmentCoursesService,
               EnrollmentStatusService, {provide: 'BASE_URL', useValue: environment.API_URL},],
  bootstrap: [AppComponent],
  entryComponents: [ManagerReportComponent, TaskReportComponent]
})
export class AppModule { }

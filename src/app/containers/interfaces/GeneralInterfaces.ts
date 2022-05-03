import { Student,Course } from "../classes/GeneralClasses";
import { EnrollmentStatus } from "../Enums/Enums";

export interface IReport {
  text: string;
  date: string;
}

export interface IEmployeeDetailsDtos {
  FirstName: string;
  LastName: string;
  Position: string;
  assignedTasks: ITask[];
}

export interface ITask {
  text: string;
  assignDate: string;
  dueDate: string;
}

export interface IEmployees {
  FirstName: string;
  LastName: string;
  Position: string;
}
//-----------------------------------------------------//

export interface IEnrollment
{
  EnrollmentID: number;
  CourseID: number;
  StudentID: number;
  Status? : EnrollmentStatus 
  Course :Course
  Student :Student
}

export interface ICourse
{
  [x: string]: any;
  CourseID: number;
  Title: string;
  LectorName: string;
  Year : number;
  Semester: string;
  Mandatory: number;   
  Credits: number;
  Duration : Date;
}


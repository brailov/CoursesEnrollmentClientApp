import { EnrollmentStatus } from "../Enums/Enums";

export class StudentKey
{
  StudentID: number;
}
export class Student
{
  StudentID: number;
  FirstName: string;
  LastName: string;  
  EnrollmentDate : Date;
}

export class CourseKey
{
  CourseID: number;
}
export class Course
{
  CourseID: number;
  Title?: string;
  LectorName?: string;
  Year?: number;
  Semester?: string;
  Mandatory?: number;   
  Credits?: number;
  Duration? : Date;
  StartTime? : Date;
}
export class EnrollmentIDStatus
{
  EnrollmentID: number;
  StudentID: number;
  Status? : EnrollmentStatus;
}
export class EnrollmentKey
{
  EnrollmentID: number;
  CourseID: number;
  StudentID: number;
}
export class Enrollment
{
  EnrollmentID: number;
  CourseID: number;
  StudentID: number;
  Status? : EnrollmentStatus 

  Course :Course
  Student :Student
}

export class EnrollmentCourseFKey
{ 
  CourseID? : number;
  StudentID: number;
  EnrollmentID: number;
  IsDelete?: boolean;
  IsEndRegistration?: boolean;
  IsPay?: boolean;
}


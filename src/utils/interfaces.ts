enum Gender { // Use PascalCase for enums
    Male = "male",
    Female = "female"
}
  
export interface Applicant {
    applicant_id: number;
    full_name: string;
    course: string;
    age: number;
    gender: Gender;
    contact: number;
    registrationDate: Date;
    status: string;
    address: string;
    school_name: string;
    fbAccount: string;
    dept?: string;
}

export interface WorkingScholar {
    id: number;
    name: string;
    gender: string;
    course: string;
    age: number;
    applicantFk: number;
    dept_fk: number;
  }
  
export interface Department {
    id: number;
    name: string;
}

export type UserType = "admin" | "staff" | "ws";

export interface User {
  user_id: number;
  username: string;
  password: string;
  userType: UserType;
  deptName: string;
  exp?: number;
}
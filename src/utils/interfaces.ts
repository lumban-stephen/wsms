enum Gender { // Use PascalCase for enums
    Male = "male",
    Female = "female"
}
  
export interface Applicant {
    id: number;
    name: string;
    course: string;
    age: number;
    gender: Gender;
    contact: number;
    registrationDate: Date;
    status: string;
}
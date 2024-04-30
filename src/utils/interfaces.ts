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
}
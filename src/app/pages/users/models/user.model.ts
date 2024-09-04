export interface User {
    _id?: any;
    username: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: "male" | "female";
    userType: "admin" | "employee" | "owner";
    isActive : boolean;
  }
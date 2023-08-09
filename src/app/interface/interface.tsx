export interface Iregister {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    contactNumber: number;
    address: string;
    email: string;
    password: string;
  }
  export interface Ilogin {
    email: string;
    password: string;
  }
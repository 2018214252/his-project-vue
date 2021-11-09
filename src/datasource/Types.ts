export interface Department {
  id?: string;
  name?: string;
}

export interface Doctor {
  id?: string;
  name?: string;
  department?: string;
  details?: string; 
}

export interface Medicine {
  id?: string;
  name?: string;
  inventory?: number;
  price?: number;
  details?: string; 
}

export interface User {
  id?: string;
  role?: number;
  userName?: string;
  password?: string;
}

export interface Regd{
  id?: string;
  department?: string;
  doctor?: string;
  patientName?: string;
  patientNumber?: string;
  flag?: string;
  createTime?: string;
  medicalTime?: string;
}

export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}

export interface Prescription{
  id?:string;
  pid?:string;
  mid?:string;
  medicineInventory:number;
  medicineName?:string;
  medicinePrice?:number;
  medicineDetails?:string;
}

export interface MedicalRecord{
  id?:string;
  details?:string;
  createTime?:string;
}


export interface UserForm {
  userName?: string;
  password?: string;
}


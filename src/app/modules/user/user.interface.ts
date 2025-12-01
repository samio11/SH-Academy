export enum ERole {
  student = "student",
  admin = "admin",
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  role: ERole;
  isBlocked: boolean;
}

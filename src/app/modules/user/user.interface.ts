export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  role: "student" | "admin";
  isBlocked: boolean;
}

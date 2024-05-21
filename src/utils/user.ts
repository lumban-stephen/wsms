import { UserType } from "./userTypes";

export interface User {
  user_id: number;
  username: string;
  password: string;
  user_type: UserType;
  userdetail_fk: number;
  dept_fk: number;
}
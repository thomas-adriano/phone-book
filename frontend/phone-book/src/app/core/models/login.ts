import { User } from './user';

export interface LoginModel {
  token: string;
  user: User;
}

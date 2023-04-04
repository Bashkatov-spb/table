import { Education } from '../../education/types/EducationTypes';

export interface UsersState {
  users: User[];
  selectedUser: undefined | number;
  error: undefined | string;
}

export interface User {
  id?: number;
  name: string;
  EducationTypes: Education[];
}

export type UserId = User['id'];

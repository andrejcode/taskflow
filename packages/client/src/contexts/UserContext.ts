import { createContext } from 'react';
import { type UserDto } from '@server/shared/dtos';

export interface UserContextType {
  token: string | null;
  user: null | UserDto;
  isLoading: boolean;
  saveToken: (token: string) => void;
  removeToken: () => void;
  saveUser: (user: UserDto) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;

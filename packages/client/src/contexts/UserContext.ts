import { createContext } from 'react';
import type UserDto from '@server/shared/dtos';

export interface UserContextType {
  user: null | UserDto;
  isLoading: boolean;
  error: string | null;
  saveUser: (user: UserDto) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;

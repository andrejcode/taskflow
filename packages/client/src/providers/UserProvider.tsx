import { useState, useEffect } from 'react';
import UserContext, { type UserContextType } from '@/contexts/UserContext';
import {
  getTokenFromLocalStorage,
  checkTokenExpiration,
  removeTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from '@/utils/auth';
import { type UserDto } from '@server/shared/dtos';
import useToastContext from '@/hooks/useToastContext';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextType['user'] | null>(null);
  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());
  const [isLoading, setIsLoading] = useState(true);

  const { addToast } = useToastContext();

  useEffect(() => {
    if (!token) {
      setToken(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userDto = (await response.json()) as UserDto;
          setUser(userDto);
        } else {
          if (await checkTokenExpiration(response)) {
            removeToken();
            removeUser();
            addToast('Your session has expired. Please log in again.', 'error');
          } else {
            throw new Error('Unable to get user data.');
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          addToast(error.message, 'error');
        } else {
          addToast('An unexpected error occurred while getting the user.', 'error');
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, [token, addToast]);

  const saveUser = (user: UserDto) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const saveToken = (token: string) => {
    saveTokenToLocalStorage(token);
    setToken(token);
  };

  const removeToken = () => {
    removeTokenFromLocalStorage();
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ token, saveToken, removeToken, user, isLoading, saveUser, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

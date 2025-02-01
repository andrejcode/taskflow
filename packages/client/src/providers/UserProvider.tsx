import { useState, useEffect } from 'react';
import UserContext, { type UserContextType } from '@/contexts/UserContext';
import { getUserToken } from '@/utils/auth';
import { type UserDto } from '@server/shared/dtos';
import useHandleTokenExpiration from '@/hooks/useHandleTokenExpiration';
import useToastContext from '@/hooks/useToastContext';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextType['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToastContext();

  const { checkTokenExpiration } = useHandleTokenExpiration();

  useEffect(() => {
    const token = getUserToken();

    if (!token) {
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
          await checkTokenExpiration(response);
          throw new Error('Unable to get user data.');
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

    if (!user) {
      void fetchUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkTokenExpiration]);

  const saveUser = (user: UserDto) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}

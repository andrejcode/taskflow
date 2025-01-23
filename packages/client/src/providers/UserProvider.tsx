import { useState, useEffect } from 'react';
import UserContext, { type UserContextType } from '@/contexts/UserContext';
import { getUserToken } from '@/utils/auth';
import UserDto from '@server/shared/dtos';
import useHandleTokenExpiration from '@/hooks/useHandleTokenExpiration';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextType['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { checkTokenExpiration } = useHandleTokenExpiration();

  useEffect(() => {
    const token = getUserToken();

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/users/profile', {
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

          setError('Unable to get user data.');
          setUser(null);
        }
      } catch {
        setError('An unexpected error occurred.');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user && token) {
      void fetchUser();
    }
  }, [checkTokenExpiration, user]);

  const saveUser = (user: UserDto) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, error, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}

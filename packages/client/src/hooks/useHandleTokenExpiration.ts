import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { removeUserToken } from '@/utils/auth';

export default function useHandleTokenExpiration() {
  const navigate = useNavigate();

  const handleTokenExpiration = useCallback(() => {
    removeUserToken();
    void navigate('/login');
  }, [navigate]);

  const checkTokenExpiration = useCallback(
    async (response: Response) => {
      const responseText = await response.text();

      if (response.status === 401 && responseText === 'Token expired.') {
        handleTokenExpiration();
      }
    },
    [handleTokenExpiration]
  );

  return { checkTokenExpiration };
}

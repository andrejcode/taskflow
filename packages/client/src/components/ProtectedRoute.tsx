import useUserContext from '@/hooks/useUserContext';
import LoadingSpinner from './ui/LoadingSpinner';
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

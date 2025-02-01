import AuthForm from '@/components/AuthForm';
import useUserContext from '@/hooks/useUserContext';
import { Navigate } from 'react-router';

export default function Signup() {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/workspaces" />;
  }

  return <AuthForm isLogin={false} />;
}

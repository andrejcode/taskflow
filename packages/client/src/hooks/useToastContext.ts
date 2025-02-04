import { useContext } from 'react';
import ToastContext from '@/contexts/ToastContext';

export default function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
}

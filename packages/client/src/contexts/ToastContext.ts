import { AlertVariant } from '@/types';
import { createContext } from 'react';

export interface Toast {
  id: number;
  message: string;
  variant: AlertVariant;
}

export interface ToastContextType {
  addToast: (message: string, variant: AlertVariant) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export default ToastContext;

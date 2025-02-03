import Alert from '@/components/ui/Alert';
import ToastContext, { Toast } from '@/contexts/ToastContext';
import { AlertVariant } from '@/types';
import { useState, useCallback, useEffect } from 'react';

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, variant: AlertVariant) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, variant }]);
  }, []);

  useEffect(() => {
    const latestToast = toasts[toasts.length - 1];
    if (latestToast) {
      const timer = setTimeout(() => {
        removeToast(latestToast.id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      <>
        <div className="toast toast-end z-50">
          {toasts.map((toast, index) => (
            <Alert key={index} message={toast.message} variant={toast.variant} />
          ))}
        </div>
        {children}
      </>
    </ToastContext.Provider>
  );
}

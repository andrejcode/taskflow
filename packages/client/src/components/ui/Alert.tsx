import clsx from 'clsx';
import { AlertVariant } from '@/types';

interface AlertProps {
  message: string;
  variant?: AlertVariant;
}

export default function Alert({ message, variant = 'info' }: AlertProps) {
  const alertClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };

  return (
    <>
      <div role="alert" data-testid="alert" className={clsx('alert', alertClasses[variant])}>
        <span>{message}</span>
      </div>
    </>
  );
}

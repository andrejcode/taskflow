import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'lg' }: LoadingSpinnerProps) {
  const sizeVariants = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  return (
    <span
      data-testid="loading-spinner"
      className={clsx('loading loading-spinner', sizeVariants[size])}
    />
  );
}

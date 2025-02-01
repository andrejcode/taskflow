import clsx from 'clsx';

interface WorkspaceItemProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

export default function WorkspaceItem({ title, variant = 'primary', onClick }: WorkspaceItemProps) {
  return (
    <li
      className={clsx(
        'card cursor-pointer shadow-lg',
        variant === 'primary'
          ? 'bg-primary text-primary-content'
          : 'bg-secondary text-secondary-content'
      )}
      onClick={onClick}
    >
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title">{title}</h2>
      </div>
    </li>
  );
}

import clsx from 'clsx';

interface ListItemProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

export default function ListItem({ title, variant = 'primary', onClick }: ListItemProps) {
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
      <div className="card-body">
        <h2 className="card-title truncate">{title}</h2>
      </div>
    </li>
  );
}

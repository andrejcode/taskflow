interface DropdownProps {
  className?: string;
  buttonClassName?: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export default function Dropdown({
  className = '',
  buttonClassName = '',
  trigger,
  content,
}: DropdownProps) {
  return (
    <div className={`dropdown ${className}`}>
      <div tabIndex={0} role="button" className={`btn ${buttonClassName}`}>
        {trigger}
      </div>
      {content}
    </div>
  );
}

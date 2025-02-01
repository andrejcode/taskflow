import { getInitials } from '@/utils/user';

export default function Avatar({ name }: { name: string }) {
  return (
    <div className="avatar placeholder">
      <div className="w-10 rounded-full bg-neutral text-neutral-content">
        <span className="text-sm">{getInitials(name)}</span>
      </div>
    </div>
  );
}

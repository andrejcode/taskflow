export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, 2).join('');
}

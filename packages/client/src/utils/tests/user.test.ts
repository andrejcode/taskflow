import { describe, expect, it } from 'vitest';
import { getInitials } from '../user';

describe('getInitials', () => {
  it('should return the initials of the name', () => {
    const name = 'John Doe';
    expect(getInitials(name)).toBe('JD');
  });

  it('should return the initials of the name with multiple words', () => {
    const name = 'John Doe Smith';
    expect(getInitials(name)).toBe('JD');
  });
});

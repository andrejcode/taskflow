import { describe, expect, it } from 'vitest';
import { isDuplicateEmailError, isValidObjectId } from '../mongo';

describe('isDuplicateEmailError', () => {
  it('should return true for a duplicate email error', () => {
    const error = {
      code: 11000,
      keyValue: { email: 'some@email.com' },
    };

    const result = isDuplicateEmailError(error);
    expect(result).toBe(true);
  });

  it('should return false for a non-duplicate email error', () => {
    const error = new Error('Some error message');
    const result = isDuplicateEmailError(error);
    expect(result).toBe(false);
  });
});

describe('isValidId', () => {
  it('should return true for a valid id', () => {
    const result = isValidObjectId('5f9d3b3c7f3dfe5a2f3f7f3d');
    expect(result).toBe(true);
  });

  it('should return false for an invalid id', () => {
    const result = isValidObjectId('invalid-id');
    expect(result).toBe(false);
  });
});

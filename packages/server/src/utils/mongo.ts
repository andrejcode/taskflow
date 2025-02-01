import mongoose from 'mongoose';

export function isDuplicateEmailError(error: unknown) {
  const DUPLICATE_KEY_ERROR_CODE = 11000;

  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === DUPLICATE_KEY_ERROR_CODE &&
    'keyValue' in error &&
    typeof error.keyValue === 'object' &&
    error.keyValue !== null &&
    'email' in error.keyValue
  );
}

export function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

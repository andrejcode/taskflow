export function isMongoDBDuplicateKeyError(
  error: unknown
): error is { code: number; keyValue: Record<string, any> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as any).code === 11000 &&
    'keyValue' in error
  );
}

/**
 * Normalizes an unknown error value into a user-facing message.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error.length > 0) {
    return error;
  }

  return 'Unable to load the content.';
}

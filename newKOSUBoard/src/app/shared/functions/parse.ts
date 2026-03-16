export function parseHttpError(error: any): string {
  return error?.error?.message || error?.message || 'Unknown error';
}
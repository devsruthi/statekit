/**
 * Joins class names, omitting falsy values.
 */
export function cx(
  ...classNames: Array<string | false | null | undefined>
): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Determine whether or not a given string is empty
 * @param str The string to parse
 * @returns boolean
 */
export function stringIsEmpty(str: string | undefined): boolean {
  return typeof str === 'undefined'
    ? true
    : str.replace(/\s/g, '').length === 0;
}

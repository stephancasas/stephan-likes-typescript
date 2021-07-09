/**
 * The value, in milliseconds, of a single day.
 */
export const DAY = 86400000;

/**
 * The date format to use when rendering strings.
 */
export const DATE_FORMAT = [
  { month: '2-digit' },
  { day: '2-digit' },
  { year: 'numeric' }
];

/**
 * The separator to use when formatting date string.
 */
export const DATE_SEPERATOR = '/';

/**
 * Return the value of a given amount of days, in milliseconds.
 * @param amount The number of days to compute.
 * @returns number
 */
export function day(amount: number = 1) {
  return DAY * amount;
}

/**
 * Compute the amount of days between two given dates.
 * @param floor The first date to compare.
 * @param ceiling The second date to compare.
 * @returns number
 */
export function daysBetween(floor: Date | string, ceiling: Date | string) {
  return Math.abs(
    (midnight(ceiling).getTime() - midnight(floor).getTime()) / DAY
  );
}

/**
 * Advance a given date or string by one calendar day.
 * @param date The date object or date-formatted string to advance.
 * @returns Date
 */
export function tick(date: Date | string, by: number = 1): Date {
  if (typeof date === 'string') date = new Date(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + by);
}

/**
 * Reduce a given date to its midnight position.
 * @param date The date object or date-formatted string to normalize.
 * @returns Date
 */
export function midnight(date: Date | string): Date {
  return tick(date, 0);
}

/**
 * Convert a date object or existing date string to a normalized string.
 * @param date The date object or date-formatted string to convert.
 * @returns string
 */
export function stringifyDate(date: Date | string): string {
  return DATE_FORMAT.map((format) =>
    new Intl.DateTimeFormat('en', <any>format).format(midnight(date))
  ).join(DATE_SEPERATOR);
}

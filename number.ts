/**
 * Given a series of numbers, return one value greater than the largest.
 * @param numbers The array of numbers to consider.
 * @returns number
 */
export function findNextSequence(numbers: Array<number | any>): number {
  const last = numbers
    .filter((number) => typeof number === 'number' && !isNaN(number))
    .sort((a, b) => a - b)
    .slice(-1);
  return (last?.[0] || 0) + 1;
}

/**
 * Check if type is whole number literal.
 * `number` type is false as it can be fractional.
 * @see https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
 */
export type IsWhole<N extends number> = number extends N
  ? false
  : `${N}` extends `${number}.${number}` ? false : true

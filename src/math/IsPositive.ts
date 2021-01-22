/**
 * Check if type of positive number literal
 * `number` type is false as it can be negative.
 * @see https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
 */
export type IsPositive<N extends number> = number extends N
  ? false
  : `${N}` extends `-${number}` ? false : true

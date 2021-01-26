/**
 * Check if type is whole number literal.
 * `number` type is false as it can be fractional.
 * @see https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
 */
export type IsWhole<N extends number, Then = true, Else = false> =
  number extends N
  ? Else
  : `${N}` extends `${number}.${number}` ? Else : Then

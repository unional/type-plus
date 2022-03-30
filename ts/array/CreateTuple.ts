import { IsPositive } from '../math'

/**
 * Creates `Tuple<T>` with `L` number of elements.
 * @note updated implementation based on below
 * @see https://github.com/microsoft/TypeScript/issues/47874#issuecomment-1039157322
 */
export type CreateTuple<L extends number, T = any, A extends T[] = []> =
  IsPositive<L> extends true
  ? L extends A['length'] ? A : CreateTuple<L, T, [T, ...A]>
  : never

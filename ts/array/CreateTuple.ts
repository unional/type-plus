import { IsPositive } from '../math'

type BuildPowersOf2LengthArrays<N extends number, R extends never[][]> =
  R[0][N] extends never ? R : BuildPowersOf2LengthArrays<N, [[...R[0], ...R[0]], ...R]>

type ConcatLargestUntilDone<N extends number, R extends never[][], B extends never[]> =
  B['length'] extends N ? B : [...R[0], ...B][N] extends never
  ? ConcatLargestUntilDone<N, R extends [R[0], ...infer U] ? U extends never[][] ? U : never : never, B>
  : ConcatLargestUntilDone<N, R extends [R[0], ...infer U] ? U extends never[][] ? U : never : never, [...R[0], ...B]>

type Replace<R extends any[], T> = { [K in keyof R]: T }

/**
 * Creates `Tuple<T>` with `L` number of elements.
 * @note The original implementation hits recursive limit.
 * Updated implementation based on below by @lazytype
 * @see https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674514787
 * @see https://github.com/microsoft/TypeScript/issues/47874#issuecomment-1039157322
 */
export type CreateTuple<L extends number, T = any> =
  number extends L ? T[] : IsPositive<L> extends true
  ? {
    [K in L]: BuildPowersOf2LengthArrays<K, [[never]]> extends infer U
    ? (U extends never[][] ? Replace<ConcatLargestUntilDone<K, U, []>, T> : never)
    : never
  }[L]
  : never

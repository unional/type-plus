import type { IsPositive } from '../math'

/**
 * Creates `Tuple<T>` with `L` number of elements.
 */
export type CreateTuple<L extends number, T = any> =
  IsPositive<L> extends true ? CreateTuple.Device<[], L, T> : never

export namespace CreateTuple {
  export type Device<R extends any[], L extends number, T> =
    R['length'] extends L ? R : Device<[T, ...R], L, T>
}

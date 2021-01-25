import { IsPositive } from '../math'

export type CreateTuple<L extends number, T = any> =
  IsPositive<L> extends true ? Device<[], L, T> : never

type Device<R extends any[], L extends number, T> =
  R['length'] extends L ? R : Device<[T, ...R], L, T>

export type CreateTuple<L extends number, T = any> = Device<[], L, T>

type Device<R extends any[], L extends number, T> =
  R['length'] extends L ? R : Device<[T, ...R], L, T>

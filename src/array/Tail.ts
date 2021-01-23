import { UnionOfValues } from './UnionOfValues'

export type Tail<T extends any[]> = T['length'] extends 0
  ? never
  : (T extends [any, ...infer Tail]
    ? (Tail extends UnionOfValues<T>[] ? Tail : never)
    : T)

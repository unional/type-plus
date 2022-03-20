import type { Head, Tail } from '../array'
import type { And, Equal } from '../predicates'
import type { Digit, DigitArray } from './Digit'
import type { IsPositive } from './IsPositive'
import type { IsWhole } from './IsWhole'

export type Max<A extends number, B extends number, Fail = never> =
  And<IsPositive<A>, IsWhole<A>> extends false ? Fail :
  And<IsPositive<B>, IsWhole<B>> extends false ? Fail :
  number extends A ? Fail :
  number extends B ? Fail :
  Equal<A, B> extends true ? A :
  Max.OnPositiveWhole<A, B>

export namespace Max {
  export type OnPositiveWhole<A extends number, B extends number> = (
    DigitArray.FromNumber<A> extends infer DA ? DA extends number[] ?
    DigitArray.FromNumber<B> extends infer DB ? DB extends number[] ?
    OnDigitArray<DA, DB> extends DA ? A : B
    : never : never
    : never : never
  )

  export type OnDigitArray<DA extends number[], DB extends number[]> =
    Equal<DA['length'], DB['length']> extends true
    ? (Equal<Head<DA>, Head<DB>> extends true
      ? (Tail<DA> extends infer TDA ? TDA extends number[] ?
        OnDigitArray<TDA, Tail<DB>> extends TDA ? DA : DB
        : never : never)
      : Digit.GreaterThan<Head<DA>, Head<DB>> extends true ? DA : DB)
    : OnPositiveWhole<DA['length'], DB['length']> extends DA['length'] ? DA : DB
}

import type { Head, PadLeft, Tail } from '../array'
import type { And, Equal, Or, Xor } from '../predicates'
import { Abs } from './Abs'
import type { Digit, DigitArray } from './Digit'
import type { IsPositive } from './IsPositive'
import type { IsWhole } from './IsWhole'
import type { Max } from './Max'

export type GreaterThan<A extends number, B extends number, Fail = never> =
  And<IsWhole<A>, IsWhole<B>> extends false ? Fail :
  number extends A ? Fail :
  number extends B ? Fail :
  Equal<A, B> extends true ? false :
  Xor<IsPositive<A>, IsPositive<B>> extends true ? IsPositive<A> :
  Or<IsPositive<B>, IsPositive<B>> extends false ? GreaterThan<Abs<B>, Abs<A>> :
  GreaterThan.OnPositiveWhole<A, B>

export namespace GreaterThan {
  export type OnPositiveWhole<A extends number, B extends number> = (
    DigitArray.FromNumber<A> extends infer DA ? DA extends number[] ?
    DigitArray.FromNumber<B> extends infer DB ? DB extends number[] ?
    Max<DA['length'], DB['length']> extends infer M ? M extends number ?
    PadLeft<DA, M, 0> extends infer PDA ? PDA extends number[] ?
    PadLeft<DB, M, 0> extends infer PDB ? PDB extends number[] ?
    OnDigitArray<PDA, PDB>
    : never : never
    : never : never
    : never : never
    : never : never
    : never : never
  )

  export type OnDigitArray<DA extends number[], DB extends number[]> = (
    Equal<Head<DA>, Head<DB>> extends true
    ? OnDigitArray<Tail<DA>, Tail<DB>>
    : Digit.GreaterThan<Head<DA>, Head<DB>>
  )
}

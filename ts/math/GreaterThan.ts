import type { Head, PadLeft, Tail } from '../array'
import type { And, Equal, Or, Xor } from '../predicates'
import type { Digit, DigitArray } from './Digit'
import type { IsPositive } from './IsPositive'
import type { IsWhole } from './IsWhole'
import type { Max } from './Max'

export type GreaterThan<A extends number, B extends number, True = true, False = false> =
  And<IsWhole<A>, IsWhole<B>> extends false ? False :
  number extends A ? False :
  number extends B ? False :
  Equal<A, B> extends true ? False :
  Xor<IsPositive<A>, IsPositive<B>> extends true ? IsPositive<A, True, False> :
  Or<IsPositive<B>, IsPositive<B>> extends false ? GreaterThan.ForWholeNumber<B, A, True, False> :
  GreaterThan.ForWholeNumber<A, B, True, False>

export namespace GreaterThan {
  export type ForWholeNumber<A extends number, B extends number, True, False> = (
    ToAbsDigitArray<A> extends infer DA ? DA extends number[] ?
    ToAbsDigitArray<B> extends infer DB ? DB extends number[] ?
    Max<DA['length'], DB['length']> extends infer M ? M extends number ?
    PadLeft<DA, M, 0> extends infer PDA ? PDA extends number[] ?
    PadLeft<DB, M, 0> extends infer PDB ? PDB extends number[] ?
    ForDigitArray<PDA, PDB, True, False>
    : never : never
    : never : never
    : never : never
    : never : never
    : never : never
  )

  export type ForDigitArray<DA extends number[], DB extends number[], True, False> = (
    Equal<Head<DA>, Head<DB>> extends true
    ? ForDigitArray<Tail<DA>, Tail<DB>, True, False>
    : Digit.GreaterThan<Head<DA>, Head<DB>, True, False>
  )

  export type TrimMinusSign<N extends string> = N extends `-${infer rest}` ? rest : N

  export type ToAbsDigitArray<N extends number> = DigitArray.FromString<TrimMinusSign<`${N}`>>
}

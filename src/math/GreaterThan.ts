import { Head, PadLeft, Tail } from '../array'
import { Equal } from '../assertion'
import { And } from '../conditional'
import { Digit, DigitArray } from './Digit'
import { IsPositive } from './IsPositive'
import { IsWhole } from './IsWhole'
import { Max } from './Max'

export type GreaterThan<A extends number, B extends number, Fail = never> =
  And<IsPositive<A>, IsWhole<A>> extends false ? Fail :
  And<IsPositive<B>, IsWhole<B>> extends false ? Fail :
  number extends A ? Fail :
  number extends B ? Fail :
  Equal<A, B> extends true ? false :
  GreaterThanOnPositiveWhole<A, B>

type GreaterThanOnPositiveWhole<A extends number, B extends number> = (
  DigitArray.FromNumber<A> extends infer DA ? DA extends number[] ?
  DigitArray.FromNumber<B> extends infer DB ? DB extends number[] ?
  Max<DA['length'], DB['length']> extends infer M ? M extends number ?
  PadLeft<DA, M, 0> extends infer PDA ? PDA extends number[] ?
  PadLeft<DB, M, 0> extends infer PDB ? PDB extends number[] ?
  GreaterThanOnDigitArray<PDA, PDB>
  : never : never
  : never : never
  : never : never
  : never : never
  : never : never
)

type GreaterThanOnDigitArray<DA extends number[], DB extends number[]> = (
  Equal<DA['length'], DB['length']> extends true ?
  Equal<Head<DA>, Head<DB>> extends true ?
  GreaterThanOnDigitArray<Tail<DA>, Tail<DB>> extends Tail<DA> ? true : false :
  Digit.GreaterThan<Head<DA>, Head<DB>> extends true ? true : false :
  GreaterThanOnPositiveWhole<DA['length'], DB['length']> extends DA['length'] ? true : false
)

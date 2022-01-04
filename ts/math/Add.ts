import { PadLeft } from '../array'
import { And } from '../predicates'
import { Digit, DigitArray } from './Digit'
import { IsPositive } from './IsPositive'
import { IsWhole } from './IsWhole'
import { Max } from './Max'

/**
 * Add two number literals.
 */
export type Add<A extends number, B extends number, Fail = never> =
  And<
    And<IsPositive<A>, IsWhole<A>>,
    And<IsPositive<B>, IsWhole<B>>
  > extends false ? Fail :
  DigitArray.FromNumber<A> extends infer DA ? DA extends number[] ?
  DigitArray.FromNumber<B> extends infer DB ? DB extends number[] ?
  Max<DA['length'], DB['length']> extends infer M ? M extends number ?
  PadLeft<DA, M, 0> extends infer PDA ? PDA extends number[] ?
  PadLeft<DB, M, 0> extends infer PDB ? PDB extends number[] ?
  DigitArray.ToNumber<AddDigitArray<PDA, PDB>>
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail

type AddDigitArray<A extends number[], B extends number[]> = (
  A extends [any, ...infer ATail]
  ? (ATail extends number[]
    ? (B extends [any, ...infer BTail]
      ? (BTail extends number[]
        ? [AddDigit<A[0], B[0]>, ...AddDigitArray<ATail, BTail>]
        : [])
      : [A[0], ...AddDigitArray<[], ATail>])
    : [])
  : (B extends [any, ...infer BTail]
    ? (BTail extends number[]
      ? [B[0], ...AddDigitArray<[], BTail>]
      : [])
    : [])
)

type AddDigit<A extends number, B extends number> = [...Digit.ToTuple[A], ...Digit.ToTuple[B]]['length']

/**
 * Increment `A` by 1.
 */
export type Increment<A extends number, Fail = never> = Add<A, 1, Fail>

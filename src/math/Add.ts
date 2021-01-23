import { Reverse } from '../array'
import { And } from '../conditional'
import { Digit, DigitArray } from './Digit'
import { IsPositive } from './IsPositive'
import { IsWhole } from './IsWhole'


/**
 * Add two number literals.
 */
export type Add<A extends number, B extends number> = And<
  And<IsPositive<A>, IsWhole<A>>,
  And<IsPositive<B>, IsWhole<B>>
> extends true
  ? DigitArray.ToNumber<
    Reverse<AddDigitArray<
      Reverse<DigitArray.FromNumber<A>>,
      Reverse<DigitArray.FromNumber<B>>
    >>
  >
  : never

type AddDigitArray<A extends number[], B extends number[]> = (
  A extends [any, ...infer AT]
  ? (AT extends number[]
    ? (B extends [any, ...infer BT]
      ? (BT extends number[]
        ? [AddDigit<A[0], B[0]>, ...AddDigitArray<AT, BT>]
        : [])
      : [A[0], ...AddDigitArray<[], AT>])
    : [])
  : (B extends [any, ...infer BT]
    ? (BT extends number[]
      ? [B[0], ...AddDigitArray<[], BT>]
      : [])
    : [])
)

type AddDigit<A extends number, B extends number> = [...Digit.ToTuple[A], ...Digit.ToTuple[B]]['length']

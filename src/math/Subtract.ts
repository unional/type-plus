import { PadLeft, Some, Tail } from '../array'
import { And } from '../conditional'
import { Digit, DigitArray } from './Digit'
import { IsPositive } from './IsPositive'
import { IsWhole } from './IsWhole'
import { Max } from './Max'

export type Subtract<A extends number, B extends number, Fail = never> =
  And<
    And<IsPositive<A>, IsWhole<A>>,
    And<IsPositive<B>, IsWhole<B>>
  > extends true ?
  DigitArray.Shift10<DigitArray.FromNumber<A>> extends infer DA ? DA extends number[] ?
  DigitArray.FromNumber<B> extends infer DB ? DB extends number[] ?
  Max<DA['length'], DB['length']> extends infer M ? M extends number ?
  PadLeft<DA, M, 0> extends infer PDA ? PDA extends number[] ?
  PadLeft<DB, M, 0> extends infer PDB ? PDB extends number[] ?
  SubtractDigitArray<[], PDA, PDB> extends infer Result ? Result extends number[] ?
  Some<Result, number, 'strict'> extends true ? Fail :
  DigitArray.ToNumber<Result>
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail
  : Fail : Fail
  : Fail

type SubtractDigitArray<R extends number[], A extends number[], B extends number[]> =
  A['length'] extends 0 ? R :
  SubtractDigitArray<[...R, SubtractDigit<A[0], B[0]>], Tail<A>, Tail<B>>


type SubtractDigit<A extends number, B extends number> =
  Digit.ToTuple[A] extends [...(infer U), ...Digit.ToTuple[B]] ? U['length'] : never

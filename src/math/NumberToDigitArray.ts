import { And } from '../conditional'
import { IsPositive } from './IsPositive'
import { IsWhole } from './IsWhole'

export type NumberToDigitArray<N extends number> = StringToDigitArray<NumberToString<N>>

type NumberToString<N extends number> = (And<IsPositive<N>, IsWhole<N>>) extends true ? `${N}` : never

type StringToDigitArray<S extends string> = S extends `1${infer L}` ? [1, ...StringToDigitArray<L>]
  : S extends `2${infer L}` ? [2, ...StringToDigitArray<L>]
  : S extends `3${infer L}` ? [3, ...StringToDigitArray<L>]
  : S extends `4${infer L}` ? [4, ...StringToDigitArray<L>]
  : S extends `5${infer L}` ? [5, ...StringToDigitArray<L>]
  : S extends `6${infer L}` ? [6, ...StringToDigitArray<L>]
  : S extends `7${infer L}` ? [7, ...StringToDigitArray<L>]
  : S extends `8${infer L}` ? [8, ...StringToDigitArray<L>]
  : S extends `9${infer L}` ? [9, ...StringToDigitArray<L>]
  : S extends `0${infer L}` ? [0, ...StringToDigitArray<L>]
  : []

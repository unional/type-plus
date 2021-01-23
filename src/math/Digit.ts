import { And } from '../conditional'
import { IsPositive } from './IsPositive'
import { IsWhole } from './IsWhole'

export namespace Digit {
  export type ToTuple = {
    [k in number]: any[]
  } & {
    0: [],
    1: [1],
    2: [1, 1],
    3: [1, 1, 1],
    4: [1, 1, 1, 1],
    5: [1, 1, 1, 1, 1],
    6: [1, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 1, 1, 1, 1],
    8: [1, 1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    10: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    11: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    12: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    13: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    14: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    15: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    16: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    17: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    18: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
}

export namespace DigitArray {
  export type ToNumber<C extends number[]> = ToTuple<[], C>['length']

  type ToTuple<R extends any[], S extends number[]> = (
    S['length'] extends 0
    ? R
    : (S['length'] extends 1
      ? [...R, ...Digit.ToTuple[S[0]]]
      : (S extends [any, ...infer T]
        ? (T extends any[]
          ? ToTuple<Multi10<[...R, ...Digit.ToTuple[S[0]]]>, T>
          : never)
        : never
      )
    )
  )

  type Multi10<C extends any[]> = [...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C]


  export type FromNumber<N extends number> = StringToDigitArray<NumberToString<N>>

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
}

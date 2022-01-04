import { Tail } from '../array'
import { And } from '../predicates'
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
    18: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    19: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  }

  /**
   * A > B for [1-9]
   */
  export type GreaterThan<A extends number, B extends number> = B extends GreaterThanMap[A] ? true : false

  type GreaterThanMap = { [k in number]: number } & {
    0: never,
    1: 0,
    2: 0 | 1,
    3: 0 | 1 | 2,
    4: 0 | 1 | 2 | 3,
    5: 0 | 1 | 2 | 3 | 4,
    6: 0 | 1 | 2 | 3 | 4 | 5,
    7: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    8: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
    9: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  }
}

export namespace DigitArray {
  export type ToNumber<C extends number[]> = ToTuple<[], C>['length']

  export type ToTuple<R extends any[], S extends number[]> =
    S['length'] extends 0
    ? R
    : (S['length'] extends 1
      ? [...R, ...Digit.ToTuple[S[0]]]
      : (S extends [any, ...infer T]
        ? (T extends any[]
          ? ToTuple<Multi10<[...R, ...Digit.ToTuple[S[0]]]>, T>
          : never)
        : never))

  type Multi10<C extends any[]> = [...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C]


  export type FromNumber<N extends number> = FromString<NumberToString<N>>

  type NumberToString<N extends number> = (And<IsPositive<N>, IsWhole<N>>) extends true ? `${N}` : never

  export type FromString<S extends string> = S extends `1${infer L}` ? [1, ...FromString<L>]
    : S extends `2${infer L}` ? [2, ...FromString<L>]
    : S extends `3${infer L}` ? [3, ...FromString<L>]
    : S extends `4${infer L}` ? [4, ...FromString<L>]
    : S extends `5${infer L}` ? [5, ...FromString<L>]
    : S extends `6${infer L}` ? [6, ...FromString<L>]
    : S extends `7${infer L}` ? [7, ...FromString<L>]
    : S extends `8${infer L}` ? [8, ...FromString<L>]
    : S extends `9${infer L}` ? [9, ...FromString<L>]
    : S extends `0${infer L}` ? [0, ...FromString<L>]
    : []

  export type Shift10<DA extends number[]> = TrimLeadingZero<Shift10State<[], DA>>
  type Shift10State<R extends number[], DA extends number[]> =
    DA['length'] extends 0
    ? R
    : (DA['length'] extends 1
      ? [...R, ...DA]
      : (DA extends [any, ...infer T]
        ? (T extends number[]
          ? (DA[0] extends 0
            ? Shift10State<[...R, DA[0]], T>
            : (T extends [any, ...infer Y]
              ? (Y extends number[]
                ? Shift10State<[...R, MinusOne[DA[0]]], [Plus10[T[0]], ...Y]>
                : [])
              : []))
          : [])
        : [])
    )

  type TrimLeadingZero<A extends number[]> =
    A['length'] extends 0
    ? A
    : A[0] extends 0 ? TrimLeadingZero<Tail<A>> : A

  type MinusOne = { [k in number]: number } & {
    0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8,
    10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18
  }

  type Plus10 = { [k in number]: number } &
  { 0: 10, 1: 11, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16, 7: 17, 8: 18, 9: 19 }
}

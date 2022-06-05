import type { Tail } from '../array/index.js'
import type { And } from '../predicates/index.js'
import type { IsPositive } from './IsPositive.js'
import type { IsWhole } from './IsWhole.js'

export namespace Digit {
  export type ToTuple<T = 1> = {
    [k in number]: any[]
  } & {
    0: [],
    1: [T],
    2: [T, T],
    3: [T, T, T],
    4: [T, T, T, T],
    5: [T, T, T, T, T],
    6: [T, T, T, T, T, T],
    7: [T, T, T, T, T, T, T],
    8: [T, T, T, T, T, T, T, T],
    9: [T, T, T, T, T, T, T, T, T],
    10: [T, T, T, T, T, T, T, T, T, T],
    11: [T, T, T, T, T, T, T, T, T, T, T],
    12: [T, T, T, T, T, T, T, T, T, T, T, T],
    13: [T, T, T, T, T, T, T, T, T, T, T, T, T],
    14: [T, T, T, T, T, T, T, T, T, T, T, T, T, T],
    15: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
    16: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
    17: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
    18: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
    19: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  }

  /**
   * A > B for [1-9]
   */
  export type GreaterThan<A extends number, B extends number> = B extends GreaterThanMap[A] ? true : false

  export type GreaterThanMap = { [k in number]: number } & {
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

  export type ToTuple<R extends any[], S extends number[], X = any> =
    S['length'] extends 0
    ? R
    : (S['length'] extends 1
      ? [...R, ...Digit.ToTuple<X>[S[0]]]
      : (S extends [any, ...infer T]
        ? (T extends any[]
          ? ToTuple<Multi10<[...R, ...Digit.ToTuple<X>[S[0]]]>, T>
          : never)
        : never))

  export type Multi10<C extends any[]> = [...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C]


  export type FromNumber<N extends number> = FromString<NumberToString<N>>
  export type FromNumberAbs<N extends number> = FromString<TrimMinusSign<`${N}`>>
  export type TrimMinusSign<N extends string> = N extends `-${infer rest}` ? rest : N

  export type NumberToString<N extends number> = (And<IsPositive<N>, IsWhole<N>>) extends true ? `${N}` : never

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
  export type Shift10State<R extends number[], DA extends number[]> =
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

  export type TrimLeadingZero<A extends number[]> =
    A['length'] extends 0
    ? A
    : A[0] extends 0 ? TrimLeadingZero<Tail<A>> : A

  export type MinusOne = { [k in number]: number } & {
    0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8,
    10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18
  }

  export type Plus10 = { [k in number]: number } &
  { 0: 10, 1: 11, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16, 7: 17, 8: 18, 9: 19 }
}

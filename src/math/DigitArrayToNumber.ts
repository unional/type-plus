
export type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18

export type DigitArrayToNumber<C extends Digits[]> = DigitArrayToState<[], C>['length']

type DigitArrayToState<R extends any[], S extends Digits[]> = (
  S['length'] extends 0
  ? R
  : (S['length'] extends 1
    ? [...R, ...DigitToList[S[0]]]
    : (S extends [any, ...infer T]
      ? (T extends any[]
        ? DigitArrayToState<Multi10<[...R, ...DigitToList[S[0]]]>, T>
        : never)
      : never)
  )
)

type Multi10<C extends any[]> = [...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C]

type DigitToList = {
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

export type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18

export type CharArrayToNumber<C extends Digits[]> = DigitArrayToState<C>['length']

type DigitArrayToState<C extends Digits[]> = (
  C['length'] extends 0
  ? []
  : (C['length'] extends 1
    ? DigitToList[C[0]]
    : (C['length'] extends 2
      ? [...Multi10<DigitToList[C[0]]>, ...DigitArrayToState<[C[1]]>]
      : (C['length'] extends 3
        ? [
          ...Multi10<Multi10<DigitToList[C[0]]>>,
          ...Multi10<DigitToList[C[1]]>,
          ...DigitArrayToState<[C[2]]>
        ]
        : never
        // : (C['length'] extends 4
        //   ? [
        //     ...Multi10<Multi10<Multi10<DigitToList[C[0]]>>>,
        //     ...Multi10<Multi10<DigitToList[C[1]]>>,
        //     ...Multi10<DigitToList[C[2]]>,
        //     ...DigitArrayToState<[C[3]]>
        //   ]
        //   : (C['length'] extends 5
        //     ? [
        //       ...Multi10<Multi10<Multi10<Multi10<DigitToList[C[0]]>>>>,
        //       ...Multi10<Multi10<Multi10<DigitToList[C[1]]>>>,
        //       ...Multi10<Multi10<DigitToList[C[2]]>>,
        //       ...Multi10<DigitToList[C[3]]>,
        //       ...DigitArrayToState<[C[4]]>
        //     ]
        //     : (C['length'] extends 6
        //       ? [
        //         ...Multi10<Multi10<Multi10<Multi10<Multi10<DigitToList[C[0]]>>>>>,
        //         ...Multi10<Multi10<Multi10<Multi10<DigitToList[C[1]]>>>>,
        //         ...Multi10<Multi10<Multi10<DigitToList[C[2]]>>>,
        //         ...Multi10<Multi10<DigitToList[C[3]]>>,
        //         ...Multi10<DigitToList[C[4]]>,
        //         ...DigitArrayToState<[C[5]]>
        //       ]
        //       : never
        //     )
        //   )
        // )
      )
    )
  )
)

export type DigitArrayToNumber2<C extends Digits[]> = DigitArrayToState2<[], C>['length']
export type DigitArrayToState2<R extends any[], S extends Digits[]> = (
  S['length'] extends 0
  ? R
  : (S['length'] extends 1
    ? [...R, ...DigitToList[S[0]]]
    : (S['length'] extends 2
      ? DigitArrayToState2<Multi10<DigitToList[S[0]]>, [S[1]]>
      : (S['length'] extends 3
        ? DigitArrayToState2<[
          ...Multi10<Multi10<DigitToList[S[0]]>>,
          ...Multi10<DigitToList[S[1]]>
        ], [S[2]]>
        : never
        // : (S['length'] extends 4
        //   ? DigitArrayToState2<[
        //     ...Multi10<Multi10<Multi10<DigitToList[S[0]]>>>,
        //     ...Multi10<Multi10<DigitToList[S[1]]>>,
        //     ...Multi10<DigitToList[S[2]]>
        //   ], [S[3]]>
        //   : (S['length'] extends 5
        //     ? DigitArrayToState2<[
        //       ...Multi10<Multi10<Multi10<Multi10<DigitToList[S[0]]>>>>,
        //       ...Multi10<Multi10<Multi10<DigitToList[S[1]]>>>,
        //       ...Multi10<Multi10<DigitToList[S[2]]>>,
        //       ...Multi10<DigitToList[S[3]]>
        //     ], [S[4]]>
        //     : (S['length'] extends 6
        //       ? DigitArrayToState2<[
        //         ...Multi10<Multi10<Multi10<Multi10<Multi10<DigitToList[S[0]]>>>>>,
        //         ...Multi10<Multi10<Multi10<Multi10<DigitToList[S[1]]>>>>,
        //         ...Multi10<Multi10<Multi10<DigitToList[S[2]]>>>,
        //         ...Multi10<Multi10<DigitToList[S[3]]>>,
        //         ...Multi10<DigitToList[S[4]]>
        //       ], [S[5]]>
        //       : never
        //     )
        //   )
        // )
      )
    )
  )
)

type Multi10<C extends any[]> = [...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C]

type DigitToList = {
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

import { Filter, isType, KeepMatch } from '..'

describe('Filter<A, C>', () => {
  describe('A is array', () => {
    test('array matching criteria gets itself', () => {
      type Actual = Filter<string[], string>
      isType.equal<true, string[], Actual>()
    })

    test('array not matching criteria gets never[]', () => {
      type Actual = Filter<string[], number>
      isType.equal<true, never[], Actual>()
    })

    test('remove unmatched type form array', () => {
      type Actual = Filter<Array<string | number>, string>

      isType.equal<true, string[], Actual>()
    })

    test('remove undefined and null', () => {
      type Actual = Filter<Array<string | undefined | null>, string>
      isType.equal<true, string[], Actual>()
    })

    test('can filter with undefined and null', () => {
      type Actual = Filter<Array<string | undefined | null>, undefined | null>
      // Array<undefined | null> is destructured to undefined[] | null[] by TypeScript
      isType.equal<true, undefined[] | null[], Actual>()
    })

    test('work with never[]', () => {
      type Actual = Filter<never[], undefined>
      isType.equal<true, never[], Actual>()
    })
  })

  describe(`A is Tuple`, () => {
    test('matching criteria', () => {
      type Actual = Filter<[1, 2, 3, 4], 2 | 4>
      isType.equal<true, [2, 4], Actual>()
    })

    test('no match gets never[]', () => {
      type Actual = Filter<[1, 2, 3, 4], 5>
      isType.equal<true, never[], Actual>()
    })

    test('matching undefined and null', () => {
      type Actual = Filter<[1, undefined, 3, null], undefined | null>
      isType.equal<true, [undefined, null], Actual>()
    })
  })
})

describe('KeepMatch<A, C>', () => {
  describe('A is array', () => {
    test('array matching criteria gets itself', () => {
      type Actual = KeepMatch<string[], string>
      isType.equal<true, string[], Actual>()
    })

    test('array not matching criteria gets never[]', () => {
      type Actual = KeepMatch<string[], number>
      isType.equal<true, never[], Actual>()
    })

    test('remove unmatched type form array', () => {
      type Actual = KeepMatch<Array<string | number>, string>

      isType.equal<true, string[], Actual>()
    })

    test('remove undefined and null', () => {
      type Actual = KeepMatch<Array<string | undefined | null>, string>
      isType.equal<true, string[], Actual>()
    })

    test('can filter with undefined and null', () => {
      type Actual = KeepMatch<Array<string | undefined | null>, undefined | null>
      // Array<undefined | null> is destructured to undefined[] | null[] by TypeScript
      isType.equal<true, undefined[] | null[], Actual>()
    })

    test('work with never[]', () => {
      type Actual = KeepMatch<never[], undefined>
      isType.equal<true, never[], Actual>()
    })
  })

  describe(`A is Tuple`, () => {
    test('matching criteria', () => {
      type Actual = KeepMatch<[1, 2, 3, 4], 2 | 4>
      isType.equal<true, [2, 4], Actual>()
    })

    test('no match gets never[]', () => {
      type Actual = KeepMatch<[1, 2, 3, 4], 5>
      isType.equal<true, never[], Actual>()
    })

    test('matching undefined and null', () => {
      type Actual = KeepMatch<[1, undefined, 3, null], undefined | null>
      isType.equal<true, [undefined, null], Actual>()
    })
  })
})

import { DropMatch, isType } from '..'

describe('DropMatch<A, C>', () => {
  describe('A is array', () => {
    test('drop all types gets never[]', () => {
      type A = DropMatch<Array<string>, string>
      isType.equal<true, never[], A>()

      type B = DropMatch<Array<string | boolean>, string | boolean>
      isType.equal<true, never[], B>()
    })

    test('drop undefined and null from array', () => {
      type A = DropMatch<Array<string | undefined>, undefined>
      isType.equal<true, string[], A>()

      type B = DropMatch<Array<string | number | undefined>, undefined>
      isType.equal<true, Array<string | number>, B>()

      type C = DropMatch<Array<string | number | undefined | null>, undefined | null>
      isType.equal<true, Array<string | number>, C>()
    })

    test('can get undefined and null array when other types dropped', () => {
      type A = DropMatch<Array<string | undefined>, string>
      isType.equal<true, undefined[], A>()

      type B = DropMatch<Array<string | number | null>, string>
      isType.equal<true, Array<number | null>, B>()
    })

    test('unmatched criteria returns original', () => {
      type Actual = DropMatch<Array<string | undefined>, number>

      isType.equal<true, Array<string | undefined>, Actual>()
    })
  })

  describe('A is Tuple', () => {
    test('empty tuple', () => {
      type A = DropMatch<[], undefined>
      isType.equal<true, [], A>()

      type B = DropMatch<[1, undefined], undefined>
      isType.equal<true, [1], B>()

      type C = DropMatch<[1, undefined, 3], undefined>
      isType.equal<true, [1, 3], C>()

      type D = DropMatch<[1, string | undefined, 3], undefined>
      isType.equal<true, [1, string, 3], D>()
    })

    test('drop undefined from tuple', () => {
      type A = DropMatch<[undefined], undefined>
      isType.equal<true, [], A>()

      type B = DropMatch<[1, undefined], undefined>
      isType.equal<true, [1], B>()

      type C = DropMatch<[1, undefined, 3], undefined>
      isType.equal<true, [1, 3], C>()

      type D = DropMatch<[1, string | undefined, 3], undefined>
      isType.equal<true, [1, string, 3], D>()
    })

    test('get original if not matched', () => {
      type A = DropMatch<[1], undefined>
      isType.equal<true, [1], A>()

      type B = DropMatch<[1], undefined | string>
      isType.equal<true, [1], B>()

      type C = DropMatch<[1, 2, 3, 4], 5>
      isType.equal<true, [1, 2, 3, 4], C>()
    })

    test('drop narrow type', () => {
      type C = DropMatch<[1], number>
      isType.equal<true, [], C>()
    })

    test('keep widen type', () => {
      type D = DropMatch<[number], 1>
      isType.equal<true, [number], D>()
    })

    test('drop type from tuple', () => {
      type A = DropMatch<[1], 1>
      isType.equal<true, [], A>()

      type B = DropMatch<[number | string], number>
      isType.equal<true, [string], B>()

      type C = DropMatch<[1, undefined, 3], 1>
      isType.equal<true, [undefined, 3], C>()

      type D = DropMatch<[1, string | undefined, 3], 3>
      isType.equal<true, [1, string | undefined], D>()
    })

    test('drop multiple types', () => {
      type Actual = DropMatch<[1, 2, 3, 4], 2 | 4>
      isType.equal<true, [1, 3], Actual>()
    })

    test('drop undefined and null', () => {
      type Actual = DropMatch<[1, undefined, 3, null], undefined | null>
      isType.equal<true, [1, 3], Actual>()
    })
  })
})

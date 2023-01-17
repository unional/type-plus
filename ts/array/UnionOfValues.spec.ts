import { UnionOfValues, assertType, Equal, isType } from '../index.js'

test('get value of generic array', () => {
  type Actual = UnionOfValues<string[]>
  assertType.isTrue(true as Equal<string, Actual>)
})

test('tuple get union type of values', () => {
  type Actual = UnionOfValues<[string, boolean]>
  assertType.isTrue(true as Equal<string | boolean, Actual>)
})

it('extracts literal types from a tuple', () => {
  type R = UnionOfValues<['a', 'b', 'c']>

  isType.equal<true, 'a' | 'b' | 'c', R>()
})

it('extracts mixed types from tuple', () => {
  type R = UnionOfValues<['a', 1, true]>

  isType.equal<true, 'a' | 1 | true, R>()
})

it('preserves union types', () => {
  const t: ['a' | 'b', number, boolean] = ['a', 1, true]
  type R = UnionOfValues<typeof t>

  isType.equal<true, 'a' | 'b' | number | boolean, R>()
})

import { UnionOfValues, assertType, Equal } from '../index.js'

test('get value of generic array', () => {
  type Actual = UnionOfValues<string[]>
  assertType.isTrue(true as Equal<string, Actual>)
})

test('tuple get union type of values', () => {
  type Actual = UnionOfValues<[string, boolean]>
  assertType.isTrue(true as Equal<string | boolean, Actual>)
})

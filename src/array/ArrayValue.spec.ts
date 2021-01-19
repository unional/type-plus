import { ArrayValue, assertType, Equal } from '..'

test('get value of generic array', () => {
  type Actual = ArrayValue<string[]>
  assertType.isTrue(true as Equal<string, Actual>)
})

test('tuple get union type of values', () => {
  type Actual = ArrayValue<[string, boolean]>
  assertType.isTrue(true as Equal<string | boolean, Actual>)
})

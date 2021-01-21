import { assertType, Equal, Filter } from '..'

test('array matching criteria gets itself', () => {
  type Actual = Filter<string[], string>
  assertType.isTrue(true as Equal<string[], Actual>)
})

test('array not matching criteria gets never[]', () => {
  type Actual = Filter<string[], number>
  assertType.isTrue(true as Equal<never[], Actual>)
})

test('tuple filters to those matching criteria', () => {
  type Actual = Filter<[1, 2, 3, 4], 2 | 4>
  assertType.isTrue(true as Equal<[2, 4], Actual>)
})

test('tuple not value match criteria gets never[]', () => {
  type Actual = Filter<[1, 2, 3, 4], 5>
  assertType.isTrue(true as Equal<never[], Actual>)
})

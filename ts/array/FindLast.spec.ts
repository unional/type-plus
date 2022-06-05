import { assertType, Equal, FindLast } from '../index.js'

test('pick last type matching criteria', () => {
  type Actual = FindLast<[true, 1, 'x', 3], number>
  assertType.isTrue(true as Equal<3, Actual>)
})

test('no match gets never', () => {
  type Actual = FindLast<[true, 1, 'x'], 2>
  assertType.isTrue(true as Equal<never, Actual>)
})

test('pick object', () => {
  type Actual = FindLast<[
    { name: 'a', type: 1 },
    { name: 'b', type: 2 },
    { name: 'c', type: 3 },
    { name: 'b', type: 4 },
  ], { name: 'b' }>['type']
  assertType.isTrue(true as Equal<4, Actual>)
})

test('works on array type', () => {
  const s: string[] = ['a', 'b', 'c']
  type Actual = FindLast<typeof s, string>
  assertType.isTrue(true as Equal<string, Actual>)
})

import { assertType, Equal, FindFirst } from '..'

test('pick first type matching criteria', () => {
  type Actual = FindFirst<[true, 1, 'x', 3], number>
  assertType.isTrue(true as Equal<1, Actual>)
})

test('no match gets never', () => {
  type Actual = FindFirst<[true, 1, 'x'], 2>
  assertType.isTrue(true as Equal<never, Actual>)
})

test('pick object', () => {
  type Actual = FindFirst<[
    { name: 'a', type: 1 },
    { name: 'b', type: 2 },
    { name: 'c', type: 3 },
    { name: 'b', type: 4 },
  ], { name: 'b' }>['type']
  assertType.isTrue(true as Equal<2, Actual>)
})

test('generic', () => {
  const s: string[] = ['a', 'b', 'c']
  type Actual = FindFirst<typeof s, string>
  assertType.isTrue(true as Equal<string, Actual>)
})

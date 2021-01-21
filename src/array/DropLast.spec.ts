import { assertType, Equal, DropLast } from '..'

test('drop first value type from tuple', () => {
  type Actual = DropLast<[true, 1, 'x', 3]>
  assertType.isTrue(true as Equal<[true, 1, 'x'], Actual>)
})

test('drop only value gets never[]', () => {
  type Actual = DropLast<['x']>
  assertType.isTrue(true as Equal<never[], Actual>)
})

test('array type gets itself', () => {
  const s: string[] = ['a', 'b', 'c']
  type Actual = DropLast<typeof s>
  assertType.isTrue(true as Equal<string[], Actual>)
})

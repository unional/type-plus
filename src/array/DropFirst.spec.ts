import { assertType, Equal, DropFirst } from '..'

test('drop first value type from tuple', () => {
  type Actual = DropFirst<[true, 1, 'x', 3]>
  assertType.isTrue(true as Equal<[1, 'x', 3], Actual>)
})

test('drop only value gets never[]', () => {
  type Actual = DropFirst<['x']>
  assertType.isTrue(true as Equal<never[], Actual>)
})

test('array type gets itself', () => {
  const s: string[] = ['a', 'b', 'c']
  type Actual = DropFirst<typeof s>
  assertType.isTrue(true as Equal<string[], Actual>)
})

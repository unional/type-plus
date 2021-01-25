import { DropLast, isType } from '..'

test('drop from empty gets itself', () => {
  isType.equal<true, string[], DropLast<string[]>>()
})

test('drop first value type from tuple', () => {
  type Actual = DropLast<[true, 1, 'x', 3]>
  isType.equal<true, [true, 1, 'x'], Actual>()
})

test('drop only value gets never[]', () => {
  type Actual = DropLast<['x']>
  isType.equal<true, never[], Actual>()
})

test('array type gets itself', () => {
  const s: string[] = ['a', 'b', 'c']
  type Actual = DropLast<typeof s>
  isType.equal<true, string[], Actual>()
})

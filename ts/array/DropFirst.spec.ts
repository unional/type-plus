import { DropFirst, isType } from '../index.js'

test('drop from empty gets itself', () => {
  isType.equal<true, string[], DropFirst<string[]>>()
})

test('drop first value type from tuple', () => {
  type Actual = DropFirst<[true, 1, 'x', 3]>
  isType.equal<true, [1, 'x', 3], Actual>()
})

test('drop only value gets never[]', () => {
  type Actual = DropFirst<['x']>
  isType.equal<true, never[], Actual>()
})

test('array type gets itself', () => {
  const s: string[] = ['a', 'b', 'c']
  type Actual = DropFirst<typeof s>
  isType.equal<true, string[], Actual>()
})

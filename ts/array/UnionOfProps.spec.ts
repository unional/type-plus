import { assertType, Equal, UnionOfProps } from '../index.js'

test('get property from single value tuple', () => {
  type S = [{ a: number }]
  type A = UnionOfProps<S, 'a'>

  assertType.isTrue(true as Equal<A, number>)
})

test('get property from multiple values', () => {
  type S = [{ a: 'a' }, { a: 'b' }]
  type A = UnionOfProps<S, 'a'>
  assertType.isTrue(true as Equal<A, 'a' | 'b'>)
})

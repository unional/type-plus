import { assertType, Equal, PropUnion } from '..'

test('get property from single value tuple', () => {
  type S = [{ a: number }]
  type A = PropUnion<S, 'a'>

  assertType.isTrue(true as Equal<A, number>)
})

test('get property from multiple values', () => {
  type S = [{ a: 'a' }, { a: 'b' }]
  type A = PropUnion<S, 'a'>
  assertType.isTrue(true as Equal<A, 'a' | 'b'>)
})

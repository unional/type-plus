import { assertType, Equal, Tail } from '..'

test('get tail types', () => {
  type S = [1, 'a', 'b']
  type A = Tail<S>

  assertType.isTrue(true as Equal<A, ['a', 'b']>)
})

test('empty tuple gets never', () => {
  type S = []
  type A = Tail<S>

  assertType.isTrue(true as Equal<A, never>)
})

test('array gets same type', () => {
  type A = Tail<string[]>

  assertType.isTrue(true as Equal<A, string[]>)
})

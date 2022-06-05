import { assertType, Equal, Head } from '../index.js'

test('get first type', () => {
  type S = [1, 'a', 'b']
  type A = Head<S>

  assertType.isTrue(true as Equal<A, 1>)
})

test('empty tuple gets never', () => {
  type S = []
  type A = Head<S>

  assertType.isTrue(true as Equal<A, never>)
})

test('array gets same type', () => {
  type A = Head<string[]>

  assertType.isTrue(true as Equal<A, string>)
})

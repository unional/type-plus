import { assertType, Equal, SpreadRecord } from '../index.js'

test('records are combined as intersection', () => {
  type S = SpreadRecord<{ a: number }, { b: string }>
  assertType.isTrue(true as Equal<S, { a: number } & { b: string }>)
})

test('Property in B overrides A', () => {
  type A = { a: number }
  type B = { a: string, b: string }
  type S = SpreadRecord<A, B>

  assertType.isTrue(true as Equal<S, { a: string, b: string }>)
})

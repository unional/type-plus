import { assertType, CommonKeys, Equal } from '..'

test('no common key returns never', () => {
  type S = [{ a: number }, { b: number }]
  type A = CommonKeys<S>
  assertType.isTrue(true as Equal<A, never>)
})

test('single common key', () => {
  type S = [{ a: number, c: number }, { a: number, b: number }]
  type A = CommonKeys<S>
  assertType.isTrue(true as Equal<A, 'a'>)
})

test('multiple common keys', () => {
  type S = [{ a: number, b: number }, { a: number, b: number }]

  type A = CommonKeys<S>
  assertType.isTrue(true as Equal<A, 'a' | 'b'>)
})

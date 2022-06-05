import { assertType, IsEqual, RequiredKeys } from '../index.js'

test('extract required keys from object', () => {
  type X = { a?: string, b: string }

  type A = RequiredKeys<X>
  assertType.isTrue(true as IsEqual<'b', A>)
})
test('work with union type', () => {
  type X = { a?: string, b: string } | { c: string, d?: string }

  type A = RequiredKeys<X>
  assertType.isTrue(true as IsEqual<'b' | 'c', A>)
})
test('no required keys returns never', () => {
  type X = { b?: string }

  assertType.isTrue(true as IsEqual<never, RequiredKeys<X>>)
})
test('keys with undefined value is required', () => {
  type X = { a: string | undefined }

  assertType.isTrue(true as IsEqual<'a', RequiredKeys<X>>)
})

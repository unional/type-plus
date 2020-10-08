import a from 'assertron'
import { assertType, assertUnknown } from '..'

test('assert subject satisfies specified type', () => {
  const subject: unknown = { a: 1, b: 2, c: 3 }
  assertUnknown<{ a: 1 }>(subject)
  expect(subject.a).toBe(1)
  // `subject.b` is not valid yet

  assertUnknown<{ b: 2 }>(subject)
  expect(subject.b).toBe(2)

  assertUnknown(subject, (s: { c: 3 }) => !!s)
  expect(subject.c).toBe(3)

  a.throws(() => assertUnknown(subject, (_s: { d: 4 }) => false), TypeError)
})

test('assert undefined', () => {
  const x: unknown = undefined
  assertUnknown<undefined>(x)

  assertType.isUndefined(x)
})

test('assert null', () => {
  const x: unknown = null
  assertUnknown<null>(x)
  assertType.isNull(x)
})

test('assert number', () => {
  const x: unknown = 1
  assertUnknown<number>(x)
  assertType.isNumber(x)
})

test('assert boolean', () => {
  const x: unknown = false
  assertUnknown<boolean>(x)
  assertType.isBoolean(x)
})

test('assert true', () => {
  const x: unknown = true
  assertUnknown<true>(x)
  assertType.isTrue(x)
})

test('assert false', () => {
  const x: unknown = false
  assertUnknown<false>(x)
  assertType.isFalse(x)
})

test('assert string', () => {
  const x: unknown = ''
  assertUnknown<string>(x)
  assertType.isString(x)
})

test('assert string literal', () => {
  const x: unknown = 'abc'
  assertUnknown<'abc'>(x)
  assertType<'abc'>(x)
})

test('assert never', () => {
  const x: unknown = undefined
  assertUnknown<never>(x)
  assertType.isNever(x)
})

test('assert error', () => {
  const x: unknown = new Error()
  assertUnknown<Error>(x)
  assertType.isError(x)

  class ChildError extends Error { y = 'y' }
  const y: unknown = new ChildError()
  assertUnknown<ChildError>(y)
  assertType.isString(y.y)
})

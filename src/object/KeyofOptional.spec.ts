import { assertType, KeyofOptional } from '..'

test('get key from optional (X | undefined)', () => {
  const record = { a: 1, b: 'b' }
  function foo<T>(input?: T): KeyofOptional<typeof input> {
    return {} as any
  }

  const actual = foo(record)
  assertType<'a' | 'b'>(actual)
})

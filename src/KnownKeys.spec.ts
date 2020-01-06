import { assertType, KnownKeys } from '.'

test('pick out only known keys', () => {
  type A = {
    a?: boolean,
    b?: number,
    [k: string]: any,
  }

  const x: KnownKeys<A> = {} as any
  assertType<'a' | 'b'>(x)
})

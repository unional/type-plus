import { assertType, KnownKeys } from '../index.js'

test('pick out only known keys', () => {
  type A = {
    a?: boolean,
    b?: number,
    [k: string]: any,
  }

  const input: A = {}
  const actual = getKnownKeys(input)
  assertType<'a' | 'b'>(actual)
})

test('primitive type yields never', () => {
  assertType<never>(getKnownKeys(undefined))
  assertType<never>(getKnownKeys(true))
  assertType<never>(getKnownKeys(false))
  assertType<never>(getKnownKeys(null))
  assertType<never>(getKnownKeys('str'))
  assertType<never>(getKnownKeys(1))
  assertType<never>(getKnownKeys({}))
  assertType<never>(getKnownKeys([]))
})

test('literal gets keys', () => {
  assertType<'a'>(getKnownKeys({ a: 1 }))
})

test('empty record yields never', () => {
  const x: Record<any, any> = {}
  const actual = getKnownKeys(x)
  assertType<never>(actual)
})


function getKnownKeys<T>(_value: T): KnownKeys<T> {
  return {} as unknown as KnownKeys<T>
}

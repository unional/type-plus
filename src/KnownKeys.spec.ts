import { assertType, KnownKeys } from '.'

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
  assertType.isNever(getKnownKeys(undefined))
  assertType.isNever(getKnownKeys(true))
  assertType.isNever(getKnownKeys(false))
  assertType.isNever(getKnownKeys(null))
  assertType.isNever(getKnownKeys('str'))
  assertType.isNever(getKnownKeys(1))
  assertType.isNever(getKnownKeys({}))
  assertType.isNever(getKnownKeys([]))
})

test('literal gets keys', () => {
  assertType<'a'>(getKnownKeys({ a: 1 }))
})

test('empty record yields never', () => {
  const x: Record<any, any> = {}
  const actual = getKnownKeys(x)
  assertType.isNever(actual)
})


function getKnownKeys<T>(_value: T): KnownKeys<T> {
  return {} as any
}

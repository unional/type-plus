import { assertType, canAssign, Equal, Pick, pick } from '../index.js'

test('pick properties from object', () => {
  const actual = pick({ a: 1, b: 2 }, 'a')

  expect(actual).toEqual({ a: 1 })
})

test('distributive pick', () => {
  type Action = InvokeAction | ReturnAction

  type InvokeAction = {
    type: 'invoke',
    id: string,
    payload: string[],
  }

  type ReturnAction = {
    type: 'return',
    id: string,
    payload: string,
  }

  const x: Pick<Action, 'type' | 'payload'> = { type: 'invoke', payload: [] }

  const actions: Action[] = []

  actions.push({ ...x, id: '1' })
})

test('distributive pick with disjoined keys', () => {
  type Union = {
    type: 'A',
    foo: string,
  } | {
    type: 'B',
    foo: string,
    bar: string,
  }
  type Id<T> = { [P in keyof T]: T[P] }
  let x: Id<Pick<Union, 'type' | 'bar'>> = { type: 'A' }
  x = { type: 'B', bar: 'bar' }

  expect(x.bar).toBe('bar')
})

test('intersection types with generic', () => {
  type Foo = { a: string, b: string }
  function foo<T>(input: Pick<Foo & T, 'a'>): void {
    assertType.isString(input.a)
  }
  foo({ a: '1' })
})

test('optional property remains optional', () => {
  type Foo = { a?: string, b: string }
  type A = Pick<Foo, 'a'>
  assertType.isTrue(canAssign<A>()({}))
})

test('pick never gets empty object', () => {
  type A = { a: number }
  type S = Pick<A, never>
  type K = keyof S
  assertType.isTrue(true as Equal<K, never>)
})

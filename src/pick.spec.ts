import { Pick, pick, typeAssert } from '.';

test('pick properties from object', () => {
  const actual = pick({ a: 1, b: 2 }, 'a')

  expect(actual).toEqual({ a: 1 })
})

test('distributive pick', () => {
  type Action = InvokeAction | ReturnAction

  type InvokeAction = {
    type: 'invoke',
    id: string,
    payload: string[]
  }

  type ReturnAction = {
    type: 'return',
    id: string,
    payload: string
  }

  let x: Pick<Action, 'type' | 'payload'> = {} as any

  let actions: Action[] = []

  actions.push({ ...x, id: '1' })
})

test('distributive pick with disjoined keys', () => {
  type Union = {
    type: 'A',
    foo: string
  } | {
    type: 'B',
    foo: string
    bar: string
  }
  type Id<T> = {} & { [P in keyof T]: T[P] }
  let x: Id<Pick<Union, 'type' | 'bar'>> = { type: 'A' }
  x = { type: 'B', bar: 'bar' }

  expect(x.bar).toBe('bar')
})

test('intersection types with generic', () => {
  type Foo = { a: string, b: string }
  function foo<T>(input: Pick<Foo & T, 'a'>): void {
    typeAssert.isString(input.a)
  }
  foo({ a: '1' })
})


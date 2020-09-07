import { assertType, Omit, omit } from '.'

test('Remove properties', () => {
  type Foo = {
    a: number,
    b: string,
    c: boolean,
  }

  type Actual = Omit<Foo, 'c'>
  const a: Actual = { a: 0, b: '' } as any
  assertType.isNumber(a.a)
  assertType.isString(a.b)

  type Revert = Omit<Foo, keyof Actual>
  const r: Revert = { c: false } as any
  assertType.isBoolean(r.c)
})

test('distributive omit', () => {
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

  const x: Omit<Action, 'id'> = {} as any

  const actions: Action[] = []

  actions.push({ ...x, id: '1' })
})

test('distributive Omit with disjoined keys', () => {
  type Union = {
    type: 'A',
    foo: string,
  } | {
    type: 'B',
    foo: string,
    bar: string,
  }
  type Id<T> = {} & { [P in keyof T]: T[P] }
  let x: Id<Omit<Union, 'bar'>> = { type: 'A', foo: 'foo' }
  x = { type: 'B', foo: 'bar' }
  expect(x.foo).toBe('bar')
})

test('intersection types with generic', () => {
  type Foo = { a: string, b: string }
  function foo<T>(input: Omit<Foo & T, 'a'>): void {
    assertType.isString(input.b)
  }
  foo({ b: '1' })
})

test('omit properties from object', () => {
  const actual = omit({ a: 1, b: 2 }, 'a')

  expect(actual).toEqual({ b: 2 })
})
